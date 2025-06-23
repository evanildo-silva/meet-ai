import { z } from "zod";

const agentsInsertSchema = z.object({
  name: z.string().min(1, {message: "Nome é obrigatório"}),
  instructions: z.string().min(1, {message: "Instruções são obrigatórias"})
})

export { agentsInsertSchema }