import type { Timestamp } from 'firebase/firestore';
import type { ID, UserSummary } from './common';

export interface Thread extends Record<string, unknown> {
  id: ID;
  participants: ID[];
  participantsSummary: UserSummary[];
  lastMessagePreview?: string | null;
  lastMessageAt?: Timestamp | null;
}

export interface Message extends Record<string, unknown> {
  id: ID;
  threadId: ID;
  fromUserId: ID;
  toUserId: ID;
  body: string;
  createdAt: Timestamp;
}

export type ThreadDoc = Thread;
export type MessageDoc = Message;