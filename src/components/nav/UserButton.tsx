import { useAuth } from "@/context/auth-context"
import { Button } from "../ui/button";
import UserDropdown from "./UserDropdown";

const UserButton: React.FC = () => {
    const { user } = useAuth()

    return (
        <>
            <UserDropdown>
                <Button
                    size='icon'
                    variant='outline'
                    className='dark:border-zinc-400 rounded-full'
                >
                    {user.hasImage ?
                        <img
                            src={user.imageUrl}
                            alt={user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
                            className="rounded-full object-cover"
                        /> : (
                            <span className="text-xl">
                                {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
                            </span>
                        )
                    }
                </Button>
            </UserDropdown>  
        </>
    )
}

export default UserButton