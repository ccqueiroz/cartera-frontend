import { cn } from "@/lib/cn.utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/core/Tooltip/tooltip.component";
interface TextEllipsisProps {
  text?: string;
  maxLength?: number;
  classNameText?: string;
}

export const TextEllipsis = ({
  text,
  maxLength = 25,
  classNameText,
}: TextEllipsisProps) => {
  const shouldTrucketeText = text && text.length > maxLength;

  const textTrucked = shouldTrucketeText
    ? `${text.slice(0, maxLength).replace(/\s$/, "")}...`
    : text;

  return shouldTrucketeText ? (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-default">
          <p className={cn("font-medium text-white", classNameText)}>
            {textTrucked}
          </p>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <p className={cn("font-medium text-white", classNameText)}>{text}</p>
  );
};
