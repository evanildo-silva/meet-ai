import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";

import { withTimestamps } from "../utils";

export const agentsRouter = createTRPCRouter({
  // TODO: Change `getMany` to use `protectedProcedure`
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    return data;
  }),

  create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values(withTimestamps({ ...input, userId: ctx.auth.user.id }))
        .returning();

      return createdAgent;
    }),
});
