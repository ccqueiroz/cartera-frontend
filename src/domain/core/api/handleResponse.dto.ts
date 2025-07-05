export type HandleResponseDTO<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
    };
