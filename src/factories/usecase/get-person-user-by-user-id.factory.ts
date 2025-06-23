import { GetPersonUserByUserIdUseCase } from "@/usecases/PersonUser/get-person-user-by-user-id.usecase";
import { handleRequestFactory } from "../infra/handle-request.factory";
import { getPersonUserByUserIdFactory } from "../service/get-person-user-by-user-id.factory";

export const getPersonUserByUserIdUseCaseFactory = () =>
  new GetPersonUserByUserIdUseCase(
    handleRequestFactory,
    getPersonUserByUserIdFactory()
  );
