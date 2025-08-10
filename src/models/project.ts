import type { Timestamp } from 'firebase/firestore';
import type { ID, LocationSummary } from './common';

export interface Project extends Record<string, unknown> {
  id: ID;
  ownerId: ID;
  title: string;
  description: string;
  keywords?: string[];
  location?: LocationSummary | null;
  matchedProfessionalIds?: ID[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type ProjectDoc = Project;