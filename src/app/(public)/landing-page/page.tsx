import { LayoutPublic } from "../components/layout/layout.view";
import { Logo } from "../components/Logo/logo.component";
import { ArrowDown } from "lucide-react";
import { FeaturesPreview } from "./fragments/FeaturesPreview/features-preview.components";

export default function LandingPage() {
  return (
    <LayoutPublic>
      <div className="max-w-4xl mx-auto text-center">
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
          <p className="text-white/50 text-sm mt-2">Explore o dashboard</p>
        </div>
      </div>
    </LayoutPublic>
  );
}
