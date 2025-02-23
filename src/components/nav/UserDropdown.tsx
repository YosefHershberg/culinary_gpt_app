import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import UserProfileModal from "../modals/UserProfileModal"
import { useAuth } from "@/context/auth-context"
import { LogOut, Settings } from "lucide-react"
import { SmallLogo } from "../Logo"

// const costumerPortalLink = 'https://billing.stripe.com/p/login/test_28o9DOfMm7NK9vWfYY'

const UserDropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { user, signOut } = useAuth()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="min-w-72 mx-4"
                >
                    <div className="flex gap-4 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <img
                            src={user.imageUrl}
                            alt={user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
                            className="rounded-full object-cover size-10"
                        />
                        <div className="flex flex-col justify-evenly">
                            <span className="font-bold">{user.fullName}</span>
                            <span>{user.emailAddresses[0].emailAddress}</span>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <div onClick={() => setIsModalOpen(true)}>
                        <DropdownMenuItem className="flex items-center gap-4">
                            <Settings className="size-5" />
                            Manage Account
                        </DropdownMenuItem>
                    </div>
                    <DropdownMenuItem
                        className="flex items-center gap-4"
                        onClick={() => signOut()}
                    >
                        <LogOut className='size-5' />
                        Sign out
                    </DropdownMenuItem>
                    {/* <a
                        href={
                            costumerPortalLink + '?prefilled_email=' + user.emailAddresses[0].emailAddress
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <DropdownMenuItem
                            className="flex items-center gap-4"
                        >
                            <WalletCards className='size-5' />
                            Subscriptions
                        </DropdownMenuItem>
                    </a> */}
                    <DropdownMenuSeparator />
                    <footer className="flex justify-center gap-4 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <SmallLogo />
                    </footer>
                </DropdownMenuContent>
            </DropdownMenu>

            {isModalOpen && <UserProfileModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
            />}
        </>
    )
}

export default UserDropdown