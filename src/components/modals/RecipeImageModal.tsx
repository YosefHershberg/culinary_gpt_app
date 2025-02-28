import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"

const RecipeImageModal = ({ children }: { children: React.ReactNode }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="p-0">
                <DialogTitle className="hidden"></DialogTitle>
                {children}
                <DialogClose
                    className="absolute right-4 top-4 border p-2 rounded-lg opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="size-6" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default RecipeImageModal