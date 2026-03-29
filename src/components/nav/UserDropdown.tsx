import { useState } from "react"
import { useAuth } from "@/context/auth-context"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import { SmallLogo } from "../Logo"
import ManageSettingsModal from "@/components/modals/ManageSettingsModal"

const UserDropdown: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, signOut } = useAuth()
    const [settingsOpen, setSettingsOpen] = useState(false)

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
                        {user?.hasImage ? (
                            <img
                                src={user.imageUrl!}
                                alt={user.firstName[0]?.toUpperCase() + user.lastName[0]?.toUpperCase()}
                                className="rounded-full object-cover size-10"
                            />
                        ) : (
                            <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center size-10 text-sm font-bold">
                                {(user?.firstName?.[0] ?? '').toUpperCase() + (user?.lastName?.[0] ?? '').toUpperCase()}
                            </div>
                        )}
                        <div className="flex flex-col justify-evenly">
                            <span className="font-bold">{user?.fullName}</span>
                            <span>{user?.email}</span>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex items-center gap-4"
                        onClick={() => setSettingsOpen(true)}
                    >
                        <Settings className='size-5' />
                        Manage Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="flex items-center gap-4"
                        onClick={() => signOut()}
                    >
                        <LogOut className='size-5' />
                        Sign out
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <footer className="flex justify-center gap-4 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                        <SmallLogo />
                    </footer>
                </DropdownMenuContent>
            </DropdownMenu>

            <ManageSettingsModal
                isOpen={settingsOpen}
                close={() => setSettingsOpen(false)}
            />
        </>
    )
}

export default UserDropdown
