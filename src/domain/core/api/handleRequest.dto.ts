export type HandleRequestDTO<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: string;
    };
