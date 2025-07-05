import { HttpError } from "@/domain/http/http.erro.entitie";
import { DomainMessageList } from "@/domain/core/constants/domainMessageList.constants";
import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { HandleResponseGateway } from "@/domain/core/api/handleResponse.gateway";

export class HandleResponseInfra implements HandleResponseGateway {
  async execute<T>(fn: () => Promise<T>): Promise<HandleResponseDTO<T>> {
    try {
      const data = await fn();

      return { success: true, data };
    } catch (error: unknown) {
      const message =
        error instanceof HttpError
          ? error.message
          : error instanceof Error
          ? error.message
          : DomainMessageList.UNKNOWN_ERROR;
      return {
        success: false,
        error: message,
      };
    }
  }
}
