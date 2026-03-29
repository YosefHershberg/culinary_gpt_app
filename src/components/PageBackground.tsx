import { useTheme } from '@/context/theme-context'

function LightBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden bg-white'>
      <div className='absolute w-[70%] h-[80%] bottom-[-10%] left-[-15%] rounded-full blur-3xl opacity-70'
        style={{ background: 'radial-gradient(ellipse, #f97316 0%, #fb923c 40%, transparent 70%)' }} />
      <div className='absolute w-[50%] h-[60%] top-[20%] left-[5%] rounded-full blur-3xl opacity-50'
        style={{ background: 'radial-gradient(ellipse, #fb923c 0%, #fbbf24 50%, transparent 70%)' }} />
      <div className='absolute w-[40%] h-[40%] top-[-5%] left-[40%] rounded-full blur-3xl opacity-30'
        style={{ background: 'radial-gradient(ellipse, #fcd34d 0%, transparent 70%)' }} />
    </div>
  )
}

function DarkBackground() {
  return (
    <div className='absolute inset-0 overflow-hidden bg-[#111111]'>
      <svg
        className='absolute inset-0 w-full h-full'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <polygon points='0,0 100,0 100,100 0,100' fill='#161616' />
        <polygon points='0,0 62,0 52,100 0,100' fill='#1c1c1c' />
        <polygon points='0,0 42,0 32,100 0,100' fill='#1a1a1a' />
        <polygon points='0,0 22,0 13,100 0,100' fill='#202020' />
        <polygon points='0,0 8,0 2,100 0,100' fill='#242424' />
      </svg>
    </div>
  )
}

export function PageBackground() {
  const { theme } = useTheme()
  return theme === 'light' ? <LightBackground /> : <DarkBackground />
}
