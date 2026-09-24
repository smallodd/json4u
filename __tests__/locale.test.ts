import { selectLocale } from "@/i18n/locale";
import { describe, expect, it } from "vitest";

describe("selectLocale", () => {
  it("uses the configured fallback when no supported preference is sent", () => {
    expect(selectLocale(null, "en")).toBe("en");
    expect(selectLocale("fr-FR,es;q=0.8", "zh")).toBe("zh");
  });

  it("recognizes regional language tags", () => {
    expect(selectLocale("zh-CN,zh;q=0.9,en;q=0.8", "en")).toBe("zh");
    expect(selectLocale("en-US,en;q=0.9,zh;q=0.8", "zh")).toBe("en");
  });

  it("uses quality before header order and skips unsupported languages", () => {
    expect(selectLocale("en;q=0.4,zh-TW;q=0.9", "en")).toBe("zh");
    expect(selectLocale("fr,zh;q=0.8,en;q=0.5", "en")).toBe("zh");
  });

  it("does not select explicitly rejected or invalid preferences", () => {
    expect(selectLocale("zh;q=0,en;q=0.5", "zh")).toBe("en");
    expect(selectLocale("zh;q=oops,en;q=0.5", "zh")).toBe("en");
  });
});
