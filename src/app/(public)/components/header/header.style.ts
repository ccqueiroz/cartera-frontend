import clsx from "clsx";

const mergeClassHeader = clsx(
  "w-full h-28",
  "flex",
  "p-4",
  "shadow-[0px_-30px_50px_rgba(--foreground)] shadow-foreground",
  "fixed z-40 lg:top-0"
);

const mergeClassNav = clsx("w-full max-w-[1700px] mx-auto px-4", "hidden overflow-x-clip xl:block");

const mergeClassUlHeader = clsx(
  "flex items-center justify-between",
  "px-5 py-4"
);

const mergeClassImageLogo = clsx(
  "brightness-90 drop-shadow-[0_0_4px_rgba(234,228,246,0.1)]", //mudar esse cara para dar mais efeito no tema light.
  "hover:brightness-95",
  "transition duration-300"
);

const mergeClassSigInLink = clsx(
  "group flex w-full items-center justify-center gap-5",
  "rounded-[0.625rem] cursor-pointer border-solid border-secondary",
  "uppercase text-contrastTheme transition-colors ease-in-out duration-300 text-md font-bold",
  "disabled:cursor-not-allowed disabled:opacity-75",
  "px-4 py-[0.875rem]",
  "max-h-11 md:w-full bg-transparent bg-gradient-to-bl	from-[#FFFFFF3B] to-[#FFFFFF0F] backdrop-blur-sm",
  "hover:bg-accent/80",
  "shadow-[0.5px_0.5px_4px] shadow-contrastTheme"
);

export {
  mergeClassHeader,
  mergeClassNav,
  mergeClassUlHeader,
  mergeClassImageLogo,
  mergeClassSigInLink,
};
