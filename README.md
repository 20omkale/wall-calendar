# 🗓️ Premium Interactive Wall Calendar

A production-grade, highly polished interactive wall calendar component built with **Next.js 16**, **TypeScript**, and **Framer Motion**. This project emulates the aesthetic and feel of a physical wall calendar while providing modern digital features like date range selection and persistent notes.

## ✨ Features

- **Wall Calendar Aesthetic**: Realistic spiral binder, paper textures, and shadows.
- **Dynamic Hero Section**: Scenic month-based imagery with a unique jagged transition effect.
- **Advanced Day Range Selection**: Fluid UI for selecting start, end, and middle date states.
- **Persistent Notes Section**: Integrated "lined paper" memos that persist across sessions using `localStorage`.
- **Premium Animations**: Smooth 3D-like page flips and layout transitions powered by Framer Motion.
- **Fully Responsive**: Optimized for Desktop (side-by-side) and Mobile (vertically stacked) layouts.
- **Top 1% Engineering**: Clean component architecture, custom hooks for logic separation, and high-performance rendering.

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Modules) + Design Tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Persistence**: Client-side `localStorage`

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📐 Design Philosophy

The project was designed to "wow" at first glance. Key decisions include:
- **Depth & Perspective**: Using CSS `perspective` and `box-shadow` to make the calendar feel like an object hanging on a wall.
- **Jagged Geometry**: Move away from boring rectangular grids by using SVG `clip-path` for organic transitions.
- **Micro-interactions**: Subtle hover states and dotted today-indicators to enhance UX.

---
Built with ❤️ by Antigravity
