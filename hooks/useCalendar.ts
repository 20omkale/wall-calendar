import { useState, useCallback } from 'react';
import { addMonths, subMonths, format, isSameDay, isWithinInterval, isAfter, isBefore } from 'date-fns';
import { DateRange, CalendarMonth } from '@/types/calendar';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  const nextMonth = useCallback(() => setCurrentDate(prev => addMonths(prev, 1)), []);
  const prevMonth = useCallback(() => setCurrentDate(prev => subMonths(prev, 1)), []);

  const handleDateClick = useCallback((date: Date) => {
    setRange(prev => {
      // If no start date, or if clicking the same day twice resets
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }

      // If start exists but end doesn't
      if (isSameDay(date, prev.start)) {
        return { start: null, end: null }; // Reset if same day
      }

      if (isBefore(date, prev.start)) {
        return { start: date, end: prev.start };
      }

      return { start: prev.start, end: date };
    });
  }, []);

  const isDaySelected = useCallback((date: Date) => {
    if (!range.start) return false;
    if (range.end) {
      return isWithinInterval(date, { start: range.start, end: range.end });
    }
    return isSameDay(date, range.start);
  }, [range]);

  const getDayState = useCallback((date: Date) => {
    if (!range.start) return 'none';
    if (isSameDay(date, range.start)) return 'start';
    if (range.end && isSameDay(date, range.end)) return 'end';
    if (range.end && isWithinInterval(date, { start: range.start, end: range.end })) return 'middle';
    return 'none';
  }, [range]);

  return {
    currentDate,
    range,
    nextMonth,
    prevMonth,
    handleDateClick,
    getDayState,
    isDaySelected,
    setRange,
    monthName: format(currentDate, 'MMMM'),
    year: format(currentDate, 'yyyy'),
  };
};
