type LayoutPublicTypes = {
  children: React.ReactNode;
};

export const LayoutPublic = ({ children }: LayoutPublicTypes) => {
  return (
    <section className="xl:h-screen hsm:h-full relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5" />
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-neon-blue/10 blur-3xl animate-pulse-neon" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl animate-pulse-neon" />

      <div className="container max-auto px-4 relative z-10">{children}</div>
    </section>
  );
};
