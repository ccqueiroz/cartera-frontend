import { Toaster } from "sonner";
import { ProgressBar } from "../progressBar/progress-bar.component";
export default function MainProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <ProgressBar>{children}</ProgressBar>
      <Toaster closeButton expand={false} position="top-right" richColors />
    </div>
  );
}
