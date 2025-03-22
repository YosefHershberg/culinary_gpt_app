import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from '@/config/queryClient';

import { ThemeProvider } from "@/context/theme-context"
import { AuthProvider } from "@/context/auth-context"
import { CreateRecipeProvider } from "@/context/create-recipe-context"
import { CreateCocktailProvider } from '@/context/create-cocktail-context';
import { UserDataProvider } from "@/context/user-data-context"
import ClerkProvider from "@/context/clerk-context"
import { TooltipProvider } from "@/components/ui/tooltip";

// NOTE: the order of the wrappers are precise!
// Router has to wrap ClerkProvider
// AuthProvider has to wrap any Component that trigger a fetch req that requires authentication (axiosClient)
// Theme provider & AuthProvider has to wrap Suspense

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ClerkProvider>
          <AuthProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </AuthProvider>
        </ClerkProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export const FeaturesProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <UserDataProvider>
    <CreateRecipeProvider>
      <CreateCocktailProvider>
        {children}
      </CreateCocktailProvider>
    </CreateRecipeProvider>
  </UserDataProvider>
)