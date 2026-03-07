---
name: tanstack-router
description: Use this skill whenever working on a codebase that uses TanStack Router (@tanstack/react-router, @tanstack/router-plugin, @tanstack/start). Trigger when you see imports from @tanstack/react-router or @tanstack/router, route files using createFileRoute or createRootRoute, a routeTree.gen.ts file, a tsr.config.json, or a src/routes/ directory with TanStack naming conventions ($params, _pathless, __root). Also use when the user asks about adding routes, navigation, search params, data loading, authenticated routes, code splitting, or route guards in a TanStack Router project. Even if the user doesn't mention TanStack Router by name, use this skill if the codebase clearly uses it.
---

# TanStack Router Skill

TanStack Router is a fully type-safe React router with first-class support for file-based routing, search params as state, built-in data loading with caching, and automatic code splitting. This skill provides the conventions, patterns, and API knowledge you need to work correctly in a TanStack Router codebase.

---

## 1. Detecting TanStack Router in a Project

Before making changes, confirm the project uses TanStack Router by checking for:

- `@tanstack/react-router` in `package.json`
- `@tanstack/router-plugin` (bundler plugin) in `package.json`
- A `src/routes/` directory with `__root.tsx` file
- A generated `routeTree.gen.ts` file
- A `tsr.config.json` file (if using the CLI instead of bundler plugin)

If the project uses TanStack Start (`@tanstack/start`), it builds on top of TanStack Router — all conventions here still apply.

---

## 2. File-Based Routing (Preferred Approach)

TanStack Router's recommended setup uses **file-based routing** where the filesystem defines the route tree. A bundler plugin or CLI watches your `src/routes/` directory and auto-generates `routeTree.gen.ts`.

### 2.1 File Naming Conventions

These are **critical** — getting them wrong breaks route generation.

| Convention | File Example | URL Result | Purpose |
|---|---|---|---|
| Root route | `__root.tsx` | — | Top-level layout, wraps everything |
| Index route | `index.tsx` | `/` (of parent) | Renders when parent path matches exactly |
| Static route | `about.tsx` | `/about` | Basic path segment |
| Layout route | `posts/route.tsx` or `posts.tsx` (with children) | `/posts` | Wraps child routes with component/logic |
| Dynamic param | `$postId.tsx` | `/posts/:postId` | Captures URL segment into `params` |
| Splat/catch-all | `$.tsx` | Matches everything | Captures rest of URL into `_splat` |
| Pathless layout | `_auth.tsx` or `_auth/` | — (no URL segment) | Wraps children with logic/component without adding to URL |
| Pathless group | `(admin)/` | — | Organizational only, no effect on routes or components |
| Ignored files | `-components/`, `-utils.ts` | — | Excluded from route generation (co-located helpers) |
| Flat nesting | `posts.$postId.tsx` | `/posts/:postId` | Dot (`.`) denotes nesting without directories |

**Key rules:**
- `__root.tsx` MUST exist and MUST use `createRootRoute()` (or `createRootRouteWithContext()`)
- Every other route file MUST export `const Route = createFileRoute('/path')({...})`
- The path string in `createFileRoute` is **auto-managed** by the plugin/CLI — don't manually change it
- `route.tsx` inside a directory is the layout for that directory's children (equivalent to naming the file the same as the directory)
- Files/folders prefixed with `-` are ignored by the route generator (use for co-located components, utils, etc.)
- Pathless layout routes prefixed with `_` don't add a URL segment but DO wrap children

### 2.2 Directory vs Flat Routing

You can mix both styles. Use directories for broad hierarchies and flat (dot-separated) files for deep-but-narrow nesting.

```
src/routes/
├── __root.tsx
├── index.tsx                    # /
├── about.tsx                    # /about
├── posts.tsx                    # /posts layout
├── posts/
│   ├── index.tsx               # /posts (index)
│   └── $postId.tsx             # /posts/:postId
├── settings.profile.tsx         # /settings/profile (flat)
├── settings.notifications.tsx   # /settings/notifications (flat)
├── _auth.tsx                    # pathless layout (auth guard)
├── _auth/
│   ├── dashboard.tsx           # /dashboard (protected)
│   └── admin.tsx               # /admin (protected)
└── -components/                 # ignored by router
    └── Sidebar.tsx
```

