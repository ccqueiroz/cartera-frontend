import GlassComponent from "../GlassComponent/glass-component.component";
import { mergeClassSectionMain } from "./section.main.style";

export default function SectionMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      aria-label="Section com informações do dashboard do usuário"
      className={mergeClassSectionMain}
    >
      <GlassComponent>{children}</GlassComponent>
    </section>
  );
}
