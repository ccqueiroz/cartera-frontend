import { httpInfraFactory } from "../infra/http.infra.factory";
import { RegisterService } from "@/service/Auth/register.service";

export const registerServiceFactory = () =>
  new RegisterService(httpInfraFactory().post);
