import { createRouter, ErrorComponent } from '@tanstack/react-router'
import LoadingPage from './pages/LoadingPage'
import { routeTree } from './routeTree.gen'
import queryClient from './config/queryClient'

export const router = createRouter({
    routeTree,
    defaultPendingComponent: LoadingPage,
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    context: {
      auth: undefined!, // We'll inject this when we render
      queryClient,
    },
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    scrollRestoration: true,
  })
  
  declare module '@tanstack/react-router' {
    interface Register {
      router: typeof router
    }
  }
  