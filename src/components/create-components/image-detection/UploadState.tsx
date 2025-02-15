import React from "react";
import { DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/ImageUploader";
import { IngredientResultsState } from "@/hooks/componentHooks/useAddImageIngredients";

interface UploadStateProps {
  base64Image: string;
  setBase64Image: React.Dispatch<React.SetStateAction<string>>;
  handleTriggerImageDetect: () => void;
  ingredientResults?: IngredientResultsState[];
}

export const UploadState: React.FC<UploadStateProps> = ({
  base64Image,
  setBase64Image,
  handleTriggerImageDetect,
  ingredientResults,
}) => (
  <>
    <DialogHeader>
      <DialogTitle className="text-center">Detect Ingredients in image</DialogTitle>
      <DialogDescription className="text-center text-balance mt-3">
        Upload an image to add ingredients that are detected in the image.
      </DialogDescription>
    </DialogHeader>
    <div className="w-full flex flex-col items-center">
      <ImageUploader base64Image={base64Image} setBase64Image={setBase64Image} />
      {ingredientResults?.length === 0 && base64Image === '' && (
        <span className="text-red-500">No ingredients found :/</span>
      )}
    </div>
    <DialogFooter>
      <Button onClick={handleTriggerImageDetect} disabled={!base64Image} type="submit">
        Check for ingredients
      </Button>
    </DialogFooter>
  </>
);