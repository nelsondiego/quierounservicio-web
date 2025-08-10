import type { Timestamp } from 'firebase/firestore';
import type { ID, Currency, ProfessionalSummary, UserSummary } from './common';
import type { QuoteStatus } from './common';

export interface Quote extends Record<string, unknown> {
  id: ID;
  serviceId: ID;
  professionalId: ID;
  userId: ID;
  message?: string | null;
  amount?: number | null;
  currency: Currency;
  status: QuoteStatus;
  serviceTitle: string;
  professionalSummary: Pick<ProfessionalSummary, 'id' | 'displayName' | 'avatarUrl'>;
  userSummary: UserSummary;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type QuoteDoc = Quote;