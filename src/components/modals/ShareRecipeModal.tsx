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

const title = 'Check out this recipe I created with CulinaryGPT'

type ShareRecipeModalProps = {
    url: string,
    isOpen: boolean,
    close: () => void
}

const ShareRecipeModal: React.FC<ShareRecipeModalProps> = ({ url, isOpen, close }) => {

    const handleCopyToClipboard = async () => {
        await navigator.clipboard.writeText(url)
        toast({
            title: 'Link copied to clipboard',
            description: 'You can now share this link with your friends',
        })
        close()
    }

    return (
        <Dialog open={isOpen}>
            {/* NOTE: Need this to prevent warning */}
            <DialogTrigger></DialogTrigger>

            <DialogContent>
                <DialogTitle>How Would you like to share your recipe?</DialogTitle>

                {/* NOTE: Need this to prevent warning */}
                <DialogDescription></DialogDescription>

                <div className="flex justify-around">
                    <Button
                        variant='ghost'
                        className="h-fit"
                    >
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                className="size-10"
                                src={facebookLogo}
                                alt="facebook logo"
                            />
                            <span>Facebook</span>
                        </a>
                    </Button>

                    <Button
                        variant='ghost'
                        className="h-fit"
                    >
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                className="size-10"
                                src={xLogo}
                                alt="x logo"
                            />
                            <span>X</span>
                        </a>
                    </Button>

                    <Button
                        variant='ghost'
                        className="h-fit"
                    >
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(`${title} :: ${url}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                className="size-10"
                                src={whatsappLogo}
                                alt="whatsapp logo"
                            />
                            <span>WhatsApp</span>
                        </a>
                    </Button>

                    <Button
                        variant='ghost'
                        onClick={handleCopyToClipboard}
                        className="flex flex-col items-center gap-2 h-fit"
                    >
                        <Copy className="size-10" />
                        <span>Copy link</span>
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

export default ShareRecipeModal