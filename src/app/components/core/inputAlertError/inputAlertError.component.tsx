import { memo } from "react";

const InputAlertError = memo(({ error }: { error?: string }) => {
  return (
    error && (
      <span role="alert" className="text-xs text-destructive italic">
        {error}
      </span>
    )
  );
});

InputAlertError.displayName = "InputAlertError";

export { InputAlertError };
