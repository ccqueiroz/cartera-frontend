import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { useEffect } from "react";
import { toast } from "sonner";

export const useTriggerToastError = ({
  state,
}: {
  state: HandleRequestDTO<unknown> & { triggerAt?: number; error?: string };
}) => {
  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state.error, state.triggerAt]);
};
