import { EmptyState } from "@/components/empty-state";

const ProcessingState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Reunião concluída"
        description="Esta reunião foi concluída, um resumo será publicado em breve"
        image="/processing.svg"
      />
    </div>
  );
};

export { ProcessingState };
