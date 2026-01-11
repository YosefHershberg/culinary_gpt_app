import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button";
import UserDropdown from "./UserDropdown";

const UserButton: React.FC = () => {
    const { user } = useAuth()

    // NOTE: This is to fix a bug when there is a translation extension in browser.
    const initials = (user.firstName?.[0] ?? '').toUpperCase() + (user.lastName?.[0] ?? '').toUpperCase()

    return (
        <div translate="no">
            <UserDropdown>
                <Button
                    size='icon'
                    variant='outline'
                    className='dark:border-zinc-400 rounded-full'
                >
                    {user.hasImage ?
                        <img
                            src={user.imageUrl}
                            alt={initials}
                            className="rounded-full object-cover"
                        /> : (
                            <span className="text-xl">
                                {initials}
                            </span>
                        )
                    }
                </Button>
            </UserDropdown>
        </div>
    )
}

export default UserButton