"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { MeetingStatus } from "../../types";
import { useConfirm } from "@/hooks/use-confirm";

import { ErrorState } from "@/components/error-state";
import { ActiveState } from "../components/active-state";
import { LoadingState } from "@/components/loading-state";
import { UpcomingState } from "../components/upcoming-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";

interface MeetingIdViewProps {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        // TODO: Invalidate free tier usage
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfimation, confirmRemove] = useConfirm(
    "Você tem certeza?",
    `A ação irá remover a reunião`
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeMeeting.mutateAsync({
      id: meetingId,
    });
  };

  const hasStatus = (current: typeof data.status, expected: MeetingStatus) =>
    current === expected;

  const isActive = hasStatus(data.status, MeetingStatus.Active);
  const isUpcoming = hasStatus(data.status, MeetingStatus.Upcoming);
  const isCancelled = hasStatus(data.status, MeetingStatus.Cancelled);
  const isCompleted = hasStatus(data.status, MeetingStatus.Completed);
  const isProcessing = hasStatus(data.status, MeetingStatus.Processing);

  return (
    <>
      <RemoveConfimation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            isCancelling={false}
            onCancelMeeting={() => {}}
          />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCancelled && <CancelledState />}
        {/*
         // TODO: CompletedState 
        */}
        {isCompleted && <div>Completed</div>}
        {isProcessing && <ProcessingState />}
      </div>
    </>
  );
};

const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title={"Carregando Reunião"}
      description={"Isso pode levar alguns segundos"}
    />
  );
};

const MeetingIdViewError = () => {
  return (
    <ErrorState
      title={"Erro ao Carregar a Reunião"}
      description={"Aconteceu algo errado, tente novamente"}
    />
  );
};

export { MeetingIdView, MeetingIdViewLoading, MeetingIdViewError };
