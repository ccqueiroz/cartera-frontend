import { Footer } from "./components/footer/footer.component";
import { HeaderPrivate } from "./components/header/header.view";

export default function LayoutPrivate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container w-full h-full flex flex-col gap-4 p-1 pb-20 sm:p-4 sm:pb-20">
      <HeaderPrivate />
      {children}
      <Footer />
    </div>
  );
}
