import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Trash2 } from "lucide-react"
import { deleteUserAccountAPI } from "@/services/user.service"
import { useAuth } from "@/context/auth-context"
import { toast } from "@/components/ui/use-toast"

type ManageSettingsModalProps = {
    isOpen: boolean
    close: () => void
}

const ManageSettingsModal: React.FC<ManageSettingsModalProps> = ({ isOpen, close }) => {
    const { signOut } = useAuth()
    const [confirming, setConfirming] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleClose = () => {
        setConfirming(false)
        close()
    }

    const handleDeleteAccount = async () => {
        setIsDeleting(true)
        try {
            await deleteUserAccountAPI()
            await signOut()
        } catch {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Failed to delete account. Please try again.',
            })
            setIsDeleting(false)
            setConfirming(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>

            {/* NOTE: Empty trigger required to avoid console warnings */}
            <DialogTrigger />

            <DialogContent>
                <DialogTitle>Account Settings</DialogTitle>

                {/* NOTE: Empty description required to avoid console warnings */}
                <DialogDescription />

                <div className="space-y-6 mt-2">
                    <div>
                        <h3 className="text-sm font-semibold text-destructive mb-2">Danger Zone</h3>
                        <div className="rounded-md border border-destructive/30 p-4 space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Permanently delete your account and all associated data, including recipes, ingredients, and images. This action cannot be undone.
                            </p>
                            {confirming ? (
                                <div className="space-y-3">
                                    <p className="text-sm font-medium">Are you sure? This cannot be undone.</p>
                                    <div className="flex gap-3">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={handleDeleteAccount}
                                            disabled={isDeleting}
                                        >
                                            {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setConfirming(false)}
                                            disabled={isDeleting}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setConfirming(true)}
                                >
                                    <Trash2 className="size-4 mr-2" />
                                    Delete Account
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <DialogClose
                    onClick={handleClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default ManageSettingsModal
