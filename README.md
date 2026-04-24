# FMG Demo

Read-only public demo of **FMG Console** — a custom FortiManager dashboard with role-based presets (Network / Security), a global command palette, policy hit heatmap, SD-WAN SLA matrix, drift detection, CVE watchlist, and install-preview diff viewer.

Lives at **fmg.tannerharrison.com**.

The full project lives in a separate private repo. This demo deployment ships only the UI and a static mock-data backend — no live FortiManager connection, no auth, no user data. Every endpoint returns fixture data. Every mutation is rejected at the middleware layer.

## Stack

- **Backend:** Node.js + Express (CommonJS), pino logs, single static mock-data service
- **Frontend:** Vite + React 18, Tailwind, TanStack Query, Zustand, cmdk, lucide-react, Recharts
- **Deploy:** Railway, single service, Express serves the React build same-origin

## Project layout

```
fmg-demo/
├── backend/
│   └── src/
│       ├── server.js
│       ├── config.js
│       ├── logger.js
│       ├── routes.js               all demo endpoints
│       ├── middleware/
│       │   ├── readOnly.js         blocks any non-GET at /api/*
│       │   └── errorHandler.js
│       └── services/
│           └── mockData.js         47 devices, 7 packages, the full fixture set
└── frontend/
    └── src/
        ├── App.jsx
        ├── components/
        │   ├── layout/             AppShell, NavTree, TopBar, CommandPalette
        │   ├── common/             Tile, KpiCard, Badge, Button, etc.
        │   └── tiles/              all dashboard tiles
        ├── hooks/
        ├── lib/                    api client, query client
        ├── pages/                  Dashboard, Devices, Tasks, Policy*, Drift, CveWatch
        └── stores/
```

## Local development

```powershell
npm run install:all
# terminal 1
npm run dev:backend    # :8300
# terminal 2
npm run dev:frontend   # :5173
```

Frontend proxies `/api` to `http://localhost:8300`.

## Environment variables

**backend/.env** (optional in local dev, required on Railway)

```
NODE_ENV=production
DEMO_READONLY=true
```

`DEMO_READONLY=true` (the default) makes the backend reject every non-GET request with a 403. Turn it off only if you specifically want mutations to hit the stubbed route handlers.

Frontend requires no env vars.

## Deploy to Railway

1. Railway → New Project → Deploy from GitHub → `tannerharris0n/fmg-demo`
2. Variables: `NODE_ENV=production`
3. Settings → Domains → add `fmg.tannerharrison.com`
4. Cloudflare DNS: add a CNAME record pointing `fmg` at the Railway target, DNS-only until cert is issued, then Proxied is optional

Railway auto-detects `railway.json`, runs `npm run build`, then `npm start`.

## Keeping it in sync with the main project

When the main FMG Console project picks up new dashboard features worth showing off, copy the relevant tile or page files over and adapt any API calls to hit the mock endpoints. The mock data lives in one place — `backend/src/services/mockData.js` — so that's the only file that usually needs edits when fixtures need to grow.
