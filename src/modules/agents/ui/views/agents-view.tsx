"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

const AgentsViewLoading = () => {
  return (
    <LoadingState
      title={"Carregando Operadores"}
      description={"Isso pode levar alguns segundos"}
    />
  );
}

const AgentsViewError = () => {
  return (
    <ErrorState
      title={"Carregando Operadores"}
      description={"Isso pode levar alguns segundos"}
    />
  );
}

export { AgentsView, AgentsViewLoading, AgentsViewError };

