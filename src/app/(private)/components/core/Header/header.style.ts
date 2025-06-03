import clsx from "clsx";

const mergeClassHeader = clsx(
  "relative left-[5rem] w-[calc(100%-5rem)] h-28",
  "flex",
  "p-4",
  "[&>div]:hidden [&>div]:md:block"
);

const mergeClassNav = clsx(
  "w-full max-w-[2100px] mx-auto px-0 md:px-4",
  "hidden overflow-x-clip md:block"
);

const mergeClassUlHeader = clsx(
  "flex items-center justify-between",
  "px-5 py-2"
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
  "flex flex-col items-baseline mt-2"
);

export {
  mergeClassHeader,
  mergeClassNav,
  mergeClassUlHeader,
  mergeClassImageLogo,
  mergeClassContainerLogo,
  mergeClassGreetingsUser,
};
