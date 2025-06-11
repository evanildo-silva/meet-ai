import { Dispatch, SetStateAction } from "react";

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CommandItem } from "cmdk";

interface DashboardCommadPrpos {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommad = ({ open, setOpen }: DashboardCommadPrpos) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Encontre uma reunião ou operador" />
      <CommandList>
        <CommandItem>Teste...</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};

export { DashboardCommad };
