import { z } from "zod";

export const ticketSchema = z.object({
  id: z.string().optional(),
  description: z.string(),
  status: z.string().optional(),
  userId: z.string().optional(),
  reason: z.string(),
  deadline: z.string().optional(),
  vehiclee: z.string().optional(),
  customer: z.string().optional(),
  type: z.string(),
  contactType: z.string().nullable().optional(),

});