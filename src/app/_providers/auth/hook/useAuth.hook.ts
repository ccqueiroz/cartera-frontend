import { flagsCookies } from "@/domain/core/storage/flagsCookies.constants";
import { ROUTES } from "@/infra/constants/routes.constants";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const hasCookieInvalidCredential = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const cookies = document.cookie.split("; ");
      const cookieInvalidCredential = cookies.find((row) =>
        row.startsWith(`${flagsCookies.INVALID_CREDENTIAL}=`)
      );

      if (cookieInvalidCredential) {
        const valueCookie = decodeURIComponent(
          cookieInvalidCredential.split("=")[1]
        );

        if (!hasCookieInvalidCredential.current) {
          hasCookieInvalidCredential.current = true;
          toast.error(valueCookie);

          setTimeout(() => {
            document.cookie = `${flagsCookies.INVALID_CREDENTIAL}=${valueCookie}; Max-Age=0; path=/`;
            router.push(ROUTES.PUBLIC.login);
          }, 500);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [router]);
};