### 2.3 Generated Route Tree

The file `src/routeTree.gen.ts` is auto-generated. **NEVER manually edit it.** It is regenerated on every file change when the dev server or `tsr watch` is running. Add it to `.gitignore` if desired, but it's typically committed. Add it to eslint/prettier ignore.

---

## 3. Route Configuration API

### 3.1 Root Route

```tsx
// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
  // Optional: errorComponent, pendingComponent, notFoundComponent, beforeLoad
})

function RootComponent() {
  return (
    <div>
      <nav>{/* navigation */}</nav>
      <Outlet /> {/* Renders matched child route */}
    </div>
  )
}
```

To pass context (e.g., auth state) to all routes, use `createRootRouteWithContext`:

```tsx
import { createRootRouteWithContext } from '@tanstack/react-router'

interface RouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})
```

### 3.2 Standard Route File

```tsx
// src/routes/posts.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  component: PostsComponent,
  loader: async () => fetchPosts(),
  pendingComponent: () => <Spinner />,
  errorComponent: ({ error }) => <Error />,
  beforeLoad: ({ context }) => { ... },
  validateSearch: (search) => ({ ... }),
})

function PostsComponent() {
  const posts = Route.useLoaderData()
  return <div>{/* render posts */}</div>
}
```

### 3.3 Route Options Reference

Key options you can pass to `createFileRoute('/path')({...})`:

- **`component`** — The React component to render
- **`loader`** — Async function for data fetching, receives `{ params, search, context, abortController, cause, deps }`
- **`beforeLoad`** — Runs before loader and child routes. Use for auth guards, redirects, context augmentation
- **`validateSearch`** — Validates/transforms URL search params. Use with Zod or any Standard Schema-compliant validator
- **`pendingComponent`** — Shown after `pendingMs` (default 1000ms) while loader resolves
- **`pendingMs`** / **`pendingMinMs`** — Control pending component timing
- **`errorComponent`** — Shown when loader or component throws
- **`notFoundComponent`** — Shown for not-found states within this route
- **`staleTime`** — Milliseconds data stays fresh (default 0)
- **`preloadStaleTime`** — Stale time for preloaded data (default 30000)
- **`gcTime`** — How long unused data stays cached
- **`shouldReload`** — Control when data refetches
- **`loaderDeps`** — Extract dependencies from search params to key the cache
- **`head`** — Return `{ meta, links, scripts }` for document head management

---

## 4. Navigation

### 4.1 Link Component

```tsx
import { Link } from '@tanstack/react-router'

// Basic
<Link to="/about">About</Link>

// With params
<Link to="/posts/$postId" params={{ postId: '123' }}>Post 123</Link>

// With search params
<Link to="/posts" search={{ page: 2, sort: 'date' }}>Page 2</Link>

// Updating search params (functional)
<Link to="." search={(prev) => ({ ...prev, page: prev.page + 1 })}>
  Next Page
</Link>

// Relative navigation
<Link to="..">Go to parent</Link>
<Link to=".">Reload current</Link>

// With preloading
<Link to="/posts" preload="intent">Posts</Link>

// Active link styling
<Link
  to="/posts"
  activeProps={{ className: 'font-bold' }}
  inactiveProps={{ className: 'text-gray-500' }}
>
  Posts
</Link>
```

The `from` prop helps type-safety for relative navigation:
```tsx
<Link from="/posts" to="./$postId" params={{ postId: '123' }}>Post</Link>
```

### 4.2 Programmatic Navigation

```tsx
import { useNavigate } from '@tanstack/react-router'

function MyComponent() {
  const navigate = useNavigate()

  navigate({
    to: '/posts/$postId',
    params: { postId: '123' },
    search: { tab: 'comments' },
    replace: true,
  })

  // From a specific route (better type safety)
  const navigate = useNavigate({ from: '/posts' })
  navigate({ to: './$postId', params: { postId: '123' } })
}
```

