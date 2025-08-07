import { HandleResponseDTO } from "./handleResponse.dto";

export interface HandleResponseGateway {
  execute<T>(
    fn: () => Promise<{ data: T; status: number }>
  ): Promise<HandleResponseDTO<T>>;
}
