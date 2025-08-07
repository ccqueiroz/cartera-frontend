import { HttpError } from "@/domain/http/http.erro.entitie";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";

export class HandleResponseInfra implements HandleResponseGateway {
  async execute<T>(
    fn: () => Promise<{ data: T; status: number }>
  ): Promise<HandleResponseDTO<T>> {
    try {
      const data = await fn();

      return { success: true, data: data?.data, status: data.status };
    } catch (error: unknown) {
      let message = "";
      let status = 500;

      if (error instanceof HttpError) {
        message = error.message;
        status = error.status;
      } else if (error instanceof Error) {
        message =
          error.message === "fetch failed"
            ? DomainMessageList.UNKNOWN_ERROR
            : error.message;
        status = 500;
      } else {
        message = DomainMessageList.UNKNOWN_ERROR;
        status = 500;
      }

      return {
        success: false,
        error: message,
        status,
      };
    }
  }
}
