import { MeetingGetOne } from "../../types";

import { MeetingForm } from "./meeting-form";
import { ResposiveDialog } from "@/components/reponsive-dialog";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initValues: MeetingGetOne;
}

const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResposiveDialog
      title="Editar Reunião"
      description="Edite os detalhes da reunião"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initValues={initValues}
      />
    </ResposiveDialog>
  );
};

export { UpdateMeetingDialog };
