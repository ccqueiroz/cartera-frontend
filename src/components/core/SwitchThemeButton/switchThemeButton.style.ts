import { clsx } from "clsx";

const mergeClassButton = clsx(
  "w-24 h-10 rounded-full px-1",
  "bg-transparent bg-gradient-to-bl	from-[#FFFFFF3B] to-[#FFFFFF0F] blur-[0.5px]",
  "rounded-[0.625rem] cursor-pointer border-solid border-secondary",
  "relative flex items-center gap-1 transition-all duration-300 ease-in-out",
  "before:absolute before:inset-0 before:border-2 before:border-[#b294ea00] before:rounded-full before:content-['']",
  "shadow-[0px_0.5px_4px] shadow-contrastTheme/40",
  "hover:bg-accent/80"
);

const mergeClassWrapperComponent = clsx(
  "w-full h-full flex items-center justify-start gap-2 px-2",
  "active:scale-[0.98] transition-transform"
);

const mergeClassSvg = clsx(
  "size-7 rounded-full p-1",
  "bg-gradient-to-tl from-[#FFFFFF3B] to-[#FFFFFF0F] blur-[0.2px] brightness-100",
  "shadow-[inset_2px_2px_5px_rgba(109,103,101,0.4),inset_-2px_-2px_5px_rgba(253,253,253,0.1)]",
  "border border-[#aaa]",
  "z-10 fill-contrastTheme/80",
  "text-contrastTheme/80"
);

const mergeClassSpan = clsx(
  "text-sm font-semibold text-contrastTheme translate-y-[2px] mb-[3px]"
);

export {
  mergeClassWrapperComponent,
  mergeClassButton,
  mergeClassSvg,
  mergeClassSpan,
};
