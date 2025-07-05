import { cn } from "@/app/lib/cn.utils";
import { LayoutPublic } from "../layout/layout.view";
import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";
import { Logo } from "@/app/components/core/logo/logo.component";

export const ManagementAccount = ({
  titlePage,
  children,
  className,
}: {
  titlePage: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <LayoutPublic>
      <div
        className={cn(
          "max-w-xl mx-auto text-center  animate-fade-in-up",
          className
        )}
      >
        <GlassCard variant="purple" animatePulse>
          <div className="p-6 pt-8">
            <Logo size="lg" />
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-6 animate-fade-in-up">
              Sua carteira digital
              <br />
              <span className="bg-gradient-neon bg-clip-text text-transparent bg-200% animate-gradient-flow">
                inteligente
              </span>
            </h1>
          </div>
          <GlassCard variant="blue" className="w-full rounded-t-none">
            <div className="w-full max-w-[95%] p-6 flex flex-col justify-center items-center gap-4 mx-auto sm:max-w-[75%]">
              <h2 className="w-full text-left text-2xl font-bold bg-gradient-neon bg-clip-text text-transparent bg-35%">
                {titlePage}
              </h2>
              {children}
            </div>
          </GlassCard>
        </GlassCard>
      </div>
    </LayoutPublic>
  );
};
