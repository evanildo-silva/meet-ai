import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  instructions: z.string().min(1, { message: "Instruções são obrigatórias" }),
});

export type AgentsInsertType = z.infer<typeof agentsInsertSchema>;
