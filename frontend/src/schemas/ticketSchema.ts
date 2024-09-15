import * as z from "zod";

export const ticketSchema = z
  .object({
    id: z.string().optional().nullable(),
    passiveContact: z.string().min(1, "O contato passivo é obrigatório"),
    contactType: z.string().nullable().optional(),
    type: z
      .string()
      .nullable()
      .refine((val) => val !== null, "O tipo de ticket é obrigatório."),
    vehicle: z.string().nullable(),
    reason: z
      .string()
      .nullable()
      .refine(
        (val) => val !== null && val.trim().length > 0,
        "O motivo é obrigatório."
      ),
    deadline: z.string().nullable(),
    description: z.string().min(1, "A descrição é obrigatória"),
    customer: z.string().min(1, "O cliente é obrigatório"),
    userId: z.string().nullable().optional(),
  })
  .refine(
    (data) => !(data.passiveContact === "true" && data.contactType === null),
    "O tipo de contato é obrigatório."
  );

export type TicketSchema = z.infer<typeof ticketSchema>;
