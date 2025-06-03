import clsx from "clsx";

const mergeClassHeader = clsx("w-full h-28", "flex", "p-4", "[&>div]:hidden [&>div]:md:block");

const mergeClassNav = clsx(
  "w-full max-w-[2100px] mx-auto px-0 md:px-4",
  "hidden overflow-x-clip md:block"
);

const mergeClassUlHeader = clsx(
  "flex items-center justify-between",
  "px-5 py-4"
);

const mergeClassContainerLogo = clsx(
  "w-[60px] h-[60px]",
  " flex items-center justify-center",
  "rounded-full",
  "bg-transparent bg-gradient-to-bl	from-[#FFFFFF3B] to-[#FFFFFF0F] blur-[0.3px]",
  "shadow-[0px_0.5px_4px] shadow-contrastTheme/80",
  "mr-4"
);

const mergeClassImageLogo = clsx(
  "-rotate-12",
  "hover:brightness-95",
  "transition duration-300"
);

const mergeClassGreetingsUser = clsx(
  "text-contrastTheme leading-4",
  "flex flex-col items-baseline"
);

const mergeClassSigInLink = clsx(
  "group flex w-full items-center justify-center gap-5",
  "rounded-[0.625rem] cursor-pointer border-solid border-secondary",
  "uppercase text-contrastTheme transition-colors ease-in-out duration-300 text-md font-bold",
  "disabled:cursor-not-allowed disabled:opacity-75",
  "px-4 py-[0.875rem]",
  "max-h-11 md:w-full bg-transparent bg-gradient-to-bl from-[#FFFFFF3B] to-[#FFFFFF0F] backdrop-blur-sm",
  "hover:bg-accent/80",
  "shadow-[0.5px_0.5px_4px] shadow-contrastTheme/80"
);

export {
  mergeClassHeader,
  mergeClassNav,
  mergeClassUlHeader,
  mergeClassImageLogo,
  mergeClassSigInLink,
  mergeClassContainerLogo,
  mergeClassGreetingsUser,
};
