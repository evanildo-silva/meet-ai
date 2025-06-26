"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { columns } from "../components/columns";
import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { EmptyState } from "@/components/empty-state";
import { LoadingState } from "@/components/loading-state";
import { DataPagination } from "../components/data-pagination";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

const AgentsView = () => {
  const [filters, setFilters] = useAgentsFilters();
  const router = useRouter();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data.items}
        onClickRow={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title={"Crie seu primeiro Assistente"}
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
      title={"Carregando Assistentes"}
      description={"Isso pode levar alguns segundos"}
    />
  );
};

const AgentsViewError = () => {
  return (
    <ErrorState
      title={"Erro ao Carregar os Assistentes"}
      description={"Aconteceu algo errado, tente novamente"}
    />
  );
};

export { AgentsView, AgentsViewLoading, AgentsViewError };
