import { Header } from "../header/header.component";

type LayoutPublicTypes = {
  children: React.ReactNode;
};

export const LayoutPublic = ({ children }: LayoutPublicTypes) => {
  return (
    <div className="w-full relative">
      <Header />
      {children}
    </div>
  );
};
