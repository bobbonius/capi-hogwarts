# Capi Hogwarts

A small Hogwarts character registry. It lists people from [Potter DB](https://api.potterdb.com), filters by house, paginates through the API, and opens a profile page for each character.

## How to run

Node.js 24+ and [pnpm](https://pnpm.io) 11 are required.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start the local app |
| `pnpm build` then `pnpm start` | Production build and serve |
| `pnpm test` | Run Vitest |
| `pnpm lint` | Run ESLint |
| `pnpm generate:potterdb-types` | Regenerate TypeScript types from the Potter DB OpenAPI spec |

No extra env files are needed. Character data is fetched from `https://api.potterdb.com/v1`.

## Project structure

Code lives under `src`. Routes are in `src/app`. Anything used by more than one route goes in `src/shared`.

```
src/
  app/                         # pages and route-local code
    page.tsx                   # character list
    error.tsx
    _lib/                      # list fetch
    _components/               # list UI (table, house filter)
    character/[id]/            # profile route
      page.tsx
      page.test.tsx
      not-found.tsx
      _lib/                    # single-character fetch
      _components/             # profile UI
  shared/
    components/ui/             # shadcn primitives used by the app
    types/                     # Potter DB types and search params
    lib/                       # small helpers (e.g. truncate)
  test/setup.ts                # Vitest + Testing Library setup
```

`@/` maps to `src/`.

### Colocation

A route owns the files that only it uses. Those files sit next to the page, in private folders so they are not turned into URLs:

- `_lib/` — server functions that load data for that route
- `_components/` — UI used only by that route
- `*.test.ts(x)` — tests next to the code they cover

The home route is an example: `getCharacters`, the table, and the house filter all live under `src/app/`, not in a global `components/` or `services/` tree.

`src/shared` is the exception. Put something there when two routes (or the design system) both need it: shadcn UI, Potter DB types, `truncate`.

### Data loading

Fetches live in `_lib` and are imported by Server Components. There is no client-side fetch for characters.

- `src/app/_lib/getCharacters.ts` — list endpoint, `page[size]=15`, optional `filter[house_eq]`
- `src/app/character/[id]/_lib/getCharacter.ts` — one character; `404` becomes `notFound()`, other failures throw into `error.tsx`

The house dropdown is a client component only because it writes the URL. The current house comes from the page `searchParams`. Choosing a house sets `?house=` (and resets the page). The list then re-renders on the server with that search param.

## Tools

- **Next.js 16 (App Router) + React 19** — routing, Server Components, `searchParams`
- **TypeScript** — app code and generated Potter DB types
- **pnpm** — package manager
- **Tailwind CSS 4 + shadcn/ui (Base UI)** — styling and primitives
- **Potter DB** — REST JSON:API; types come from `openapi-typescript` (`src/shared/types/potterdb.ts`, character aliases in `potterdb-api.ts`)
- **Vitest + Testing Library** — unit and page tests (`vitest.config.ts`, setup in `src/test/setup.ts`)
- **ESLint** — `eslint-config-next`
