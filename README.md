# Creekside Lodge

## Local development

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`. Use `npm run build` for a production build and `npm run typecheck` for a TypeScript check.

## Foundation

Next.js App Router, TypeScript, and Tailwind CSS, with a Radix-based shadcn/ui configuration ready for future components.

## Development

Requires Node.js 20.9 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run typecheck
npm run build
```

## Theme foundation

The visual direction takes inspiration from [Annandale's Homestead page](https://www.annandale.com/accommodations/the-homestead). This is an initial scaffold, not a replica.

- Warm ivory, olive, and stone colors.
- Cormorant Garamond headings and Manrope body text, served locally through Fontsource.
- Generous spacing, fine borders, and small corner radii.
- Semantic light and dark color tokens shared by Tailwind and future shadcn components. The default is light; the `.dark` class enables the alternate palette.

Edit `src/app/globals.css` for the theme and `src/app/page.tsx` for the homepage shell. No reusable UI components have been generated.

The shadcn configuration uses the Radix-based `new-york` style. Add components individually when needed:

```sh
npx shadcn@latest add button
```

Review each new component's typography and spacing against the theme as it is added.
