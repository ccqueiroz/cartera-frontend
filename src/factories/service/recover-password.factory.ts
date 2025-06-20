import { httpInfraFactory } from "../infra/http.infra.factory";
import { RecoverPasswordService } from "@/service/Auth/recover-password.service";

export const recoverPasswordServiceFactory = () =>
  new RecoverPasswordService(httpInfraFactory().post);
