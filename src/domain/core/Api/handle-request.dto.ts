export type HandleRequestDTO<T, Q = unknown> =
  | { success: boolean; data: T }
  | {
      success: boolean;
      data?: T;
      error: string;
      errorSchema: Q;
      triggerAt?: number;
    };

export function isErrorResponse<T, Q>(
  state: HandleRequestDTO<T, Q>
): state is {
  success: false;
  error: string;
  errorSchema: Q;
  triggerAt: number;
} {
  return state.success === false;
}
