import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { X } from 'lucide-react'
import Logo from '../Logo'

const MoreInfoModal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
                    About CulinaryGPT
                </DialogDescription>
                <p>CulinaryGPT is your AI-powered kitchen assistant, offering personalized recipes based on your ingredients. With text or image input, step-by-step instructions, and tools to save and organize recipes, it makes cooking simple and enjoyable.</p>
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