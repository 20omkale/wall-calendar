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
    activeRangeId,
    nextMonth,
    prevMonth,
    handleDateClick,
    getDayState,
    clearActiveRange,
  } = useCalendar();

  const { saveNote, getNote } = useNotes();

  const activeNoteKey = useMemo(() => {
    if (activeRangeId) return `range-${activeRangeId}`;
    return `month-${format(currentDate, 'yyyy-MM')}`;
  }, [activeRangeId, currentDate]);

  const notesTitle = useMemo(() => {
    if (activeRangeId && range.start) {
      if (range.end) {
        return `${format(range.start, 'MMM d')} - ${format(range.end, 'MMM d')} Notes`;
      }
      return `${format(range.start, 'MMM d')} Notes`;
    }
    return `${monthName} Memos`;
  }, [activeRangeId, range, monthName]);

  const monthIndex = getMonth(currentDate);

  const handleClearRange = useCallback(() => {
    clearActiveRange();
  }, [clearActiveRange]);

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
                value={getNote(activeNoteKey)}
                onChange={val => saveNote(activeNoteKey, val)}
                title={notesTitle}
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
              value={getNote(activeNoteKey)}
              onChange={val => saveNote(activeNoteKey, val)}
              title={notesTitle}
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
