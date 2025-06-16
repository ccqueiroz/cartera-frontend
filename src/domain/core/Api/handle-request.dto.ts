export type HandleRequestDTO<T> =
  | { success: boolean; data: T }
  | { success: boolean; error: string };
