import clsx from "clsx";

const mergeClassSectionMain = clsx(
  "relative left-0 sm:left-[5rem]",
  "w-full sm:w-[calc(100%-5rem)] h-auto min-h-[calc(100svh-2rem)] sm:min-h-[calc(100svh-9rem)]",
  "flex",
  "pb-4 px-4",
  "[&>div>div:first-child]:min-h-[calc(100svh-2rem)] sm:[&>div>div:first-child]:min-h-[calc(100svh-9rem)]",
  "top-4 sm:top-[unset]"
);

export { mergeClassSectionMain };
