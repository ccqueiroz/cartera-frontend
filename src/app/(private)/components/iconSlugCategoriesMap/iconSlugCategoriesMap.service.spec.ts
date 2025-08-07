import { adapterCategoryDescriptioToSlug } from "./iconSlugCategoriesMap.service";

describe("adapter Category Descriptio To Slug", () => {
  it("should transform a string with spaces into hyphens", () => {
    expect(adapterCategoryDescriptioToSlug("Desenvolvimento Web")).toBe(
      "desenvolvimento-web"
    );
  });

  it("should be remove accents", () => {
    expect(adapterCategoryDescriptioToSlug("Café com Leite")).toBe(
      "cafe-com-leite"
    );
    expect(adapterCategoryDescriptioToSlug("Edição de Vídeo")).toBe(
      "edicao-de-video"
    );
  });

  it("should be remove special characters", () => {
    expect(adapterCategoryDescriptioToSlug("Design Gráfico!")).toBe(
      "design-grafico"
    );
    expect(adapterCategoryDescriptioToSlug("Açougue & Mercearia")).toBe(
      "acougue-mercearia"
    );
  });

  it("should be transform multiple spaces into a single hyphen", () => {
    expect(adapterCategoryDescriptioToSlug("   Dev   Full Stack   ")).toBe(
      "dev-full-stack"
    );
  });

  it("should reduce multiple consecutive hyphens to just one", () => {
    expect(adapterCategoryDescriptioToSlug("Gestão---Financeira")).toBe(
      "gestao-financeira"
    );
  });

  it("should be handle empty string", () => {
    expect(adapterCategoryDescriptioToSlug("")).toBe("");
  });

  it("should be leave valid hyphens", () => {
    expect(adapterCategoryDescriptioToSlug("Back-end Developer")).toBe(
      "back-end-developer"
    );
  });
});
