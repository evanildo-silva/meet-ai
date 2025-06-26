import { z } from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  agentId: z.string().min(1, { message: "É obrigatório ter um operador" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Id é obrigatório" }),
});

export type MeetingsInsertType = z.infer<typeof meetingsInsertSchema>;
