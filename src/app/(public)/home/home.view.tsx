import { ArrowDown } from "lucide-react";
import { LayoutPublic } from "../views/layout/layout.view";
import { cn } from "@/app/lib/cn.utils";
import Link from "next/link";
import { ROUTES } from "@/infra/constants/routes.constants";
import { Logo } from "@/app/components/core/logo/logo.component";
import { FeaturesPreview } from "./components/FeaturesPreview/featuresPreview.components";

export default function HomeView() {
  return (
    <LayoutPublic>
      <div className="max-w-4xl mx-auto text-center">
        <div
          className={cn(
            "w-24 h-10 sm:w-32 sm:h-12 flex items-center justify-center text-md sm:text-lg",
            "rounded-md cursor-pointer border border-neon-purple/40",
            "hover:neon-shadow-purple glass-light transition-shadow duration-300",
            "absolute -top-14 right-4 sm:-top-14 sm:right-4 md:-top-14 xl:-top-[5%] xl:right-[5%]"
          )}
        >
          <Link href={ROUTES.PUBLIC.login}>Entrar</Link>
        </div>

        <Logo size="xl" />
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up"
          style={{ animationDelay: "200ms" }}
        >
          Sua carteira digital
          <br />
          <span className="bg-gradient-neon bg-clip-text text-transparent bg-200% animate-gradient-flow">
            inteligente
          </span>
        </h1>
        <p
          className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          Gerencie suas finanças com tecnologia de ponta. Dashboard moderno,
          controle total e insights em tempo real.
        </p>

        <FeaturesPreview />

        <div
          className="animate-bounce animate-fade-in-up"
          style={{ animationDelay: "1200ms" }}
        >
          <ArrowDown className="mx-auto text-white/50" size={24} />
          <p className="text-white/50 text-sm mt-2 underline">
            Click aqui para Entrar
          </p>
        </div>
      </div>
    </LayoutPublic>
  );
}
