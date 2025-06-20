import { NeonButton } from "@/components/core/NeonButton/neon-button.component";
import { useFormStatus } from "react-dom";

export const SubmitAuthButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();

  return (
    <div className="w-full max-w-60 mx-auto">
      <NeonButton
        type="submit"
        className="w-full"
        disabled={pending}
        isLoading={pending}
      >
        {title}
      </NeonButton>
    </div>
  );
};
