'use client';

import React, { useMemo, useCallback } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useNotes }    from '@/hooks/useNotes';
import { Header }      from '@/components/Calendar/Header';
import { Grid }        from '@/components/Calendar/Grid';
import { Notes }       from '@/components/Calendar/Notes';
import { format, getMonth } from 'date-fns';

export default function Home() {
  const {
    currentDate,
    monthName,
    year,
    range,
    nextMonth,
    prevMonth,
    handleDateClick,
    getDayState,
    setRange,
  } = useCalendar();

  const { saveNote, getNote } = useNotes();

  const currentMonthKey = useMemo(
    () => `month-${format(currentDate, 'yyyy-MM')}`,
    [currentDate]
  );

  const monthIndex = getMonth(currentDate);

  const handleClearRange = useCallback(() => {
    setRange({ start: null, end: null });
  }, [setRange]);

  return (
    <div className="app-shell">
      <div className="calendar-perspective">
        <div className="calendar-root">

          {/* ── Spiral Binder ── */}
          <div className="binder">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="binder-ring" />
            ))}
          </div>

          {/* ── Hero + Navigation ── */}
          <Header
            monthName={monthName}
            year={year}
            monthIndex={monthIndex}
            onNext={nextMonth}
            onPrev={prevMonth}
            animDir={null}
          />

          {/* ── Body: Notes (left) + Grid (right) ── */}
          <div className="calendar-body">
            {/* Desktop sidebar notes */}
            <div className="notes-panel">
              <Notes
                value={getNote(currentMonthKey)}
                onChange={val => saveNote(currentMonthKey, val)}
                title={`${monthName} Memos`}
              />
            </div>

            {/* Date grid */}
            <Grid
              currentDate={currentDate}
              range={range}
              onDateClick={handleDateClick}
              getDayState={getDayState}
              onClearRange={handleClearRange}
            />
          </div>

          {/* ── Mobile: stacked notes below grid ── */}
          <div className="mobile-notes-section">
            <Notes
              value={getNote(currentMonthKey)}
              onChange={val => saveNote(currentMonthKey, val)}
              title={`${monthName} Memos`}
            />
          </div>

          {/* ── Footer ── */}
          <div className="calendar-footer">
            <span className="footer-dot" />
            Wall Calendar 2026
            <span className="footer-dot" />
          </div>

        </div>
      </div>
    </div>
  );
}
