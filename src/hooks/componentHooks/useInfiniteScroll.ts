import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
    isLoading: boolean,
    nextPage: () => void
}

type UseInfiniteScrollResponse = React.MutableRefObject<HTMLDivElement | null>

const useInfiniteScroll = ({ isLoading, nextPage }: UseInfiniteScrollProps): UseInfiniteScrollResponse => {
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting && !isLoading) {
              nextPage();
            }
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 1,
          }
        );
    
        // Copy the ref value so the cleanup unobserves the same node it observed
        const sentinel = sentinelRef.current;
        if (sentinel) {
          observer.observe(sentinel);
        }

        return () => {
          if (sentinel) {
            observer.unobserve(sentinel);
          }
        };
      }, [isLoading, nextPage]);


    return sentinelRef
}

export default useInfiniteScroll