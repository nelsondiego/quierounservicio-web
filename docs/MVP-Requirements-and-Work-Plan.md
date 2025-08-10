# QuieroUnServicio – MVP Requirements and Work Plan

## 1. Product Overview

- Service marketplace (Argentina) where Professionals publish services and Users search, contact, request quotes, and review.
- Roles: User (browse, request, review), Professional (publish, quote, improve profile with AI, optional subscription).
- AI: Gemini helps professionals improve profile and helps match professionals to user project briefs.

## 2. Scope (MVP)

- Must-have: Firebase Auth, Firestore, Storage; professional profiles; service listings with images & keywords; keyword search; contact + quote flow; reviews; subscription tier (free vs pro) with limits; Argentina locations using src/lib/locations; Vercel deploy from main.
- Should-have: simple dashboards; basic moderation/report flags.
- Later: advanced filters (province/city, price), project briefs + AI matching UI, i18n.

## 3. Architecture & Standards

- Next.js (App Router, TypeScript), shadcn/ui, Actions (single-responsibility, pure I/O), no secrets in client, early returns, object maps (no switch).
- Single Firebase init reused across app (src/lib/firebase.ts). Server Actions handle Firestore/Storage and auth checks. AI runs server-side only.

## 4. Data Model (Firestore)

- users: id, role ('user'|'professional'), displayName, email, phone, location {provinceId, provinceName, cityId, cityName}, createdAt, updatedAt.
- professionals: id (user id), headline, bio, skills[], keywords[], avgRating, reviewCount, subscription {tier, expiresAt}, visibilityScore, location dup, lastReviewSnippets: Array<{ reviewId, rating, comment, userDisplayName, createdAt }>, createdAt, updatedAt.
- services: id, ownerId, title, description, keywords[], priceFrom, currency 'ARS', images[], location dup, professionalSummary: { id, displayName, avatarUrl, headline, subscriptionTier, avgRating, reviewCount }, status 'active'|'paused', createdAt, updatedAt.
- quotes: id, serviceId, professionalId, userId, message, amount, currency 'ARS', status 'sent'|'accepted'|'rejected', serviceTitle, professionalSummary: { id, displayName, avatarUrl }, userSummary: { id, displayName, avatarUrl }, createdAt, updatedAt.
- reviews: id, professionalId, userId, rating 1–5, comment, createdAt, updatedAt.
- messages: id, threadId, fromUserId, toUserId, body, createdAt. threads: participants[], participantsSummary: Array<{ userId, displayName, avatarUrl }>, lastMessagePreview, lastMessageAt.
- subscriptions: id, professionalId, tier, period, status, paymentProvider: 'mercado_pago', providerRef: { subscriptionId?: string, preapprovalId?: string, planId?: string }, createdAt, updatedAt.
- projects (phase 2): id, ownerId, title, description, keywords[], location, matchedProfessionalIds[], createdAt, updatedAt.

## 5. Functional Requirements (Acceptance)

- Auth & Role: email/password; role defaults to 'user'; on first successful service creation, auto-promote role to 'professional' and create the professional document if missing; user doc created/updated; access only to own private data.
- Profile: create/update professional profile (headline, bio, skills, keywords, location via locations lib); upload avatar/gallery to Storage; public view; owner-only edits.
- Services: create/edit service (title, description, keywords, images, priceFrom ARS, location); denormalize professionalSummary on each service; status toggle; listed in search; owner-only edits.
- Search: keyword search across services/professionals; optional province/city filters using locations lib; relevance + visibilityScore; pagination.
- Contact & Quotes: start thread from service; request quote; professional sends quote; user accepts/rejects; state transitions tracked; denormalize participant/service summaries into quotes and threads; notifications.
- Reviews: user can review professional only after accepted quote; aggregate avgRating/reviewCount updated transactionally; update professionals.lastReviewSnippets with latest entries (up to 3).
- Subscriptions: free vs pro limits (e.g., max active services, daily quotes); enforced in Actions; upgrade via Mercado Pago checkout/subscription; webhook-driven status updates; sandbox credentials in development.
- AI (Gemini): server-side profile suggestions and project-professional ranking; suggestions editable; no PII leakage.
- Locations (AR): province/city pickers using src/lib/locations; denormalize location on docs for indexing.

## 6. Actions & AI Prompts (Vibe Coding)

- Principles: single task per Action, typed input/output, auth + limits inside Actions, pure returns { ok, data?, error? }.
- Actions (examples):
  - auth: upsertUserOnLogin
  - professionals: createOrUpdateProfessional, getProfessionalById, listProfessionals, refreshProfessionalSnapshots
  - services: createService, updateService, listServices, getServiceById
  - search: searchServices, searchProfessionals
  - quotes: requestQuote, sendQuote, acceptQuote, rejectQuote
  - reviews: createReview, listReviewsForProfessional
  - messages: startThread, sendMessage, listMessagesForThread
  - subscriptions: createSubscriptionCheckout, handleSubscriptionWebhook, getSubscriptionStatus, upgradeToPro
  - ai: suggestProfileImprovements, suggestProfessionalsForProject
  - locations: getCitiesByProvinceId, getCityInformation
