import { clsx } from "clsx";

const mergeClassWrapperComponent = clsx(
  "w-24 h-10 rounded-full px-1",
  "bg-gradient-to-br from-[#dcdcdc] to-[#dcdcdc]",
  "shadow-inner border border-border",
  "relative flex items-center gap-1 transition-all duration-300 ease-in-out",
  "rotate-[1deg] scale-[0.98]",
  "before:absolute before:inset-0 before:border-2 before:border-[#bfb8cc] before:rounded-full before:content-['']",
  "shadow-[0.5px_0.5px_4px_rgba(--foreground)] shadow-foreground",
  "hover:brightness-95"
);

const mergeClassButton = clsx(
  "w-full h-full flex items-center justify-start gap-2 px-2",
  "active:scale-[0.98] transition-transform"
);

const mergeClassSvg = clsx(
  "size-7 rounded-full p-1",
  "bg-gradient-to-tl from-[#807984b8] to-[#cccccc]",
  "shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)]",
  "border border-[#aaa]",
  "z-10 fill-fillPrimary"
);

const mergeClassSpan = clsx(
  "text-sm font-semibold text-primary translate-y-[2px] mb-[3px]"
);

export {
  mergeClassWrapperComponent,
  mergeClassButton,
  mergeClassSvg,
  mergeClassSpan,
};
