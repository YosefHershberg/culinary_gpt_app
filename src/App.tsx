import { Outlet } from 'react-router-dom'
import Navbar from './components/nav/Navbar'
import Router from './routes'
import { Toaster } from './components/ui/toaster'

const App: React.FC = () => {

  return (
    <>
      <Router />
      <Toaster />
    </>
  )
}

export default App

export const AppLayout: React.FC = () => {

  return (
    <main className='overflow-y-auto overflow-x-hidden h-screen w-screen flex flex-col'>
      <Navbar />
      <Outlet />
    </main>
  )
}