- Prompt snippets:
  - Implement createService Action with input { ownerId, title, description, keywords[], priceFrom, location }, validate, enforce limits, auto-promote the user's role to 'professional' if needed (creating professionals doc), denormalize professionalSummary onto the service, write to Firestore, return { ok, data, error }.
  - Implement searchServices with keyword match (title/description/keywords), optional province/city filters, pagination, and list required composite indexes.
  - Implement suggestProfileImprovements (server-only) returning { headline, bio, keywords[] } tailored to Argentina marketplace.
  - Implement suggestProfessionalsForProject: fetch candidate professionals by keywords/skills; rank with Gemini; return top 10 with scores.
  - Implement refreshProfessionalSnapshots: when a professional updates displayName/avatar/headline, batch update professionalSummary across their services; allow eventual consistency on MVP.
  - Implement createSubscriptionCheckout (Mercado Pago): server-only; returns checkout/subscription init URL; no secrets exposed to client. Implement handleSubscriptionWebhook to validate provider notification and update subscriptions/status idempotently.

## 7. Security Rules (Outline)

- users: read public; write only self.
- professionals: public read; owner-only write; computed fields by privileged actions.
- services: owner-only create/update; public read when active.
- reviews: create only if accepted quote exists; immutable after 24h; public read.
- quotes: create by involved parties; read by owner (user/professional); valid state transitions only.
- messages: only participants can read/write; thread membership enforced.
- subscriptions: read own; write by system/provider webhook.
- storage: validate content types and owner paths; separate folders per resource.

## 8. Environment & Deployment

- Env vars (Vercel): NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, NEXT_PUBLIC_FIREBASE_APP_ID, GEMINI_API_KEY (server only), MP_ACCESS_TOKEN (server only), MP_WEBHOOK_URL (configured in provider dashboard).
- Single Firebase init (src/lib/firebase.ts). No secrets in client or logs. Deploy to Vercel on main.

## 9. Milestones (Suggested)

- Sprint 0 (1w): scaffolding, auth baseline, shadcn/ui, locations pickers, baseline rules, sample Action pattern.
- Sprint 1 (2w): professional profile CRUD, Storage uploads, services CRUD, basic search, public listings.
- Sprint 2 (2w): messaging/threads, quote flow, review flow with eligibility, notifications.
- Sprint 3 (2w): subscriptions (mock provider), limits/visibility, Gemini profile suggestions + basic matching.
- Sprint 4 (1w): indexes, performance, rules audit, analytics hooks, launch checklist.

## 10. Indexes (Examples)

- services: keywords array + status + provinceId/cityId.
- professionals: keywords array + visibilityScore.
- reviews: professionalId + createdAt desc.
- messages: threadId + createdAt asc.
- quotes: userId/professionalId + createdAt desc.

## 11. Risks & Mitigations

- Search relevance: composite indexes + lightweight ranking.
- Abuse/spam: rate-limit actions, report flags.
- Costs: cap image sizes, pagination, denormalize carefully, batch writes.
- Compliance (Argentina): careful PII handling, account deletion, clear terms/contact; Spanish UI later.

## 12. Definition of Done

- Requirements met; accessibility pass; strict types; tests for core Actions; no console errors; CI green; Action input/output documented.

## 13. Denormalization Strategy (NoSQL)

- Embed small, frequently used summaries to avoid fan-out reads in lists:
  - services.professionalSummary { id, displayName, avatarUrl, headline, subscriptionTier, avgRating, reviewCount }.
  - quotes.serviceTitle, quotes.professionalSummary, quotes.userSummary for inbox/notifications.
  - threads.participantsSummary and lastMessagePreview for conversation lists.
  - professionals.lastReviewSnippets (max 3) to render profile quickly.
- Keep authoritative data in primary docs (users/professionals/services). Summaries are derived and can be stale briefly.
- Maintain consistency in server Actions using batched writes/transactions where needed; schedule background refresh via refreshProfessionalSnapshots after profile updates.
- Prefer denormalized location fields (provinceId, provinceName, cityId, cityName) on professionals and services for indexing and filtering.

### Normalization vs Denormalization

- Normalization: storing single sources of truth with references to avoid duplication. Pros: data integrity, smaller writes. Cons: multiple reads/joins required for listing views, which is inefficient in NoSQL.
- Denormalization: duplicating small, read-optimized fragments (summaries) into target documents. Pros: fewer reads and simpler queries; better list rendering performance. Cons: needs consistency updates on change; acceptable eventual consistency when summaries are non-critical.
- Approach in this MVP: authoritative data lives in users/professionals/services; summaries are denormalized for list/detail performance. Consistency maintained within Actions via batch writes and background refresh when needed.

## 14. Payments (Mercado Pago)

- Provider: Mercado Pago will be used for Professional subscriptions in Argentina.
- Flow:
  - Upgrade: Professional triggers createSubscriptionCheckout Action -> server calls Mercado Pago API to create a subscription/preapproval/checkout -> returns init URL -> client redirects.
  - Webhooks: handleSubscriptionWebhook receives provider notifications and updates subscriptions { status, providerRef.\* } idempotently.
- Security: server-side only credentials; verify webhook authenticity per provider documentation; do not expose tokens to client; log structured non-sensitive events.
- Data mapping: store paymentProvider 'mercado_pago' and providerRef IDs (subscriptionId/preapprovalId/planId); map provider statuses to internal status ('active', 'canceled', 'past_due', etc.).
- Dev/Sandbox: use test credentials and sandbox flows in development; feature-flag if needed.

## 15. Developer Resources

- The documentation for Next.js, Firebase, Mercado Pago, and shadcn/ui is indexed in the IDE. You can leverage AI prompts from this document to accelerate “vibe coding” while cross-referencing the indexed docs.
