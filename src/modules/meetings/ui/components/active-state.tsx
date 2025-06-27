import Link from "next/link";
import { VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

interface ActiveStateProps {
  meetingId: string;
}

const ActiveState = ({ meetingId }: ActiveStateProps) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Reunião iniciada"
        description="A reunião terminará quando todos os participantes tiverem saído"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`call/${meetingId}`}>
            <VideoIcon />
            Entrar
          </Link>
        </Button>
      </div>
    </div>
  );
};

export { ActiveState };
