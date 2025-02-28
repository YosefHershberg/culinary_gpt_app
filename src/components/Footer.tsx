import Logo from "./Logo"

const Footer: React.FC = () => {
    return (
        <footer className="h-52 lg:px-20 px-10 p-6 flex justify-between">
            <div className="flex flex-col justify-between">
                <div>
                    <Logo />
                    <p className="text-sm mt-3">Cook Smarter, Eat Better: Your AI Recipe Companion</p>
                </div>
                <div>© 2023 CulinaryGPT, All Rights Reserved</div>
            </div>
        </footer>
    )
}

export default Footer