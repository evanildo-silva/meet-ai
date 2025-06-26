"use client"

import { ErrorState } from "@/components/error-state";

const ErrorPage = () => {
  return (
    <ErrorState
      title={"Erro ao carregar os Assistentes"}
      description={"Por favor tente mais tarde"}
    />
  );
}

export default ErrorPage