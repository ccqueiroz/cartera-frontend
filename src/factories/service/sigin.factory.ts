import { SignInService } from "@/service/Auth/signin.service";
import { httpInfraFactory } from "../infra/http.infra.factory";

export const signInServiceFactory = () =>
  new SignInService(httpInfraFactory().post);
