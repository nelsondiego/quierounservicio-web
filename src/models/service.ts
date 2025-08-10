import type { Timestamp } from 'firebase/firestore';
import type { ID, Currency, LocationSummary, ProfessionalSummary, ServiceStatus } from './common';

export interface Service extends Record<string, unknown> {
  id: ID;
  ownerId: ID;
  title: string;
  description: string;
  keywords?: string[];
  priceFrom?: number | null;
  currency: Currency;
  images?: string[];
  location?: LocationSummary | null;
  professionalSummary: ProfessionalSummary;
  status: ServiceStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ServiceDoc = Service;