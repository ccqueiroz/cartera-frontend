import { HandleRequestDTO } from "./handle-request.dto";

export interface HandleRequestGateway {
  execute<T>(fn: () => Promise<T>): Promise<HandleRequestDTO<T>>;
}
