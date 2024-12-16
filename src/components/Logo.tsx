import logo from '@/assets/logos/logo.png'

const Logo: React.FC = () => {
    return (
        <div className='flex items-center gap-2'>
            <img src={logo} className='size-10' alt="" />
            <h1 className='text-2xl font-black tracking-tighter'>
                Culinary
                <span className='text-orange -tracking-[0.1rem]'>GPT</span>
            </h1>
        </div>
    )
}

export default Logo

export const LargeLogo: React.FC = () => {
    return (
        <div className='flex items-center gap-2'>
            <img src={logo} className='size-20' alt="" />
            <h1 className='text-4xl font-black tracking-tighter'>
                Culinary
                <span className='text-orange -tracking-[0.1rem]'>GPT</span>
            </h1>
        </div>
    )
}