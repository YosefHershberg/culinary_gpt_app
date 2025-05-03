import { useEffect, useRef, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useUserData } from "@/context/user-data-context"

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { INGREDIENTS_QUERY_KEY } from "@/lib/queryKeys"
import { Button } from "@/components/ui/button"

import type { Ingredient } from "@/lib/types"

const AddCommonIngredientModal = () => {
    const queryClient = useQueryClient()
    const { addCommonIngredients } = useUserData()
    const contentRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const userIngredients = queryClient.getQueryData<Ingredient[]>(INGREDIENTS_QUERY_KEY) || []
        if (userIngredients.length < 5) {
            setIsOpen(true)
        }
        return () => {
            setIsOpen(false)
        }
    }, [queryClient])


    useEffect(() => {
        const controller = new AbortController()

        const handleClickOutside = (event: MouseEvent) => {
            if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside, { signal: controller.signal })
        return () => controller.abort()
    }, [])

    return (
        <Dialog open={isOpen}>
            <DialogTrigger className="hidden"></DialogTrigger>

            <DialogContent ref={contentRef}>
                <DialogTitle className="text-center leading-snug">
                    Would you like to add some common ingredients?
                </DialogTitle>

                <div className="mt-5 flex justify-around">
                    <Button
                        variant="default"
                        onClick={() => {
                            addCommonIngredients()
                            setIsOpen(false)
                        }}
                    >
                        Yes please!
                    </Button>
                    <Button variant='destructive' onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </div>
                <DialogClose
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default AddCommonIngredientModal