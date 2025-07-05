import { GlassCard } from "@/app/components/core/glassCard/glassCard.component";

const featuresPreview = [
  {
    title: "Dashboard Intuitivo",
    description: "Interface moderna com glassmorphism",
    icon: "📊",
  },
  {
    title: "Controle Total",
    description: "Gerencie todas suas contas em um lugar",
    icon: "💰",
  },
  {
    title: "Insights IA",
    description: "Análises inteligentes dos seus gastos",
    icon: "🧠",
  },
];
export const FeaturesPreview = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-fade-in-up"
    >
      {featuresPreview.map((f, i) => (
        <GlassCard
          key={i}
          variant="light"
          className="p-6 text-center card-hover"
          style={{ animationDelay: `${1000 + i * 100}ms` }}
        >
          <div className="text-3xl mb-3">{f.icon}</div>
          <h3 className="text-lg font-semibold text-white mb-2">{f.title}</h3>
          <p className="text-white/60 text-sm">{f.description}</p>
        </GlassCard>
      ))}
    </div>
  );
};