The router instance also supports imperative navigation:
```tsx
router.navigate({ to: '/posts', search: { page: 1 } })
```

### 4.3 Redirects

```tsx
import { redirect } from '@tanstack/react-router'

// In beforeLoad or loader
throw redirect({ to: '/login', search: { redirect: location.href } })

// With replace
throw redirect({ to: '/new-page', replace: true })
```

---

## 5. Search Params (URL State Management)

TanStack Router treats search params as **type-safe application state**. This is one of its most powerful features.

### 5.1 Validation with Zod (Recommended)

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { zodValidator, fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

const searchSchema = z.object({
  page: fallback(z.number(), 1).default(1),
  filter: fallback(z.string(), '').default(''),
  sort: fallback(z.enum(['date', 'title']), 'date').default('date'),
})

export const Route = createFileRoute('/products')({
  validateSearch: zodValidator(searchSchema),
  component: ProductsPage,
})

function ProductsPage() {
  const { page, filter, sort } = Route.useSearch()
}
```

### 5.2 Manual Validation

```tsx
export const Route = createFileRoute('/products')({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page ?? 1),
    filter: (search.filter as string) || '',
  }),
})
```

### 5.3 Reading Search Params

```tsx
// From Route object (within the route's own component)
const search = Route.useSearch()

// From any component (specify which route's params)
import { useSearch } from '@tanstack/react-router'
const search = useSearch({ from: '/products' })

// Select specific param (optimized re-renders)
const page = Route.useSearch({ select: (s) => s.page })
```

### 5.4 Updating Search Params

```tsx
// Via Link
<Link to="." search={(prev) => ({ ...prev, page: prev.page + 1 })}>
  Next
</Link>

// Via navigate
const navigate = useNavigate({ from: Route.fullPath })
navigate({ search: (prev) => ({ ...prev, page: 2 }) })
```

### 5.5 Retaining/Stripping Search Params

Use `retainSearchParams` and `stripSearchParams` search middleware:

```tsx
import { retainSearchParams, stripSearchParams } from '@tanstack/react-router'

export const Route = createFileRoute('/products')({
  validateSearch: zodValidator(searchSchema),
  search: {
    middlewares: [
      retainSearchParams(['theme']),
      stripSearchParams({ page: 1 }),
    ],
  },
})
```

---

## 6. Path Params

Dynamic segments are denoted by `$` in filenames.

```tsx
// src/routes/posts/$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  loader: async ({ params }) => fetchPost(params.postId),
})

function PostComponent() {
  const { postId } = Route.useParams()
  const post = Route.useLoaderData()
  return <div>{post.title}</div>
}
```

For catch-all/splat routes (`$.tsx`), access via `params._splat`.

---

## 7. Data Loading

### 7.1 Basic Loader

```tsx
export const Route = createFileRoute('/posts')({
  loader: async () => {
    const posts = await fetchPosts()
    return posts
  },
  component: PostsComponent,
})

function PostsComponent() {
  const posts = Route.useLoaderData()
}
```

### 7.2 Loader with Dependencies (Search Param Keying)

```tsx
export const Route = createFileRoute('/posts')({
  validateSearch: zodValidator(searchSchema),
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ deps }) => fetchPosts(deps.page),
})
```

### 7.3 Loader Context

```tsx
loader: async ({ params, context, abortController }) => {
  const data = await fetch(`/api/posts/${params.postId}`, {
    signal: abortController.signal,
  })
  return data.json()
}
```

### 7.4 Stale-While-Revalidate

```tsx
export const Route = createFileRoute('/posts')({
  staleTime: 10_000,
  gcTime: 300_000,
  loader: async () => fetchPosts(),
})
```

### 7.5 Using with TanStack Query

```tsx
export const Route = createFileRoute('/posts/$postId')({
  loader: ({ context: { queryClient }, params }) =>
    queryClient.ensureQueryData(postQueryOptions(params.postId)),
  component: PostComponent,
})

