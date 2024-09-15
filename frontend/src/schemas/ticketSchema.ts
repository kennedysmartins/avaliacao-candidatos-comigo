import * as z from "zod";
import { TicketType, ContactType, TicketStatus } from "../lib/types";

export const ticketSchema = z.object({
  passiveContact: z.string(),
  contactType: z.nativeEnum(ContactType).optional().nullable(),
  type: z.nativeEnum(TicketType),
  vehicle: z.string().nullable(),
  reason: z.string().min(1, "O motivo é obrigatório"),
  deadline: z.string().nullable(),
  description: z.string().min(1, "A descrição é obrigatória"),
  customer: z.string().min(1, "O cliente é obrigatório"),
})

export type TicketSchema = z.infer<typeof ticketSchema>;