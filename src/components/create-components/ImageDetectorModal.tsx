import React, { memo, useMemo } from "react";
import { Camera } from "lucide-react";

import useAddImageIngredients, { IngredientResultsState } from "@/hooks/componentHooks/useAddImageIngredients";
import useImageDetector from "@/hooks/componentHooks/useImageDetector";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import { LoadingState } from "./image-detection/LoadingState";
import { UploadState } from "./image-detection/UploadState";
import { DetectedIngredientsList } from "./image-detection/DetectedIngredientsList";

const ImageDetectorModal: React.FC = () => {  
  const {
    isLoading,
    base64Image,
    setBase64Image,
    handleTriggerImageDetect,
    ingredientResults: data,
  } = useImageDetector();

  const {
    ingredientResults,
    handleAddIngredientsFromImage,
    handleChangeChecked,
    handleCheckAllIngredients,
    handleRemoveAllIngredients,
    clearIngredientsResults,
  } = useAddImageIngredients(data);

  const clearImageDetector = () => {
    setBase64Image("");
    clearIngredientsResults();
  };

  const renderContent = useMemo(() => {
    if (ingredientResults && ingredientResults.length > 0) {
      return (
        <DetectedIngredientsList
          ingredientResults={ingredientResults as IngredientResultsState[]}
          handleCheckAllIngredients={handleCheckAllIngredients}
          handleRemoveAllIngredients={handleRemoveAllIngredients}
          handleChangeChecked={handleChangeChecked}
          handleAddIngredientsFromImage={handleAddIngredientsFromImage}
          clearImageDetector={clearImageDetector}
        />
      );
    }
    if (isLoading) {
      return <LoadingState />;
    }
    return (
      <UploadState
        base64Image={base64Image}
        setBase64Image={setBase64Image}
        handleTriggerImageDetect={handleTriggerImageDetect}
        ingredientResults={ingredientResults as IngredientResultsState[]}
      />
    );
  }, [
    ingredientResults,
    isLoading,
    base64Image,
    setBase64Image,
    handleTriggerImageDetect,
    handleCheckAllIngredients,
    handleRemoveAllIngredients,
    handleChangeChecked,
    handleAddIngredientsFromImage,
    clearImageDetector,
  ]);

  return (
    <Dialog onOpenChange={(e) => !e && clearImageDetector()}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full aspect-square">
                <Camera className="size-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[30rem] min-h-[300px]">{renderContent}</DialogContent>
    </Dialog>
  );
};

export default memo(ImageDetectorModal)