import { HandleResponseDTO } from "@/domain/core/api/handleResponse.dto";
import { ResponseListDTO } from "@/domain/core/api/responseList.dto";
import { InfiniteData } from "@tanstack/react-query";

export const flatMapResponseListDTO = <T>(
  data: InfiniteData<HandleResponseDTO<ResponseListDTO<T>>, unknown> | undefined
) => {
  let totalElements = 0;
  let totalPages = 0;

  const dataFormated = data?.pages?.flatMap((page) => {
    if (!page.success) return [];

    if (page.data.totalPages !== totalPages) totalPages = page.data.totalPages;
    if (page.data.totalElements !== totalElements)
      totalElements = page.data.totalElements;

    return page.data.content;
  });

  return {
    content: (dataFormated || []) as Array<T>,
    totalElements,
    totalPages,
  };
};
