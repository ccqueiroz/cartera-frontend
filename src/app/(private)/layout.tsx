import GlassMainComponent from "./components/core/GlassMainComponent";

export default function LayoutPrivateDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GlassMainComponent>{children}</GlassMainComponent>;
}