function PostComponent() {
  const params = Route.useParams()
  const { data: post } = useSuspenseQuery(postQueryOptions(params.postId))
}
```

### 7.6 Deferred Data Loading

```tsx
import { defer, Await } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
  loader: async () => {
    const fastData = await fetchFast()
    const slowData = fetchSlow()
    return { fastData, slowData: defer(slowData) }
  },
})
```

---

## 8. Authenticated Routes & Guards

### 8.1 Pattern: Pathless Layout Route Guard

```tsx
// src/routes/_authenticated.tsx
import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  component: () => <Outlet />,
})
```

### 8.2 Router Context for Auth

```tsx
const router = createRouter({
  routeTree,
  context: { auth: undefined! },
})

function App() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}
```

### 8.3 beforeLoad Execution Order

`beforeLoad` runs **top-down** through the route tree. Parent `beforeLoad` runs before children. If a parent throws (redirect/error), children don't execute.

---

## 9. Router Setup

### 9.1 Creating the Router

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({
  routeTree,
  context: { auth: undefined! },
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  defaultStructuralSharing: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

### 9.2 Bundler Plugin Setup (Vite)

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      autoCodeSplitting: true,
    }),
    react(),
  ],
})
```

---

## 10. Hooks Reference

| Hook | Purpose |
|---|---|
| `useLoaderData` | Access data returned by the route's `loader` |
| `useSearch` | Access validated search params |
| `useParams` | Access path params |
| `useNavigate` | Get a `navigate` function |
| `useLocation` | Get current location object |
| `useMatch` | Access the current route match |
| `useMatches` | Get all active route matches |
| `useRouteContext` | Access the route's context |
| `useBlocker` | Block navigation (unsaved changes) |
| `useMatchRoute` | Check if a route matches |
| `useLoaderDeps` | Access the resolved loader dependencies |

**Using `getRouteApi` for deep components:**

```tsx
import { getRouteApi } from '@tanstack/react-router'

const routeApi = getRouteApi('/posts/$postId')

function DeepComponent() {
  const params = routeApi.useParams()
  const search = routeApi.useSearch()
}
```

---

## 11. Code Splitting

### 11.1 Automatic (Recommended)

Enable `autoCodeSplitting: true` in the bundler plugin.

### 11.2 Manual with Lazy Routes

```tsx
// src/routes/posts.tsx (critical)
export const Route = createFileRoute('/posts')({
  loader: async () => fetchPosts(),
})

// src/routes/posts.lazy.tsx (lazy)
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts')({
  component: PostsComponent,
})
```

---

## 12. Not-Found Handling

```tsx
import { notFound } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId)
    if (!post) throw notFound()
    return post
  },
  notFoundComponent: () => <div>Post not found</div>,
})
```

---

## 13. Common Patterns & Gotchas

### DO:
- **Always export as `Route`**
- **Use `<Outlet />`** in layout routes
- **Use `from` in hooks** for type safety
- **Use `getRouteApi`** in deeply nested components
- **Use `loaderDeps`** when loader depends on search params
- **Use `-` prefix** for co-located files
- **Use `isRedirect(error)`** when catching errors in `beforeLoad`

### DON'T:
- **Don't manually edit `routeTree.gen.ts`**
- **Don't manually change the path string** in `createFileRoute`
- **Don't forget `<Outlet />`**
- **Don't use `useEffect` for data loading** — use `loader`
- **Don't import `Route` across files** — use `getRouteApi`
- **Don't put route files inside `-prefixed` directories**

---

## 14. Package Reference

| Package | Purpose |
|---|---|
| `@tanstack/react-router` | Core router for React |
| `@tanstack/router-plugin` | Bundler plugin (Vite, Webpack, Rspack) |
| `@tanstack/router-cli` | CLI for route generation |
| `@tanstack/router-devtools` | DevTools component |
| `@tanstack/zod-adapter` | Zod adapter for `validateSearch` |
| `@tanstack/start` | Full-stack framework built on TanStack Router |
