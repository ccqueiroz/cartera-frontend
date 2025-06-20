import { getValueKeepSessionUseCaseFactory } from "@/factories/usecase/get-value-keep-session.factory";
import LoginView from "./login.view";
import { Suspense } from "react";

export default async function Login() {
  const keepSession = (function getValueKeepSession() {
    const keepSession = getValueKeepSessionUseCaseFactory().execute();

    return keepSession;
  })();

  return (
    <Suspense>
      <LoginView keepSessionCookieValue={keepSession} />
    </Suspense>
  );
}
