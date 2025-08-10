import type { Timestamp } from 'firebase/firestore';
import type { ID, LocationSummary, SubscriptionTier } from './common';

export interface Professional extends Record<string, unknown> {
  id: ID; // same as user id
  headline?: string | null;
  bio?: string | null;
  skills?: string[];
  keywords?: string[];
  avgRating: number;
  reviewCount: number;
  subscription: {
    tier: SubscriptionTier;
    expiresAt?: Timestamp | null;
  };
  visibilityScore?: number;
  location?: LocationSummary | null;
  lastReviewSnippets?: Array<{
    reviewId: ID;
    rating: number;
    comment?: string | null;
    userDisplayName: string;
    createdAt: Timestamp;
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ProfessionalDoc = Professional;