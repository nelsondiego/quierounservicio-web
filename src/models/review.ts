import type { Timestamp } from 'firebase/firestore';
import type { ID, LocationSummary, UserRole } from './common';

export interface User extends Record<string, unknown> {
  id: ID;
  role: UserRole;
  displayName: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  location?: LocationSummary | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type UserDoc = User;