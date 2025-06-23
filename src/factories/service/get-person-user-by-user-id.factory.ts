import { GetPersonUserByUserIdService } from "@/service/PersonUser/get-person-user-by-user-id.service";
import { httpInfraFactory } from "../infra/http.infra.factory";

export const getPersonUserByUserIdFactory = () =>
  new GetPersonUserByUserIdService(httpInfraFactory().get);
