import React, { useState, useEffect, useRef } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, placeholder, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : placeholder || ""}
      alt={alt}
      {...props}
      onLoad={() => setIsLoaded(true)}
      className={`transition-all duration-300 ease-in-out object-cover ${
        isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
      } ${props.className || ""}`}
    />
  );
};

export default LazyImage;
