'use client';

import React from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, format, isSameMonth, isToday, getDay,
} from 'date-fns';
import { DateRange } from '@/types/calendar';
import { getHoliday } from '@/utils/holidays';

interface GridProps {
  currentDate: Date;
  range: DateRange;
  onDateClick: (date: Date) => void;
  getDayState: (date: Date) => 'none' | 'start' | 'end' | 'middle';
  onClearRange: () => void;
}

const WEEKDAYS = [
  { label: 'MON', isWeekend: false },
  { label: 'TUE', isWeekend: false },
  { label: 'WED', isWeekend: false },
  { label: 'THU', isWeekend: false },
  { label: 'FRI', isWeekend: false },
  { label: 'SAT', isWeekend: true  },
  { label: 'SUN', isWeekend: true  },
];

export const Grid: React.FC<GridProps> = ({
  currentDate, range, onDateClick, getDayState, onClearRange
}) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd   = endOfMonth(monthStart);
  const startDate  = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate    = endOfWeek(monthEnd,    { weekStartsOn: 1 });
  const days       = eachDayOfInterval({ start: startDate, end: endDate });

  const getRangeLabel = (): string | null => {
    if (!range.start) return null;
    if (!range.end)   return `From ${format(range.start, 'MMM d, yyyy')} — click an end date`;
    const diff = Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1;
    return `${format(range.start, 'MMM d')} → ${format(range.end, 'MMM d, yyyy')}  ·  ${diff} day${diff !== 1 ? 's' : ''}`;
  };

  const rangeLabel = getRangeLabel();

  return (
    <div className="grid-panel">
      {/* Weekday headers */}
      <div className="weekdays-row">
        {WEEKDAYS.map(wd => (
          <div key={wd.label} className={`weekday-label${wd.isWeekend ? ' is-weekend' : ''}`}>
            {wd.label}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="days-grid">
        {days.map(day => {
          const state        = getDayState(day);
          const inMonth      = isSameMonth(day, monthStart);
          const isTodayDate  = isToday(day);
          const dow          = getDay(day);           // 0=Sun 6=Sat
          const isWeekend    = dow === 0 || dow === 6;
          const holiday      = inMonth ? getHoliday(day) : null;

          // Range background bar
          let bgClass = 'day-range-bg rng-none';
          if (state === 'middle') bgClass = 'day-range-bg';
          if (state === 'start')  bgClass = 'day-range-bg rng-start';
          if (state === 'end')    bgClass = 'day-range-bg rng-end';

          // Number bubble classes
          const numClasses: string[] = ['day-num'];
          if (!inMonth)                         numClasses.push('is-other-month');
          if (isTodayDate)                      numClasses.push('is-today');
          if (isWeekend && inMonth && state === 'none') numClasses.push('is-weekend');
          if (state === 'start')                numClasses.push('is-selected-start');
          if (state === 'end')                  numClasses.push('is-selected-end');
          if (state === 'middle')               numClasses.push('is-range-mid');
          if (state === 'none')                 numClasses.push('is-normal');

          return (
            <div
              key={day.toString()}
              className="day-cell"
              onClick={() => onDateClick(day)}
              role="button"
              tabIndex={inMonth ? 0 : -1}
              onKeyDown={e => e.key === 'Enter' && onDateClick(day)}
              aria-label={`${format(day, 'MMMM d, yyyy')}${holiday ? ` - ${holiday.name}` : ''}`}
            >
              <div className={bgClass} />

              <span className={numClasses.join(' ')}>
                {format(day, 'd')}
              </span>

              {/* Holiday emoji badge */}
              {holiday && inMonth && (
                <>
                  <span className="holiday-badge" aria-hidden="true">
                    {holiday.emoji}
                  </span>
                  <div className="holiday-tooltip">
                    {holiday.emoji} {holiday.name}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Range info bar */}
      {rangeLabel && (
        <div className="range-info">
          <span style={{ fontSize: 15 }}>📅</span>
          <span>{rangeLabel}</span>
          {range.end && (
            <button className="range-clear-btn" onClick={onClearRange}>
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
};
