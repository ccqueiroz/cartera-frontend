import dynamic from "next/dynamic";
import { recoverPassword } from "./recoverPassword.service";

const RecoverPasswordContainer = dynamic(() =>
  import("./recoverPassword.container").then((mod) => mod.default)
);

export default async function RecoverPassword() {
  return <RecoverPasswordContainer recoverPassword={recoverPassword} />;
}
