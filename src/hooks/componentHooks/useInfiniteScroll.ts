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
    
        if (sentinelRef.current) {
          observer.observe(sentinelRef.current);
        }
    
        return () => {
          if (sentinelRef.current) {
            observer.unobserve(sentinelRef.current);
          }
        };
      }, [isLoading, nextPage]);


    return sentinelRef
}

export default useInfiniteScroll