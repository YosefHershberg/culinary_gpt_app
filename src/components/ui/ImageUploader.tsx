import React, { useCallback, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { compressImage } from '@/lib/utils';
import { toast } from './use-toast';

interface ImageUploaderProps {
  base64Image: string | null;
  setBase64Image: React.Dispatch<React.SetStateAction<string>>;
}

interface SingleImageUploaderState {
  selectedImage: File | null;
  isDragActive: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ base64Image, setBase64Image }) => {
  const [state, setState] = useState<SingleImageUploaderState>({
    selectedImage: null,
    isDragActive: false,
  });
  const [loading, setLoading] = useState(false);

  const handleDragEnter = () => {
    setState((prevState) => ({ ...prevState, isDragActive: true }));
  };

  const handleDragLeave = () => {
    setState((prevState) => ({ ...prevState, isDragActive: false }));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, isDragActive: false }));
    handleImageChange(e.dataTransfer.files[0]);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageChange(e.target.files[0]);
    }
  };

  const handleImageChange = useCallback(async (image: File | undefined) => {
    if (image && image.type.includes('image')) {
      setLoading(true);
      try {
        const compressedBase64 = await compressImage({
          file: image,
          quality: 0.6,
          maxWidth: 800,
          maxHeight: 800,
        });
        setBase64Image(compressedBase64);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to compress the image.',
        });
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Image',
        description: 'Please upload a valid image file.',
      })
      setState((prevState) => ({ ...prevState, selectedImage: null }));
      setLoading(false);
    }
  }, [setBase64Image]);

  return (
    <div
      className={`flex relative justify-center items-center size-60 border-dashed ${base64Image === '' && 'border-2'} rounded-lg ${state.isDragActive ? "bg-sky-50 border-sky-400" : "border-gray-300"}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute hidden h-full w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        onChange={handleUpload}
        id="singleImageInput"
      />
      <label htmlFor="singleImageInput" className="cursor-pointer w-full h-full flex justify-center items-center">
        {loading ? (
          <LoadingSpinner />
        ) : base64Image ? (
          <img
            src={base64Image}
            alt="Compressed Image"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <p className='mx-6'>Drag and drop an image here or click to upload</p>
        )}
      </label>
    </div>
  );
};

export default ImageUploader;
