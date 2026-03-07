# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build` (runs tsc then vite build)
- **Lint**: `npm run lint` (ESLint with zero warnings enforced)
- **Test**: `npm run test` (Vitest)
- **Test single file**: `npx vitest run src/path/to/file.test.ts`
- **Test with coverage**: `npm run test:coverage`
- **Test UI**: `npm run test:ui`
- **Package manager**: pnpm (enforced via preinstall hook)
- **Path alias**: `@` maps to `./src` (configured in vite.config.ts and tsconfig.json)

## Tech Stack

- React 19 + TypeScript 5.2 + Vite 5.4
- TanStack Router (file-based routing with automatic code-splitting)
- TanStack React Query v5 (server state)
- Tailwind CSS + shadcn/ui (Radix primitives)
- Clerk for authentication
- Axios for HTTP with interceptor-based auth
- React Hook Form + Zod for form validation
- Framer Motion for animations
- `@microsoft/fetch-event-source` for SSE streaming
- `html2pdf.js` for PDF export

## Architecture

### Routing
File-based routing in `src/routes/`. The `_auth/` directory contains protected routes that require authentication. Route files use TanStack Router conventions with loaders and preloading.

**Protected routes** (`_auth/`): create-recipe, create-cocktail, my-recipes, my-ingredients (food/drinks tabs), user-recipe/$recipeId, recipe.
**Public routes**: landing page (`/`), signin, signup.

Route protection uses `beforeLoad` hook in `_auth/route.tsx` — checks `context.auth.user` and redirects to signin/signup based on `localStorage.hasAuthed`.

Router config (`src/router.tsx`): preload on `intent`, scroll restoration enabled.

### State Management
- **Server state**: React Query with centralized query keys in `src/lib/queryKeys.ts`
- **Auth state**: Custom AuthProvider wrapping Clerk in `src/context/auth-context.tsx`
- **Feature contexts**: CreateRecipeProvider, CreateCocktailProvider, UserDataProvider in `src/context/`

### API Layer
Services in `src/services/` handle API calls. Axios client in `src/config/axiosClient.ts` automatically injects auth tokens and handles rate limiting (429 responses).

**Services**: `ingredient.service.ts` (CRUD + image detection + search), `recipe.service.ts` (CRUD + pagination), `kitchenUtils.service.ts` (toggle utils), `user.service.ts` (subscription status).

SSE streaming for recipe/image generation uses `@microsoft/fetch-event-source` via the `useSSE` hook → consumed by `useCreateItemStream` → exposed through context providers.

**Environment variables** validated with Zod in `src/utils/env.ts`: `VITE_API_URL`, `VITE_CLERK_PUBLISHABLE_KEY`, `NODE_ENV`.

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
Feature providers (inside auth-protected routes):
```
UserDataProvider → CreateRecipeProvider → CreateCocktailProvider
```

### Key Patterns

**Optimistic mutations** (`src/hooks/useOptimisticMutation.ts`): cancel pending queries → update cache → mutate → rollback on error → invalidate on settle. Used for ingredient add/delete, kitchen utils toggle, recipe delete.

**HTTP client hook** (`src/hooks/useHttpClient.ts`): wraps service functions with loading/error state and AbortSignal support. Service functions accept an optional `signal` parameter for cancellation.

**SSE streaming chain**: `useSSE` (raw stream) → `useCreateItemStream` (tracks `recipe` + `image` events with separate loading states) → context provider (form validation + submission).

**Infinite scroll**: `useInfiniteQuery` + `useInfiniteScroll` (Intersection Observer) with sentinel ref. Recipes load 4 per page.

**Form pattern**: React Hook Form + Zod schema + `<FormProvider>`. Recipe creation uses multi-step form (ingredients → kitchen utils → meal options).

### Types
- Centralized TypeScript types in `src/lib/types.ts`
- Zod schemas for runtime validation in context providers
- Enums for categories in `src/lib/enums.ts`

### Features
- **Recipe creation**: 3-step form, SSE streaming generation, min 4 food ingredients
- **Cocktail creation**: prompt-based, SSE streaming, min 4 drink ingredients
- **My Recipes**: infinite scroll, search (debounced 500ms), filter (All/Recipes/Cocktails), sort (newest/oldest/A-Z/Z-A)
- **My Ingredients**: food/drinks tabs, add via search/suggestions/image detection, bulk operations
- **Kitchen Utils**: toggle 9 utilities (stove, oven, microwave, air fryer, blender, food processor, slow cooker, BBQ, grill)
- **PDF export**: recipe to PDF via `html2pdf.js`
- **Dark/light theme**: persisted to `localStorage` key `culinary-gpt-theme`
