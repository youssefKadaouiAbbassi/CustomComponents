import { RefCallback, useCallback, useMemo, useState } from 'react';

export default function useVisibleOnScreen<Element extends HTMLElement>(): [
  boolean,
  RefCallback<Element>,
] {
  const [isVisible, setIsVisible] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting)),
    [setIsVisible],
  );

  const currentElement = useCallback(
    (ele: Element | null) => {
      if (ele) {
        observer.observe(ele);
      } else {
        observer.disconnect();
        setIsVisible(false);
      }
    },
    [observer, setIsVisible],
  );

  return [isVisible, currentElement];
}

