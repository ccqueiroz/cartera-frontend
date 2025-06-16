import { HandleRequestDTO } from "@/domain/core/Api/handle-request.dto";
import { HandleRequestGateway } from "@/domain/core/Api/handle-request.gateway";
import { DomainMessageList } from "@/domain/core/Constants/domain-message-list.constants";
import { HttpError } from "@/domain/Http/http.erro.entitie";

export class HandleRequestInfra implements HandleRequestGateway {
  async execute<T>(fn: () => Promise<T>): Promise<HandleRequestDTO<T>> {
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
