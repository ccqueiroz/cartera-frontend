export interface MergeArraysByIdGateway {
  execute<T extends { id: string }>(
    currentArray: Array<T>,
    incomingArray: Array<T>
  ): Array<T>;
}
