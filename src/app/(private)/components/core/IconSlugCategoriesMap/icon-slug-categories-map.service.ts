export const adapterCategoryDescriptioToSlug = (description: string) =>
  description
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/\s+/g, "-") // espaços para hífens
    .replace(/[^\w-]+/g, "") // remove não alfanuméricos
    .replace(/--+/g, "-");
