import { MergeArraysByIdGateway } from "@/domain/core/helpers/mergeArraysById.gateway";

export class MergeArraysByIdHelper implements MergeArraysByIdGateway {
  execute<T extends { id: string }>(
    currentArray: Array<T>,
    incomingArray: Array<T>
  ): Array<T> {
    const map = new Map(currentArray.map((item) => [item.id, item]));
    for (const item of incomingArray) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    }
    return Array.from(map.values());
  }
}
