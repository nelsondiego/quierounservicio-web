import type { Timestamp } from 'firebase/firestore';

export type ID = string;
export type Currency = 'ARS';
export type UserRole = 'user' | 'professional';
export type ServiceStatus = 'active' | 'paused';
export type QuoteStatus = 'sent' | 'accepted' | 'rejected';
export type SubscriptionTier = 'free' | 'pro';
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due';
export type PaymentProvider = 'mercado_pago';

export interface LocationSummary {
  provinceId: number;
  provinceName: string;
  cityId: number;
  cityName: string;
}

export interface UserSummary {
  id: ID;
  displayName: string;
  avatarUrl?: string | null;
}

export interface ProfessionalSummary {
  id: ID;
  displayName: string;
  avatarUrl?: string | null;
  headline?: string | null;
  subscriptionTier: SubscriptionTier;
  avgRating: number;
  reviewCount: number;
}

export interface CreatedUpdated {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}