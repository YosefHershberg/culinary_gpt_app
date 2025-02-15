import React from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export const LoadingState: React.FC = () => (
  <div className="h-full w-full flex flex-col">
    <DialogTitle className="text-center">Checking the image for ingredients...</DialogTitle>
    <DialogDescription className="text-center mt-3">
      Please wait while we process the image.
    </DialogDescription>
    <div className="flex-1 flex items-center justify-center">
      <LoadingSpinner className="size-20" />
    </div>
  </div>
);