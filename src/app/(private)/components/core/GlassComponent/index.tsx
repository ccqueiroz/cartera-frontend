import { mergeClassContainerChildren, mergeClassWrapperComponent } from "./glassComponent.style";

export default function GlassComponent({
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
