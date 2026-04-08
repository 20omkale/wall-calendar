# Changelog

All notable changes to this project are documented here.

## [1.1.0] - 2026-04-09

### Added
- Holiday markers with emoji badges on calendar dates (19 holidays)
- Tooltip on hover showing holiday name
- Dynamic monthly theming — each month injects its own `--accent` CSS variable
- Season label in the hero badge ("2026 · Spring")
- Page-enter animation on month navigation (CSS keyframe)
- Accent color strip on left edge of hero section
- Range info bar with day count and Clear button
- Mobile-specific stacked layout with `font-size: 16px` to prevent iOS zoom

### Changed
- Hero section height now uses `clamp()` for fluid proportional sizing
- Notes textarea uses `flex: 1` to fill available height instead of fixed min-height
- Calendar body changed from fixed height to `flex: 1; min-height: 0` for proper viewport fit
- Switched image source from Unsplash (unreliable CORS) to Picsum Photos

### Fixed
- Calendar no longer requires scrolling on desktop — entire card fits in `100vh`
- Grid days no longer stacked vertically — proper `display: grid; grid-template-columns: repeat(7, 1fr)` in vanilla CSS
- Mobile notes section now renders below the grid instead of being hidden entirely

## [1.0.0] - 2026-04-08

### Added
- Initial Next.js 16 project with TypeScript and App Router
- `useCalendar` hook — month navigation and date range selection
- `useNotes` hook — per-month note persistence via localStorage
- `Header` component — hero image, month/year display, navigation arrows
- `Grid` component — 7-column date grid with range highlighting
- `Notes` component — lined-paper style textarea
- Spiral binder aesthetic at top of calendar card
- Wave SVG transition from hero image to calendar body
- Full vanilla CSS design system with CSS custom properties
- Responsive layout — side-by-side desktop, stacked mobile
