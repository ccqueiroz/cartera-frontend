import { useTheme } from "@/app/_providers/theme/theme.context.provider";
import { theme } from "@/styles/theme";

interface DefaultButtonInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary" | "tertiary";
  // size: "auto" | "lg" | "md" | "sm";
  hasBoder: boolean;
  children: React.ReactNode;
}

const selectedColorByVariant = (
  variant: Pick<DefaultButtonInterface, "variant">
) => {
  if (
    variant ===
    ("secondary" as unknown as Pick<DefaultButtonInterface, "variant">)
  )
    return "textSecondary";
  else return "textPrimary";
};

export function DefaultButton({
  variant = "primary",
  hasBoder = true,
  children,
  ...props
}: DefaultButtonInterface) {
  const { selectedTheme } = useTheme();

  return (
    <button {...props}>
      {children}
      <style jsx>{`
        button {
          width: ${theme.spacing[35]};
          height: ${theme.spacing[12]};
          background: ${selectedTheme.colors[variant] ||
          selectedTheme.colors.primary};
          color: ${selectedTheme.colors[
            selectedColorByVariant(
              variant as unknown as Pick<DefaultButtonInterface, "variant">
            )
          ]};
          font-size: 1.6rem;
          border-radius: ${theme.borderRadius.md};
          outline: none;
           {
            /* cursor: ${props.disabled ? "not-allowed" : "pointer"}; */
          }
          ${hasBoder ? `border: 1px solid ${selectedTheme.colors.border};` : ""}
        }

        button:hover {
          opacity: 0.7;
        }
      `}</style>
    </button>
  );
}
