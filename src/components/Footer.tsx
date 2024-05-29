// import linkedin from "@/assets/linkedin.png"
// import { Button } from "@/components/ui/button"
import Logo from "./Logo"

const Footer = () => {
    return (
        <div className="h-52 lg:px-20 px-10 p-6 flex justify-between">
            <div className="flex flex-col justify-between">
                <div>
                    <Logo />
                    <p className="text-sm mt-3">Cook Smarter, Eat Better: Your AI Recipe Companion</p>
                </div>
                <div>© 2023 CulinaryGPT, All Rights Reserved</div>
            </div>
            {/* <div className="h-full flex flex-col justify-between items-center">
                <div>
                    <a href="" className="">
                        <Button variant='link' className='flex items-center gap-2'>
                            <img src={linkedin} alt="" className="size-7" />
                            <span>LinkedIn</span>
                        </Button>
                    </a>
                </div>
            </div> */}
        </div>
    )
}

export default Footer