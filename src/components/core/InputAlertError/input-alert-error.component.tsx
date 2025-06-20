export const InputAlertError = ({ error }: { error?: string }) => {
  return (
    error && <span className="text-xs text-destructive italic">{error}</span>
  );
};
