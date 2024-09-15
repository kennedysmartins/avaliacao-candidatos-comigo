import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(5, {
    message: "Seu email precisa ter pelo menos 5 dígitos",
  }),
  password: z
    .string()
    .min(5, {
      message: "Sua senha precisa ter pelo menos 5 dígitos",
    })
    .optional(),
  keepConnected: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
