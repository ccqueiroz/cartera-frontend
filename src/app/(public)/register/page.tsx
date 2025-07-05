import dynamic from "next/dynamic";
import { register } from "./register.service";

const RegisterContainer = dynamic(() =>
  import("./register.container").then((mod) => mod.default)
);

export default async function Login() {
  return <RegisterContainer registerServer={register} />;
}
