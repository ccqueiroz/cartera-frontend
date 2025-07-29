import { useEffect, useState } from "react";

export const useDynamicOverscan = (
  parentRef: React.RefObject<HTMLDivElement | null>,
  estimatedSize: number
) => {
  const [overscan, setOverscan] = useState(10);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const height = entries[0]?.contentRect.height || 0;
      if (height > 0) {
        const visibleCount = Math.ceil(height / estimatedSize);
        setOverscan(visibleCount * 2);
      }
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [estimatedSize, parentRef]);

  return overscan;
};
