
export type User = {
  id: string
  name: string
  email: string
  password: string
  role: Role
  tickets: Ticket[]
}

export type Ticket = {
  id: number
  type: TicketType
  reason: string
  description: string
  customer: string
  vehicle?: string | null
  passiveContact: boolean
  contactType: ContactType | null
  status: TicketStatus
  assignedTo?: string | null
  userId?: string | null
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  deadline?: Date | null
}

export enum TicketType {
  SUPPORT = 'SUPPORT',
  SALES = 'SALES',
  RELATIONSHIP = 'RELATIONSHIP',
  OPERATIONAL = 'OPERATIONAL'
}

export enum ContactType {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  CHAT = 'CHAT',
  IN_PERSON = 'IN_PERSON'
}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED'
}

export enum Role {
  ADMIN = 'ADMIN',
  ATTENDANT = 'ATTENDANT'
}

export type UserInfo = {
  email: string;
  exp: number;
  iat: number;
  name: string;
  role: string;
  token: string;
  userId: string;
}

// API requests

export type getTicketsInput = {
  page?: number
  limit?: number
  filters?: {
    search?: string
    type?: TicketType
    orderBy?: string
    status?: TicketStatus
    reason?: string
    customer?: string
    assignedTo?: string
    vehicle?: string
    createdAt_lte?: Date
    createdAt_gte?: Date
  }
}

export type getTicketsOutput = {
  tickets: Ticket[]
  count: number
  page: number
  pageSize: number
  totalPages: number
}