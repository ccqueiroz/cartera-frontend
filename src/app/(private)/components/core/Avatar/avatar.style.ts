import clsx from "clsx";

const mergeClassWrapperAvatar = clsx(
  "w-[60px] h-[60px]",
  "bg-transparent bg-gradient-to-bl from-[#FFFFFF3B] to-[#FFFFFF0F] backdrop-blur-sm",
  "flex justify-center items-center",
  "border-[2.5px] border-secondary/60 rounded-full",
  "cursor-pointer",
  "shadow-[0.5px_0.5px_4px] shadow-contrastTheme/80",
  "hover:bg-accent/80 transition-colors ease-in-out duration-300"
);

const mergeClassWrapperAvatarFallback = clsx(
  "w-[52px] h-[52px] ",
  "text-contrastTheme",
  "flex justify-center items-center "
);

export { mergeClassWrapperAvatar, mergeClassWrapperAvatarFallback };
