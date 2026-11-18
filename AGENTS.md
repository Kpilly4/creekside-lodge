# Project guidance

## Current scope

This is a Next.js App Router application using TypeScript, Tailwind CSS, and Radix-based shadcn/ui. The initial work is a scaffold and an elegant visual theme. The homepage is intentionally a small inline shell. Build sections, navigation, carousels, and other components when requested; do not generate a component catalogue in advance.

## File organization

Create folders as real code needs them. Use these responsibilities:

- `src/app/`: routes, metadata, layouts, and server orchestration. As pages grow, compose them from named sections instead of keeping all section markup in the route.
- `src/components/ui/`: shadcn primitives and small shared presentation elements, such as a container. Keep these independent of page copy and business data.
- `src/components/layouts/`: the shared site shell, header, footer, and navigation. Put related navigation pieces in a `navigation/` subfolder when needed. Shared layouts own repeated chrome.
- `src/components/sections/`: substantial page sections, such as a hero, an image-and-text section, or a gallery. A section composes primitives and owns its responsive layout.
- `src/components/effects/`: reusable visual or motion behavior, when required.
- `src/components/forms/` or a named feature folder: related form or feature pieces that belong together.
- `src/hooks/`: reusable client hooks. Keep a hook beside its component when it has only one consumer.
- `src/lib/`: utilities, integration code, and shared configuration. Keep shared content data in a clearly named content module or folder; keep page-specific data near its page.
- `public/`: local images and other static assets.

Use descriptive PascalCase exports for custom React components. Keep related files together by responsibility. Preserve generated shadcn filenames; use a consistent naming convention within each custom component folder. Import through the configured `@/` alias.

## Component composition

- Compose pages in a readable sequence of meaningful sections. Keep routing and metadata separate from section presentation.
- Build sections from shared containers, typography patterns, and UI primitives. Extract repeated patterns when there is a real shared responsibility, rather than wrapping every element in another component.
- Give each component one clear purpose. Prefer composition and `children` slots over a large collection of unrelated modes or boolean props.
- Define explicit TypeScript props. Use structured objects for images and calls to action, such as `{ src, alt }` and `{ href, label }`. Use `ReactNode` for content that needs rich markup.
- Pass copy, images, links, and repeated items into reusable sections. Do not hard-code page-specific content inside a shared layout or primitive.
- Render repeated content from typed arrays with stable keys. Share content only when multiple places need it.
- Allow `className` where callers need layout adjustments, merging it with `cn` from `@/lib/utils`. Use variants for genuine reusable variations, rather than duplicating a component.
- Keep Server Components as the default. Add `"use client"` only at the smallest boundary that needs state, events, browser APIs, or an interactive library.

## Use shadcn components first

Agents must use an available shadcn component as the foundation whenever it supports the requested UI. This is a project requirement, not an optional preference. Use the Radix-based components configured for this repository, then adjust their styles to match the site's design. Their existing interaction and accessibility behavior is the reason to start there.

For each component:

1. Check `src/components/ui/` for an existing implementation and reuse it.
2. If the needed component is not installed, add the matching official shadcn component with `npx shadcn@latest add <component>`, retaining the Radix-based configuration. Install only what the current task needs.
3. Compose the supplied component parts into the requested experience. Keep shared primitives in `ui/` and page-specific composition in the appropriate layout, section, or feature folder.
4. Customize styles through the theme tokens, Tailwind classes, `cn`, and component variants. Change typography, spacing, colors, borders, and radii to fit the elegant theme while preserving the component's behavior.
5. Verify keyboard interaction, visible focus, accessible names, and responsive behavior for the resulting composition.

Do not replace an available shadcn component with a hand-built imitation or recreate keyboard handling, focus management, dialogs, or carousel mechanics to achieve a visual design. Use custom interaction code only when the established components cannot support the requested behavior, and explain the specific gap. Simple semantic HTML remains appropriate for static content and ordinary links.

- Desktop navigation: use shadcn `NavigationMenu` for navigation with dropdowns; use ordinary semantic links for simple navigation.
- Mobile navigation: use shadcn `Sheet` or `Dialog`, retaining its accessible title, close control, focus management, and Escape behavior.
- Carousels: use shadcn `Carousel`, backed by Embla. Keep accessible previous/next controls and slide semantics. Avoid autoplay unless requested; if added, provide a pause control and respect reduced motion.
- Menus, accordions, tabs, popovers, selects, and dialogs: start with the matching shadcn/Radix primitive.
- Forms: use accessible labels, descriptions, errors, and the relevant shadcn controls.

The initial scaffold includes `components.json`, dependencies, theme tokens, and `cn`; UI component files are added on demand. Do not assume that every shadcn component is already installed. Some shadcn components use other foundations, such as Embla for `Carousel` or native HTML for simple controls; retain those supplied implementations too.

Preserve the underlying primitive's semantics, ARIA relationships, ref forwarding, keyboard support, focus trap, and focus restoration while styling it. Use links for navigation and buttons for actions. Supply meaningful image alternatives, a logical heading hierarchy, visible focus, and accessible names for icon controls.

## Custom visual theme

The visual direction is quiet and elegant: warm ivory backgrounds, muted olive accents, charcoal text, expressive serif headings, restrained sans-serif supporting text, generous spacing, fine borders, and small corner radii.

- `src/app/globals.css` owns the theme. Use its semantic color tokens through Tailwind classes such as `bg-background`, `text-foreground`, `text-primary`, and `border-border`.
- Use the configured serif and sans-serif fonts. Maintain the established typography hierarchy and responsive spacing.
- Treat shadcn as the behavioral foundation. Customize component styles and variants to fit this theme, including typography, padding, borders, radii, hover states, and focus states. A newly added component should not retain stock styling that conflicts with the site.
- Put shared visual decisions in theme tokens or reusable variants. Avoid scattering duplicate color values and conflicting overrides across sections.
- Preserve responsive layouts, readable contrast, and reduced-motion preferences. Do not hide essential controls or content on small screens.
- Keep page layouts specific to the requested design. Do not default to dashboard cards, pills, large rounded panels, or decorative shadows.

## Verification

Use npm and keep `package-lock.json` current. Run `npm run typecheck` and `npm run build` after meaningful implementation changes. When browser access is available, verify desktop and mobile layouts and keyboard behavior for newly added interactive components. Report verification that could not be completed.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
