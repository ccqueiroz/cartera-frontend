export const createObserverCallback = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isLoading: boolean,
  parentRef: React.RefObject<HTMLDivElement | null>,
  debounce: (callback: () => void) => void
) => {
  return (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (
      entry.isIntersecting &&
      hasNextPage &&
      !isLoading &&
      parentRef.current &&
      parentRef.current.scrollHeight > parentRef.current.clientHeight
    ) {
      debounce(() => {
        fetchNextPage();
      });
    }
  };
};
