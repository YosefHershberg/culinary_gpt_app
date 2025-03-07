import React, { useEffect, useRef } from 'react'
import { UserProfile } from '@clerk/clerk-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

type UserProfileModalProps = {
    isOpen: boolean;
    close: () => void
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, close }) => {
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
            <DialogTrigger></DialogTrigger>
            {/* NOTE: This is needed to prevent warning ^^^ */}

            <DialogContent
                ref={contentRef}
                className='w-fit'
            >
                <DialogTitle></DialogTitle>
                <div className="size-fit rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto max-h-[90dvh]">
                    <UserProfile />
                    <Button
                        size='icon'
                        variant='unstyled'
                        className='absolute top-2 right-2'
                        onClick={() => close()}
                    >
                        <X />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserProfileModal