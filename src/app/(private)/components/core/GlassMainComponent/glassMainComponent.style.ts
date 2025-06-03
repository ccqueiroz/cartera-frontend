import { clsx } from "clsx";

const mergeClassWrapperComponent = clsx("w-full p-4 overflow-auto");

const mergeClassContainerChildren = clsx(
  "w-full h-[130vh] overflow-auto",
  "mx-auto p-2",
  "bg-transparent bg-gradient-to-bl from-[#61478e3b] to-[#2d2c2c00] backdrop-blur-sm",
  "border rounded-md",
  "shadow-[0.5px_0.5px_4px] shadow-contrastTheme/40"
);

export { mergeClassWrapperComponent, mergeClassContainerChildren }