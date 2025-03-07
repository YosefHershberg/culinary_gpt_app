import { createRouter } from '@tanstack/react-router'
import LoadingPage from '@/pages/LoadingPage'
import { routeTree } from '@/routeTree.gen'
import queryClient from '@/config/queryClient'
import ErrorPage from '@/pages/ErrorPage'

export const router = createRouter({
  routeTree,
  defaultPendingComponent: LoadingPage,
  defaultErrorComponent: ({ error }) => <ErrorPage error={error} />,
  defaultNotFoundComponent: () => <ErrorPage status={404} message='Page not found' />,
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
