import { NeonButton } from "@/app/components/core/neonButton/neonButton.component";

export const SubmitAuthButton = ({
  title,
  isSubmitting,
}: {
  title: string;
  isSubmitting: boolean;
}) => {
  return (
    <div className="w-full max-w-60 mx-auto">
      <NeonButton
        type="submit"
        className="w-full"
        disabled={isSubmitting}
        isLoading={isSubmitting}
      >
        {title}
      </NeonButton>
    </div>
  );
};
