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
import { useUserData } from "@/context/user-data-context"

interface ClearIngredientsModalProps {
    isOpen: boolean,
    close: () => void
}

const ClearIngredientsModal: React.FC<ClearIngredientsModalProps> = ({ isOpen, close }) => {
    const { deleteAllUserIngredients } = useUserData()

    const handleClick = () => {
        deleteAllUserIngredients()
        close()
    }

    return (
        <Dialog open={isOpen}>

            {/* NOTE: Need this to prevent clerk warning in console */}
            <DialogTrigger></DialogTrigger>

            <DialogContent>
                <DialogTitle className="text-center leading-snug">
                    Are you sure you want to remove all you ingredients?
                </DialogTitle>

                {/* NOTE: Need this to prevent clerk warning in console */}
                <DialogDescription></DialogDescription>

                <div className="mt-5 flex justify-around">
                    <Button onClick={handleClick}>
                        Yes, remove all
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

export default ClearIngredientsModal