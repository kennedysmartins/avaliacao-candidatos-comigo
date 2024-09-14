
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
  contactType: ContactType
  status: TicketStatus
  assignedTo?: User | null
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