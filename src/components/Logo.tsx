import logo from '@/assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center gap-2'>
            <img src={logo} className='size-10' alt="" />
            <h1 className='text-2xl font-black'>
                Culinary
                <span className='text-orange'>GPT</span>
            </h1>
        </div>
    )
}

export default Logo