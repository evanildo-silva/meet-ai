import { Dispatch, SetStateAction } from "react";

import {
  CommandInput,
  CommandList,
  CommandItem,
  CommandResponsiveDialog,
} from "@/components/ui/command";

interface DashboardCommadPrpos {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommad = ({ open, setOpen }: DashboardCommadPrpos) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Encontre uma reunião ou assistente" />
      <CommandList>
        <CommandItem>Teste...</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

export { DashboardCommad };
