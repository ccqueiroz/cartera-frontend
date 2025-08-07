import {
  FormatDates,
  FormatDateValues,
} from "@/domain/core/helpers/convertTimestampInDate.dto";
import { ConvertTimestampInDateHelper } from "./convertTimestampInDate.infra";

describe("Convert Timestamp In Date Helper", () => {
  const helper = new ConvertTimestampInDateHelper();

  const timestamp = new Date("2024-06-09T12:34:56Z").getTime();

  it("should format date as DD/MM/AAAA", () => {
    const result = helper.execute(timestamp, FormatDates["DD/MM/AAAA"]);
    expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
  });

  it("should format date as MM/AAAA", () => {
    const result = helper.execute(timestamp, FormatDates["MM/AAAA"]);
    expect(result).toMatch(/^\d{2}\/\d{4}$/);
  });

  it("should format date as DD/MM", () => {
    const result = helper.execute(timestamp, FormatDates["DD/MM"]);
    expect(result).toMatch(/^\d{2}\/\d{2}$/);
  });

  it("should format date as WEAK-DAY (weekday name)", () => {
    const result = helper.execute(timestamp, FormatDates["WEAK-DAY"]);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("should format date as DAY (day number)", () => {
    const result = helper.execute(timestamp, FormatDates["DAY"]);
    expect(Number(result)).toBe(new Date(timestamp).getDate());
  });

  it("should format date as MONTH (month name)", () => {
    const result = helper.execute(timestamp, FormatDates["MONTH"]);
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("should format date as YEAR (4-digit year)", () => {
    const result = helper.execute(timestamp, FormatDates["YEAR"]);
    expect(result).toBe(new Date(timestamp).getFullYear().toString());
  });

  it("should return empty string for unsupported format", () => {
    const invalidFormat = "INVALID_FORMAT" as unknown as FormatDateValues;
    const result = helper.execute(timestamp, invalidFormat);
    expect(result).toBe("");
  });
});
