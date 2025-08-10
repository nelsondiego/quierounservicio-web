import type { Timestamp } from 'firebase/firestore';
import type { ID, PaymentProvider, SubscriptionStatus, SubscriptionTier } from './common';

export interface Subscription extends Record<string, unknown> {
  id: ID;
  professionalId: ID;
  tier: SubscriptionTier;
  period?: 'monthly' | 'yearly';
  status: SubscriptionStatus;
  paymentProvider: PaymentProvider;
  providerRef?: {
    subscriptionId?: string;
    preapprovalId?: string;
    planId?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type SubscriptionDoc = Subscription;