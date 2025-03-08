import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Navbar from '@/components/nav/Navbar'
import type { QueryClient } from '@tanstack/react-query'
import { AuthProviderState, useAuth } from '@/context/auth-context'
import { FeaturesProviders } from '@/Providers'
import { env } from 'process'

export const Route = createRootRouteWithContext<{
  auth: AuthProviderState
  queryClient: QueryClient
}>()({
  component: RootComponent,
})

function RootComponent() {
  const { isSignedIn } = useAuth()

  if (!isSignedIn) {
    return (
      <main className='flex flex-col min-h-[100dvh]'>
        <Navbar />
        <Outlet />
        {env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </main>
    )
  } else {
    return (
      <FeaturesProviders>
        <main className='flex flex-col min-h-[100dvh]'>
          <Navbar />
          <Outlet />
          {env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
        </main>
      </FeaturesProviders>
    )
  }

}
