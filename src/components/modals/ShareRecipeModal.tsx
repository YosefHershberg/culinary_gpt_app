import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Copy, X } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

import facebookLogo from '@/assets/logos/facebook-logo.png'
import whatsappLogo from '@/assets/logos/whatsapp-logo.png'
import xLogo from '@/assets/logos/x-logo.png'
import { Link } from "react-router-dom"

const title = 'Check out this recipe I created with CulinaryGPT'


const ShareRecipeModal: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(window.location.href)
        toast({
            title: 'Link copied to clipboard',
            description: 'You can now share this link with your friends',
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>How Would you like to share your recipe?</DialogTitle>

                <DialogDescription>
                    Share this recipe with friends on social platforms
                </DialogDescription>

                <div className="flex justify-around flex-wrap">
                    <DialogClose asChild>
                        <Button
                            variant='ghost'
                            className="h-fit"
                        >
                            <Link
                                to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2"
                            >
                                <img
                                    className="size-10 object-contain"
                                    src={facebookLogo}
                                    alt="facebook logo"
                                />
                                <span>Facebook</span>
                            </Link>
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button
                            variant='ghost'
                            className="h-fit"
                        >
                            <Link
                                to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2"
                            >
                                <img
                                    className="size-10 object-contain"
                                    src={xLogo}
                                    alt="x logo"
                                />
                                <span>X</span>
                            </Link>
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button
                            variant='ghost'
                            className="h-fit"
                        >
                            <Link
                                to={`https://wa.me/?text=${encodeURIComponent(`${title} :: ${window.location.href}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2"
                            >
                                <img
                                    className="size-10 object-contain"
                                    src={whatsappLogo}
                                    alt="whatsapp logo"
                                />
                                <span>WhatsApp</span>
                            </Link>
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button
                            variant='ghost'
                            onClick={handleCopyToClipboard}
                            className="flex flex-col items-center gap-2 h-fit"
                        >
                            <Copy className="size-10 object-contain" />
                            <span>Copy link</span>
                        </Button>
                    </DialogClose>
                </div>

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

export default ShareRecipeModal