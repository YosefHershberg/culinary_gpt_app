import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from '@/config/queryClient';

import { ThemeProvider } from "@/context/theme-provider"
import { AuthProvider } from "@/context/auth-provider"
import { CreateRecipeProvider } from "@/context/create-recipe-provider"
import { UserDataProvider } from "@/context/user-data-provider"
import ClerkProvider from "@/context/clerk-provider"

import LoadingPage from "@/pages/LoadingPage"
import ErrorPage from "@/pages/ErrorPage"

// NOTE: the order of the wrappers are precise!
// Router has to wrap ClerkProvider
// AuthProvider has to wrap any Component that trigger a fetch req that requires authentication (axoisCLient)
// Theme provider & AuthProvider has to wrap Suspense

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <Router>
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
              <ClerkProvider>
                <AuthProvider>
                  <Suspense fallback={<LoadingPage />}>
                    <UserDataProvider>
                      <CreateRecipeProvider>
                        {children}
                      </CreateRecipeProvider>
                    </UserDataProvider>
                  </Suspense>
                </AuthProvider>
              </ClerkProvider>
            </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </Router>
  )
}

export default Providers