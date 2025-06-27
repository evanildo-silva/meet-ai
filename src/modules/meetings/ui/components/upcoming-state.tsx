import Link from "next/link";
import { VideoIcon, BanIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

interface UpcomingStateProps {
  meetingId: string;
  isCancelling: boolean;
  onCancelMeeting: VoidFunction;
}

const UpcomingState = ({
  meetingId,
  isCancelling,
  onCancelMeeting,
}: UpcomingStateProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Não iniciada"
        description="Assim que você iniciar esta reunião, um resumo aparecerá aqui"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          disabled={isCancelling}
          variant="secondary"
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
        >
          <BanIcon />
          Cancelar reunião
        </Button>
        <Button asChild disabled={isCancelling} className="w-full lg:w-auto">
          <Link href={`call/${meetingId}`}>
            <VideoIcon />
            Iniciar reunião
          </Link>
        </Button>
      </div>
    </div>
  );
};

export { UpcomingState };
