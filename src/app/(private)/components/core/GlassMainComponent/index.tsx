import { mergeClassContainerChildren, mergeClassWrapperComponent } from "./glassMainComponent.style";

export default function GlassMainComponent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={mergeClassWrapperComponent}>
      <div className={mergeClassContainerChildren}>
        {children}
      </div>
    </div>
  );
}
