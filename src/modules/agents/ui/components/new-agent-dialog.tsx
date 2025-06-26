import { ResposiveDialog } from "@/components/reponsive-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
  return (
    <ResposiveDialog
      title="Novo Assistente"
      description="Crie um novo assistente"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResposiveDialog>
  );
};

export { NewAgentDialog };
