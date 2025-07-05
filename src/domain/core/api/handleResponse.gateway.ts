import { HandleResponseDTO } from "./handleResponse.dto";

export interface HandleResponseGateway {
  execute<T>(fn: () => Promise<T>): Promise<HandleResponseDTO<T>>;
}
