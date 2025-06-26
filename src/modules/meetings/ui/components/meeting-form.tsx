import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { MeetingGetOne } from "../../types";

import { CommandSelect } from "@/components/command-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { meetingsInsertSchema, MeetingsInsertType } from "../../schema";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: VoidFunction;
  initValues?: MeetingGetOne;
}

const MeetingForm = ({ onSuccess, onCancel, initValues }: MeetingFormProps) => {
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const createMeetting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        // TODO: Invalidate free tier usage
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);

        //TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade"
      },
    })
  );

  const updateMetting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );

        if (initValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);

        //TODO: Check if error code is "FORBIDDEN", redirect to "/upgrade"
      },
    })
  );

  const form = useForm<MeetingsInsertType>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initValues?.name ?? "",
      agentId: initValues?.agentId ?? "",
    },
  });

  const isEdit = !!initValues?.id;
  const isPedding = createMeetting.isPending || updateMetting.isPending;

  const onSubmit = (values: MeetingsInsertType) => {
    if (isEdit) {
      updateMetting.mutate({ ...values, id: initValues.id });
    } else {
      createMeetting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Revisão de Matemática" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assistente</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Selecione um Assistente"
                  />
                </FormControl>
                <FormDescription>
                  Não encontrou o que procurava?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Criar Assistente
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="ghost"
                disabled={isPedding}
                type="button"
                onClick={onCancel}
              >
                Cancelar
              </Button>
            )}
            <Button disabled={isPedding} type="submit">
              {isEdit ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export { MeetingForm };
