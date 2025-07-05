import dynamic from "next/dynamic";
import { getValueKeepSession, signIn } from "./login.service";
const LoginContainer = dynamic(() =>
  import("./login.container").then((mod) => mod.default)
);

export default async function Login() {
  const keepSession = await getValueKeepSession();

  return (
    <LoginContainer keepSessionCookieValue={keepSession} signIn={signIn} />
  );
}
