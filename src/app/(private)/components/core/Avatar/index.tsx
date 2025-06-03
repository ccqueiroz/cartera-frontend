import {
  AvatarFallback,
  AvatarImage,
  AvatarUi,
} from "@/components/ui/Avatar/avatar";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  mergeClassWrapperAvatar,
  mergeClassWrapperAvatarFallback,
} from "./avatar.style";

export interface AvatarCoreProps {
  src?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarCoreProps>(
  ({ ...props }, ref) => {
    return (
      <div className={mergeClassWrapperAvatar}>
        <AvatarUi ref={ref} {...props}>
          <AvatarImage src={props.src} />
          <AvatarFallback>
            <div className={mergeClassWrapperAvatarFallback}>
              <FontAwesomeIcon icon={faUser} className="w-[25px] h-[25px]" />
            </div>
          </AvatarFallback>
        </AvatarUi>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
