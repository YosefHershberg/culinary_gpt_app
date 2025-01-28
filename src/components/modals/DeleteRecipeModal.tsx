import { useEffect, useRef } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Button } from "../ui/button"

type DeleteRecipeModalProps = {
    isOpen: boolean,
    close: () => void,
    handleClick: () => void
}

const DeleteRecipeModal: React.FC<DeleteRecipeModalProps> = ({ isOpen, close, handleClick }) => {
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                close()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [close])


    return (
        <Dialog open={isOpen}>

            {/* NOTE: Need this to prevent clerk warning in console */}
            <DialogTrigger></DialogTrigger>

            <DialogContent ref={contentRef}>
                <DialogTitle className="text-center leading-snug">
                    Are you sure you want to delete this recipe?
                </DialogTitle>

                {/* NOTE: Need this to prevent clerk warning in console */}
                <DialogDescription></DialogDescription>

                <div className="mt-5 flex justify-around">
                    <Button onClick={handleClick}>
                        Yes, delete it.
                    </Button>
                    <Button variant='destructive' onClick={close}>
                        Cancel
                    </Button>
                </div>
                <DialogClose
                    onClick={close}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteRecipeModal