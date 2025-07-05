import dynamic from "next/dynamic";
import { register } from "./register.service";

const RegisterContainer = dynamic(() =>
  import("./register.container").then((mod) => mod.default)
);

export default async function Register() {
  return <RegisterContainer registerServer={register} />;
}
