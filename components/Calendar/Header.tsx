'use client';

import React, { useEffect, useRef, useState } from 'react';

const MONTH_DATA: Record<number, {
  url: string;
  accent: string;
  accentLight: string;
  accentPale: string;
  accentDark: string;
  season: string;
}> = {
  0:  { url: 'https://picsum.photos/id/1043/1200/600', accent: '#0ea5e9', accentLight: '#bae6fd', accentPale: '#f0f9ff', accentDark: '#0369a1', season: 'Winter' },
  1:  { url: 'https://picsum.photos/id/154/1200/600',  accent: '#ec4899', accentLight: '#fbcfe8', accentPale: '#fdf2f8', accentDark: '#be185d', season: 'Winter' },
  2:  { url: 'https://picsum.photos/id/432/1200/600',  accent: '#10b981', accentLight: '#a7f3d0', accentPale: '#ecfdf5', accentDark: '#047857', season: 'Spring' },
  3:  { url: 'https://picsum.photos/id/452/1200/600',  accent: '#f59e0b', accentLight: '#fde68a', accentPale: '#fffbeb', accentDark: '#b45309', season: 'Spring' },
  4:  { url: 'https://picsum.photos/id/257/1200/600',  accent: '#22c55e', accentLight: '#bbf7d0', accentPale: '#f0fdf4', accentDark: '#15803d', season: 'Spring' },
  5:  { url: 'https://picsum.photos/id/429/1200/600',  accent: '#0ea5e9', accentLight: '#bae6fd', accentPale: '#f0f9ff', accentDark: '#0369a1', season: 'Summer' },
  6:  { url: 'https://picsum.photos/id/377/1200/600',  accent: '#f97316', accentLight: '#fed7aa', accentPale: '#fff7ed', accentDark: '#c2410c', season: 'Summer' },
  7:  { url: 'https://picsum.photos/id/65/1200/600',   accent: '#eab308', accentLight: '#fef08a', accentPale: '#fefce8', accentDark: '#a16207', season: 'Summer' },
  8:  { url: 'https://picsum.photos/id/29/1200/600',   accent: '#f97316', accentLight: '#fed7aa', accentPale: '#fff7ed', accentDark: '#c2410c', season: 'Autumn' },
  9:  { url: 'https://picsum.photos/id/1022/1200/600', accent: '#ef4444', accentLight: '#fecaca', accentPale: '#fef2f2', accentDark: '#b91c1c', season: 'Autumn' },
  10: { url: 'https://picsum.photos/id/110/1200/600',  accent: '#8b5cf6', accentLight: '#ddd6fe', accentPale: '#f5f3ff', accentDark: '#6d28d9', season: 'Autumn' },
  11: { url: 'https://picsum.photos/id/1060/1200/600', accent: '#2563eb', accentLight: '#bfdbfe', accentPale: '#eff6ff', accentDark: '#1d4ed8', season: 'Winter' },
};

interface HeaderProps {
  monthName: string;
  year: string;
  monthIndex: number;
  onNext: () => void;
  onPrev: () => void;
  animDir: 'next' | 'prev' | null;
}

export const Header: React.FC<HeaderProps> = ({
  monthName, year, monthIndex, onNext, onPrev, animDir
}) => {
  const data = MONTH_DATA[monthIndex] ?? MONTH_DATA[0];
  const [animKey, setAnimKey] = useState(0);
  const prevMonth = useRef(monthIndex);

  // Apply dynamic CSS variables to :root when month changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent',       data.accent);
    root.style.setProperty('--accent-light',  data.accentLight);
    root.style.setProperty('--accent-pale',   data.accentPale);
    root.style.setProperty('--accent-dark',   data.accentDark);
  }, [data]);

  // Trigger re-animation when month changes
  useEffect(() => {
    if (prevMonth.current !== monthIndex) {
      setAnimKey(k => k + 1);
      prevMonth.current = monthIndex;
    }
  }, [monthIndex]);

  return (
    <div className="page-flip-outer">
      <div key={animKey} className="hero-section page-enter">
        {/* Accent strip */}
        <div className="hero-accent-strip" style={{ background: data.accent }} />

        {/* Hero Image */}
        <div
          className="hero-image"
          style={{ backgroundImage: `url('${data.url}')` }}
        />

        {/* Dark overlay */}
        <div className="hero-overlay" />

        {/* Wave SVG transition */}
        <svg
          className="hero-wave"
          viewBox="0 0 920 90"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,90 L0,55 C100,25 180,70 290,42 C390,16 460,62 560,34 C660,8 740,52 840,28 C880,18 900,35 920,30 L920,90 Z"
            fill="white"
          />
        </svg>

        {/* Season + Month/Year Badge */}
        <div className="hero-badge">
          <div className="hero-year">{year} · {data.season}</div>
          <div className="hero-month">{monthName}</div>
        </div>

        {/* Navigation */}
        <div className="nav-btn-wrap">
          <button className="nav-btn" onClick={onPrev} aria-label="Previous month">&#8592;</button>
          <button className="nav-btn" onClick={onNext} aria-label="Next month">&#8594;</button>
        </div>
      </div>
    </div>
  );
};

export { MONTH_DATA };
