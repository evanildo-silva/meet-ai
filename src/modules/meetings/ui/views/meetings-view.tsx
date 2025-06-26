"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return <div>TODO: Meetings Table</div>;
};


const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title={"Carregando Operadores"}
      description={"Isso pode levar alguns segundos"}
    />
  );
};

const MeetingsViewError = () => {
  return (
    <ErrorState
      title={"Erro ao Carregar os Operadores"}
      description={"Aconteceu algo errado, tente novamente"}
    />
  );
};

export { MeetingsView, MeetingsViewLoading, MeetingsViewError };
