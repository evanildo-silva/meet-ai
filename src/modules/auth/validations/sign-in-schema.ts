import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

export type SignInSchema = z.infer<typeof signInSchema>;
