import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { X } from 'lucide-react'
import Logo from '../Logo'

const MoreInfoModal: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className='flex flex-col items-center'>
                <DialogTitle>
                    <Logo />
                </DialogTitle>
                <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription>
                <p>CulinaryGPT is a recipe generation application that allows the user to generate recipes based on the user's ingredients and kitchen utensils. This application is build with scalability, re-usability & maintainability in mind by implementing a clean and layard architecture.</p>
                <DialogClose
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default MoreInfoModal