import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const compressImage = (image: File, maxWidth: number, maxHeight: number, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
    };

    reader.readAsDataURL(image);

    img.onload = () => {
      // Create a canvas to draw the image on
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject('Canvas context is not available');
        return;
      }

      // Calculate the aspect ratio and resize the image while maintaining aspect ratio
      const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
      const width = img.width * ratio;
      const height = img.height * ratio;

      // Set canvas size to the new dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert canvas to Base64 with the desired quality (jpeg format)
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality); // Compress to JPEG format with quality
      resolve(compressedBase64);
    };

    img.onerror = (err) => {
      reject('Image loading error: ' + err);
    };
  });
};
