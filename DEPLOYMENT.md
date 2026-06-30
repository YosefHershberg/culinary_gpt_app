# Deployment — CulinaryGPT Client

The client (React + Vite SPA) is deployed to **Vercel**. The API server (a separate repo) is deployed to **Railway** — see that repo's `DEPLOYMENT.md`.

## Platform: Vercel

- **Trigger:** Vercel's Git integration deploys automatically — **production** on push to `main`, and a **preview deployment** for every other branch / pull request.
- **Build:** `npm run build` (`tsc -b && vite build`) → static output in `dist/`. Vercel serves it as a static site.
- **SPA routing:** [`vercel.json`](vercel.json) rewrites every path to `/` so TanStack Router handles client-side routing (deep links / refreshes don't 404).
- **Package manager:** npm (`package-lock.json`).

### Environment variables

Set these in the **Vercel project → Settings → Environment Variables** (validated at runtime by `src/utils/env.ts`). All `VITE_`-prefixed vars are **bundled into the browser build**, so only put public values here:

- `VITE_API_URL` — the deployed server origin (the Railway URL).
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` — Supabase **anon/publishable** key only (never the service-role key).

## CI/CD

There is **no GitHub Actions workflow** in this repo — **Vercel is the CI/CD**. On every push it installs deps, runs the build, and deploys (production for `main`, preview otherwise); a failing `vite build` fails the deployment.

> Note: Vercel does **not** run the unit tests (`npm test` / Vitest). Run them locally before pushing, or add a CI workflow if you want tests gated on PRs.

```
push to main         → Vercel: install → build → PRODUCTION deploy
push to other branch → Vercel: install → build → PREVIEW deploy
```

## When to use the Vercel connector

This environment has a **Vercel connector** (Vercel MCP tools + `vercel:*` skills) available. Use it — instead of guessing about the live site — whenever a task involves the actual deployment, for example:

- **Deployments & status:** list deployments, check whether the latest production/preview build succeeded, get a preview URL, promote or roll back.
- **Build logs:** fetch build logs to diagnose a failed deployment.
- **Runtime logs & errors:** inspect runtime logs / runtime errors for a deployed function or page.
- **Environment variables:** list / pull / add / diff env vars across Production / Preview / Development.
- **Project & domains:** inspect project settings, domains, and configuration.
- **Docs:** search Vercel's documentation for platform specifics.

Rule of thumb: if the question is about *the deployed site on Vercel* (not the source in this repo), use the Vercel connector rather than answering from memory.
