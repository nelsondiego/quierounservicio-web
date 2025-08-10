import { Timestamp } from 'firebase/firestore'
import { LocationSummary, UserRole } from './common'

export interface User {
  id: string
  role: UserRole
  displayName: string
  email: string
  phone?: string
  location?: LocationSummary
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CreateUserInput {
  displayName: string
  email: string
  phone?: string
  location?: LocationSummary
  role?: UserRole
}

export interface UpdateUserInput {
  displayName?: string
  phone?: string
  location?: LocationSummary
}
