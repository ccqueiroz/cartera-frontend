export const InputAlertError = ({ error }: { error?: string }) => {
  return (
    error && (
      <span role="alert" className="text-xs text-destructive italic">
        {error}
      </span>
    )
  );
};
