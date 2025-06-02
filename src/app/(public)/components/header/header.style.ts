import clsx from "clsx";

const mergeClassHeader = clsx(
  "w-full h-28",
  "flex",
  "p-4",
  "shadow-md shadow-gray-900",
  "fixed z-40 lg:top-0"
);

const mergeClassNav = clsx("w-full", "hidden overflow-x-clip xl:block");

const mergeClassUlHeader = clsx(
  "flex items-center justify-between",
  "px-5 py-4"
);

const mergeClassImageLogo = clsx(
  "drop-shadow-[0_0_4px_rgba(0,255,255,0.2)]",
  "hover:brightness-95",
  "transition duration-300"
);

const mergeClassSigInLink = clsx(
  "group flex w-full items-center justify-center gap-5",
  "rounded-[0.625rem] cursor-pointer border-solid border-secondary",
  "uppercase text-popover-foreground transition-colors ease-in-out duration-300 text-md font-bold",
  "disabled:cursor-not-allowed disabled:opacity-75",
  "px-4 py-[0.875rem]",
  "max-h-11 md:w-full bg-transparent",
  "hover:bg-accent/80",
  "shadow-[0.5px_0.5px_4px_rgba(--foreground/80)] shadow-foreground"
);

export {
  mergeClassHeader,
  mergeClassNav,
  mergeClassUlHeader,
  mergeClassImageLogo,
  mergeClassSigInLink,
};
