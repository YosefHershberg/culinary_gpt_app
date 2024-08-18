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
import { FacebookIcon, XIcon, FacebookShareButton, TwitterShareButton, WhatsappShareButton, WhatsappIcon } from 'react-share'
import { toast } from "../ui/use-toast"

const title = 'Check out this recipe I created with CulinaryGPT'

interface ShareRecipeModalProps {
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

                <div className="mt-5 flex justify-around">
                    <FacebookShareButton
                        url={url}
                        className="flex flex-col items-center gap-2"
                    >
                        <FacebookIcon size={32} round />
                        Facebook
                    </FacebookShareButton>

                    <TwitterShareButton
                        url={url}
                        title={title}
                        className="flex flex-col items-center gap-2"
                    >
                        <XIcon size={32} round />
                        X
                    </TwitterShareButton>

                    <WhatsappShareButton
                        url={url}
                        title={title}
                        separator=":: "
                        className="flex flex-col items-center gap-2"
                    >
                        <WhatsappIcon size={32} round />
                        WhatsApp
                    </WhatsappShareButton>

                    <Button
                        onClick={handleCopyToClipboard}
                        variant='unstyled'
                        size='icon'
                        className="size-15 flex flex-col items-center gap-2"
                    >
                        <Copy size='32' />
                        Copy link
                    </Button>
                </div>
                {/* </DialogDescription> */}
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