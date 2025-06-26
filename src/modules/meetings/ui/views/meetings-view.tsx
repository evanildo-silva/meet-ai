"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

const MeetingsView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onClickRow={(row) => router.push(`/meetings/${row.id}`)}
      />
      {data.items.length === 0 && (
        <EmptyState
          title={"Crie sua primeira Reunião"}
          description={
            "Agende uma reunião para se conectar com outras pessoas. Cada reunião permite que você colabore, compartilhe ideias e interaja com outros participantes em tempo real."
          }
        />
      )}
    </div>
  );
};

const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title={"Carregando Assistentes"}
      description={"Isso pode levar alguns segundos"}
    />
  );
};

const MeetingsViewError = () => {
  return (
    <ErrorState
      title={"Erro ao Carregar os Assistentes"}
      description={"Aconteceu algo errado, tente novamente"}
    />
  );
};

export { MeetingsView, MeetingsViewLoading, MeetingsViewError };
