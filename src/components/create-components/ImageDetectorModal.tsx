import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Camera } from "lucide-react"
import ImageUploader from "../ui/ImageUploader"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import useHttpClient from "@/hooks/useHttpClient"
import LoadingSpinner from "../ui/LoadingSpinner"
import { toast } from "../ui/use-toast"

const ImageDetectorModal = () => {
  const [base64Image, setBase64Image] = useState<string>('')

  const { data: results, isLoading, error, triggerHttpReq } = useHttpClient({
    endpoint: '/ingredients/image-detect',
    method: 'POST',
    body: { imageUrl: base64Image }
  });

  useEffect(() => {
      error && console.log('error')
      // toast({
      //   variant: 'destructive',
      //   title: 'Oops! Something went wrong!',
      //   //@ts-expect-error
      //   description: error.response?.data?.message || 'An error occurred while processing your image.'
      // });
  }, [error]);

  useEffect(() => {
    if (results) {
      console.log(results)
      setBase64Image('');
    }
  }, [results])

  const handleClick = async () => {
    triggerHttpReq();
  }


  return (
    <Dialog onOpenChange={(e) => !e && setBase64Image('')}>
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
      <DialogContent className="sm:max-w-[425px]">
        {isLoading ?
          <div>
            <LoadingSpinner />
          </div> :
          <>

            <DialogHeader>
              <DialogTitle className="text-center">Detect Ingredients in image</DialogTitle>
              <DialogDescription>
                Upload an image to add ingredients that are detected in the image.
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex justify-center">
              <ImageUploader
                base64Image={base64Image}
                setBase64Image={setBase64Image}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleClick}
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
