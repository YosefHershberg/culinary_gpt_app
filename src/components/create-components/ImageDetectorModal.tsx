import { Camera } from "lucide-react"

import useAddImageIngredients, { ingredientResultsState } from "@/hooks/componentHooks/useAddImageIngredients"
import useImageDetector from "@/hooks/componentHooks/useImageDetector"

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import ImageUploader from "../ui/ImageUploader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import LoadingSpinner from "../ui/LoadingSpinner"

const ImageDetectorModal = () => {
  const { isLoading, base64Image, setBase64Image, handleTriggerImageDetect, ingredientResults: data } = useImageDetector()
  const { ingredientResults, handleAddIngredientsFromImage, handleChangeChecked, handleCheckAllIngredients, handleRemoveAllIngredients, clearIngredientsResults } = useAddImageIngredients(data)

  const clearImageDetector = () => {
    setBase64Image('')
    clearIngredientsResults()
  }

  return (
    <Dialog onOpenChange={(e) => !e && clearImageDetector()}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size='icon' className="rounded-full aspect-square">
                <Camera className="size-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="sm:max-w-[30rem] min-h-[300px]">
        {ingredientResults && ingredientResults?.length > 0 ?
          <div className="flex flex-col items-center mx-3">
            <DialogTitle className="text-center">Ingredients detected</DialogTitle>
            <DialogDescription className="text-center mt-3">
              The following ingredients were detected in the image.
            </DialogDescription>
            <div className="flex items-start w-full my-3 ml-5">
              <label htmlFor="all" className="flex items-center gap-3">
                <Checkbox
                  id="all"
                  onCheckedChange={(e) => e ? handleCheckAllIngredients() : handleRemoveAllIngredients()}
                  checked={ingredientResults.every((ingredient: ingredientResultsState) => ingredient.checked)}
                />
                <h1 className="font-bold">Select all</h1>
              </label>
            </div>
            <div className="w-full flex flex-col items-center h-full">
              <ul className="mt-3 max-h-56 overflow-auto mb-3 w-full">
                {ingredientResults?.map((ingredient: ingredientResultsState, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center h-10 px-3 gap-2"
                    >
                      <Checkbox
                        onCheckedChange={() => handleChangeChecked(index)}
                        checked={ingredientResults[index].checked}
                        id="terms" />
                      <span>
                        {ingredient.ingredient.name}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  disabled={ingredientResults.every((ingredient: ingredientResultsState) => !ingredient.checked)}
                  onClick={() => {
                    handleAddIngredientsFromImage()
                    clearImageDetector()
                  }}>
                  Add Ingredients
                </Button>
              </DialogClose>
            </DialogFooter>
          </div> :

          isLoading ?
            <div className="h-full w-full flex flex-col">
              <DialogTitle className="text-center">Checking the image for ingredients...</DialogTitle>
              <DialogDescription className="text-center mt-3">
                Please wait while we process the image.
              </DialogDescription>
              <div className="flex-1 flex items-center justify-center">
                <LoadingSpinner className="size-20" />
              </div>
            </div> :

            <>
              <DialogHeader>
                <DialogTitle className="text-center">Detect Ingredients in image</DialogTitle>
                <DialogDescription className="text-center text-balance mt-3">
                  Upload an image to add ingredients that are detected in the image.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full flex flex-col items-center">
                <ImageUploader
                  base64Image={base64Image}
                  setBase64Image={setBase64Image}
                />
                {ingredientResults?.length === 0 && base64Image === '' &&
                  <span className="text-red-500">No ingredients found :/</span>
                }
              </div>
              <DialogFooter>
                <Button
                  onClick={handleTriggerImageDetect}
                  disabled={base64Image === ''}
                  type="submit"
                >
                  Check for ingredients
                </Button>
              </DialogFooter>
            </>
        }
      </DialogContent>
    </Dialog>
  )
}

export default ImageDetectorModal
