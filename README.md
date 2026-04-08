# 🗓️ Interactive Wall Calendar

A **production-grade interactive wall calendar** built with Next.js 16, TypeScript, and vanilla CSS. Designed to feel and look like a real physical wall calendar — complete with spiral binder, seasonal hero images, and smooth animations.

> Built as a frontend engineering challenge submission. No backend. No UI libraries. Pure frontend craftsmanship.

---

## ✨ Features

- **📅 Date Range Selection** — Click any two dates to highlight a range with rounded pill-style highlighting and a summary bar showing the number of days selected
- **🎨 Dynamic Monthly Theming** — Each month has its own accent color and seasonal image. Theme is applied globally via CSS custom properties injected at runtime
- **🗒️ Persistent Notes** — A lined-paper memo area per month, saved automatically to `localStorage` so notes survive page refreshes
- **🎉 Holiday Markers** — 19 holidays across the year shown as emoji badges on the calendar, with hover tooltips showing the holiday name
- **📖 Page-Flip Animation** — Smooth CSS keyframe animation on every month navigation
- **📱 Fully Responsive** — Side-by-side panel layout on desktop (no scroll), gracefully stacked on mobile with touch-friendly targets
- **🌀 Spiral Binder** — Realistic physical calendar aesthetic with a ring binder at the top

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Next.js 16** | App Router, SSR-ready |
| **TypeScript** | Full type safety across components and hooks |
| **Vanilla CSS** | Custom design system with CSS variables — no Tailwind, no UI library |
| **date-fns** | Lightweight date manipulation and formatting |
| **localStorage** | Client-side note persistence (no backend required) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repo
git clone https://github.com/20omkale/wall-calendar.git
cd wall-calendar

# Install dependencies
npm install --legacy-peer-deps

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
wall-calendar/
├── app/
│   ├── globals.css        # Full design system — tokens, layout, animations
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main calendar page — assembles all components
│
├── components/
│   └── Calendar/
│       ├── Header.tsx     # Hero image, month badge, navigation, theming
│       ├── Grid.tsx       # Date grid, range highlighting, holiday markers
│       └── Notes.tsx      # Lined-paper memo textarea
│
├── hooks/
│   ├── useCalendar.ts     # Month navigation + date range selection logic
│   └── useNotes.ts        # localStorage persistence for monthly notes
│
├── types/
│   └── calendar.ts        # TypeScript interfaces (DateRange, DayState, etc.)
│
└── utils/
    └── holidays.ts        # Holiday registry with emoji + tooltip data
```

---

## 🎨 Design Decisions

### Why vanilla CSS instead of Tailwind?
The physical calendar aesthetic required precise control over custom animations, CSS `clip-path`, repeating gradients for lined paper, and dynamic CSS variable injection. Tailwind would have added significant overhead for little benefit in this use case.

### Why date-fns instead of dayjs or moment?
`date-fns` is tree-shakeable, immutable by default, and TypeScript-native. It's the right choice for a calendar component where you're doing a lot of week/day boundary calculations.

### How does dynamic theming work?
The `Header` component reads a `MONTH_DATA` map and calls `document.documentElement.style.setProperty('--accent', ...)` on mount and whenever the month changes. All color-dependent CSS reads from these variables, so the entire UI recolors instantly without re-renders.

### How is the range selection implemented?
`useCalendar` maintains a `{ start, end }` state. On first click, `start` is set. On second click, if the new date is after `start`, `end` is set (with auto-swap if before). `getDayState(date)` returns `'start' | 'end' | 'middle' | 'none'` for each cell, which drives CSS class assignment in `Grid.tsx`.

---

## 📱 Responsive Behavior

| Breakpoint | Layout |
|---|---|
| `> 700px` (Desktop) | Side-by-side: Notes panel left (195px), Calendar grid right. Full calendar fits in `100vh` — no scroll |
| `≤ 700px` (Mobile) | Stacked: Hero → Grid → Notes. Body scroll re-enabled. `font-size: 16px` on textarea prevents iOS auto-zoom |

---

## 🌐 Live Demo

[Deployed on Vercel →](https://wall-calendar-81h7.vercel.app)

---

## 📄 License

MIT — feel free to use, fork, and improve.
