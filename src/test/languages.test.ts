import { describe, expect, it } from "vitest";
import { getLanguage, languagePaths, localizedPath } from "@/lib/languages";

describe("localizedPath", () => {
  it("leaves English routes unprefixed", () => {
    expect(localizedPath("/", "en")).toBe("/");
    expect(localizedPath("/provider/aws", "en")).toBe("/provider/aws");
  });

  it("prefixes other languages", () => {
    expect(localizedPath("/", "de")).toBe("/de");
    expect(localizedPath("/provider/aws", "fr")).toBe("/fr/provider/aws");
  });
});

describe("getLanguage", () => {
  it("falls back to English for unknown codes", () => {
    expect(getLanguage("xx").code).toBe("en");
    expect(getLanguage(undefined).code).toBe("en");
  });

  it("exposes every non-English language as a URL prefix", () => {
    expect(languagePaths).toContain("de");
    expect(languagePaths).not.toContain("");
    expect(languagePaths).not.toContain("en");
  });
});
