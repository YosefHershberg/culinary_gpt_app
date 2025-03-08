import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

type CompressImageProps = {
  file: File;
  maxWidth: number;
  maxHeight: number;
  quality: number;
}

export const compressImage = ({file, maxWidth, maxHeight, quality}: CompressImageProps): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
    };

    reader.readAsDataURL(file);

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

      // Function to compress the image and check its size
      const compressAndCheckSize = (quality: number): Promise<string> => {
        return new Promise((resolve, reject) => {
          // Convert canvas to Base64 with the desired quality (jpeg format)
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

          // Calculate the size of the Base64 string in bytes
          const sizeInBytes = (compressedBase64.length * 3) / 4 - (compressedBase64.endsWith('==') ? 2 : compressedBase64.endsWith('=') ? 1 : 0);

          // Check if the size is within the limit
          if (sizeInBytes <= 50000) {
            resolve(compressedBase64);
          } else {
            // Reduce quality and try again
            const newQuality = quality * 0.9; // Reduce quality by 10%
            if (newQuality < 0.1) {
              reject('Unable to compress image below 50,000 bytes');
            } else {
              compressAndCheckSize(newQuality).then(resolve).catch(reject);
            }
          }
        });
      };

      // Start the compression process with the initial quality
      compressAndCheckSize(quality).then(resolve).catch(reject);
    };

    img.onerror = (err) => {
      reject('Image loading error: ' + err);
    };
  });
};
