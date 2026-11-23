# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Onelink is an experimental link-in-bio tool built with Nuxt 3, Vue 3 (`<script setup>`), and Tailwind CSS. It has no backend or database: a profile's data lives entirely in the URL as a base64-encoded JSON query parameter.

## Commands

The package manager is Yarn (a `yarn.lock` is committed). npm also works.

```bash
yarn install      # postinstall runs `nuxt prepare`, which generates .nuxt/ (tsconfig extends .nuxt/tsconfig.json)
yarn dev          # dev server on http://localhost:3000
yarn build        # production build
yarn generate     # static generation
yarn preview      # preview the production build
```

The project has no test suite, linter, or formatter configured.

## Architecture

**Data flow (URL as storage):**
1. `pages/index.vue` is the editor. It holds one reactive `data` object, binds the form components to it with `v-model:<field>`, and renders a live preview.
2. **Publish** calls `encodeData()` from `utils/transformer.js` (`JSON.stringify` followed by `js-base64` encode). It builds `${origin}/1?data=<base64>` and copies that URL to the clipboard.
3. `pages/1.vue` reads `route.query.data`, decodes it with `decodeData()`, and renders it with a template component. The route name `/1` is the template identifier: according to the README roadmap, new templates are meant to become new numbered pages (`/2`, …).

**Short-key data schema.** The JSON keys are deliberately one or two characters long to keep URLs short. The same keys appear in `pages/index.vue`, the `AppForm/*` components, and `Templates/Simple.vue`, so a new field has to be added in all three places:

| Key | Field | Key | Field |
|---|---|---|---|
| `n` | name | `gh` | GitHub |
| `d` | description | `tg` | Telegram |
| `i` | image URL | `l` | LinkedIn |
| `f` | Facebook | `e` | email (rendered as `mailto:`) |
| `t` | Twitter | `w` | WhatsApp number (rendered as `wa.me/`) |
| `ig` | Instagram | `y` | YouTube |
| `ls` | links array: `{ l: label, i: icon key, u: url }` | | |

`Templates/Simple.vue` also checks a key `m`, which the editor never sets.

**Components.** Nuxt auto-imports components with path-prefixed names, so `components/AppForm/Profile.vue` is used as `<app-form-profile>` and `components/Templates/Simple.vue` as `<templates-simple>`.
- `AppForm/*`: the editor form sections.
- `AppForm/Preview.vue`: wraps a template in a phone-sized frame.
- `Templates/*`: the public page renderers. Each one takes the decoded object as the `acc` prop.
- `Base/*`: shared UI pieces.

**Icons.** The `nuxt-icon` module renders Iconify names (e.g. `ph:globe-duotone`). Users type link icon keys freely; the keys come from https://icones.js.org/.

**Rendering & deploy.** `nuxt.config.ts` sets `ssr: false`, so the app is a client-only SPA. It is deployed to Vercel as a static site: `vercel.json` sets the build command to `yarn generate`, and Nitro writes the output to `.vercel/output/static`. Install runs `yarn install --ignore-engines` because Nuxt 3.1.1 declares support only up to Node 19, while Vercel builds with a much newer Node. Old Nitro also targets the `nodejs16.x` serverless runtime, which Vercel rejects. Upgrading Nuxt would remove the need for both workarounds.

**Modules** (`nuxt.config.ts`): `@nuxtjs/tailwindcss` (with `@tailwindcss/forms`), `nuxt-icon`, `@vueuse/nuxt`. `@headlessui/vue` is transpiled. `AppForm/Links.vue` uses `vuedraggable` to reorder links.
