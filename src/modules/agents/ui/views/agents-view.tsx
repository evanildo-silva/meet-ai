"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data} />
      {data.length === 0 && (
        <EmptyState
          title={"Crie seu primeiro Operador"}
          description={
            "Crie um agente para participar das suas reuniões. Cada agente seguirá suas instruções e poderá interagir com os participantes durante a chamada."
          }
        />
      )}
    </div>
  );
};

const AgentsViewLoading = () => {
  return (
    <LoadingState
      title={"Carregando Operadores"}
      description={"Isso pode levar alguns segundos"}
    />
  );
};

const AgentsViewError = () => {
  return (
    <ErrorState
      title={"Carregando Operadores"}
      description={"Isso pode levar alguns segundos"}
    />
  );
};

export { AgentsView, AgentsViewLoading, AgentsViewError };
