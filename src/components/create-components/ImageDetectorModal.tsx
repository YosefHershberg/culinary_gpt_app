import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import useImageDetector from "@/hooks/componentHooks/useImageDetecor"

import { Camera } from "lucide-react"
import ImageUploader from "../ui/ImageUploader"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import LoadingSpinner from "../ui/LoadingSpinner"
import { Ingredient } from "@/lib/types"

const ImageDetectorModal = () => {
  const { isLoading, base64Image, setBase64Image, ingredientResults, handleTriggerImageDetect, handleAddIngredientsFromImage, clearImageDetector } = useImageDetector()

  return (
    <Dialog onOpenChange={(e) => !e && clearImageDetector}>
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
        {ingredientResults?.length > 0 ?
          <div className="flex flex-col items-center">
            <DialogTitle className="text-center">Ingredients detected</DialogTitle>
            <DialogDescription className="text-center mt-3">
              The following ingredients were detected in the image.
            </DialogDescription>
            <div className="w-full flex flex-col items-center h-full">
              <ul className="mt-3">
                {ingredientResults.map((ingredient: Ingredient, index: number) => (
                  <li key={index} className="text-center">{ingredient.name}</li>
                ))}
              </ul>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={() => {
                  handleAddIngredientsFromImage()
                  clearImageDetector()
                }}>Add Ingredients</Button>
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
