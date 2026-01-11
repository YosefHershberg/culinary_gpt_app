# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (runs tsc then vite build)
- **Lint**: `npm run lint` (ESLint with zero warnings enforced)
- **Test**: `npm run test` (Vitest)
- **Test with coverage**: `npm run test:coverage`
- **Test UI**: `npm run test:ui`
- **Package manager**: pnpm (enforced via preinstall hook)

## Tech Stack

- React 19 + TypeScript 5.2 + Vite 5.4
- TanStack Router (file-based routing with automatic code-splitting)
- TanStack React Query v5 (server state)
- Tailwind CSS + shadcn/ui (Radix primitives)
- Clerk for authentication
- Axios for HTTP with interceptor-based auth
- React Hook Form + Zod for form validation

## Architecture

### Routing
File-based routing in `src/routes/`. The `_auth/` directory contains protected routes that require authentication. Route files use TanStack Router conventions with loaders and preloading.

### State Management
- **Server state**: React Query with centralized query keys in `src/lib/queryKeys.ts`
- **Auth state**: Custom AuthProvider wrapping Clerk in `src/context/auth-context.tsx`
- **Feature contexts**: CreateRecipeProvider, CreateCocktailProvider, UserDataProvider in `src/context/`

### API Layer
Services in `src/services/` handle API calls. Axios client in `src/config/axiosClient.ts` automatically injects auth tokens and handles rate limiting.

SSE streaming for recipe/image generation uses `@microsoft/fetch-event-source` via the `useSSE` hook.

### Component Organization
- `src/components/ui/` - Reusable shadcn/Radix primitives
- `src/components/` - Feature components (create-recipe, my-recipes, modals, nav)
- `src/pages/` - Route-level page components
- `src/hooks/componentHooks/` - Feature-specific hooks
- `src/hooks/` - Cross-cutting utility hooks (useSSE, useDebounce, useOptimisticMutation)

### Context Provider Hierarchy
Critical ordering in `src/Providers.tsx`:
```
QueryClientProvider → ThemeProvider → ClerkProvider → AuthProvider → TooltipProvider
```

### Types
- Centralized TypeScript types in `src/lib/types.ts`
- Zod schemas for runtime validation in context providers
- Enums for categories in `src/lib/enums.ts`
