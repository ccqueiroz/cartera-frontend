export type HandleResponseDTO<T> =
  | { success: true; data: T; status: number }
  | {
      success: false;
      error: string;
      status: number;
    };
