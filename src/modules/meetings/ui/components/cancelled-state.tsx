import { EmptyState } from "@/components/empty-state";

const CancelledState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Reunião cancelada"
        description="Essa reunião foi cancelada"
        image="/cancelled.svg"
      />
    </div>
  );
};

export { CancelledState };
