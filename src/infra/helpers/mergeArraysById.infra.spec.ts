import { MergeArraysByIdHelper } from "./mergeArraysById.infra";

describe("MergeArraysByIdHelper", () => {
  const helper = new MergeArraysByIdHelper();

  it("should merge two arrays without duplicated ids", () => {
    const currentArray = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];

    const incomingArray = [
      { id: "2", name: "Item 2 Updated" },
      { id: "3", name: "Item 3" },
    ];

    const result = helper.execute(currentArray, incomingArray);

    expect(result).toEqual([
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
      { id: "3", name: "Item 3" },
    ]);
  });

  it("should return currentArray if incomingArray is empty", () => {
    const currentArray = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];

    const result = helper.execute(currentArray, []);

    expect(result).toEqual(currentArray);
  });

  it("should return incomingArray if currentArray is empty", () => {
    const incomingArray = [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ];

    const result = helper.execute([], incomingArray);

    expect(result).toEqual(incomingArray);
  });

  it("should return empty array if both arrays are empty", () => {
    const result = helper.execute([], []);

    expect(result).toEqual([]);
  });

  it("should not modify the original arrays", () => {
    const currentArray = [{ id: "1", name: "Item 1" }];
    const incomingArray = [{ id: "2", name: "Item 2" }];

    const result = helper.execute(currentArray, incomingArray);

    expect(result).toEqual([
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
    ]);
    expect(currentArray).toEqual([{ id: "1", name: "Item 1" }]);
    expect(incomingArray).toEqual([{ id: "2", name: "Item 2" }]);
  });
});
