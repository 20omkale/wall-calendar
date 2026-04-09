import { useState, useCallback, useEffect } from 'react';
import { addMonths, subMonths, format, isSameDay, isWithinInterval, isAfter, isBefore } from 'date-fns';
import { DateRange, CalendarMonth } from '@/types/calendar';

export const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [savedRanges, setSavedRanges] = useState<DateRange[]>([]);
  const [draftStart, setDraftStart] = useState<Date | null>(null);
  const [activeRangeId, setActiveRangeId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved calendar perspective on mount
  useEffect(() => {
    const savedDate = localStorage.getItem('calendar-current-date');
    if (savedDate) {
      const parsedDate = new Date(savedDate);
      if (!isNaN(parsedDate.getTime())) {
        setCurrentDate(parsedDate);
      }
    }

    const savedRangesData = localStorage.getItem('calendar-ranges');
    if (savedRangesData) {
      try {
        const parsed = JSON.parse(savedRangesData);
        if (Array.isArray(parsed)) {
          setSavedRanges(parsed.map((r: any) => ({
            id: r.id,
            start: r.start ? new Date(r.start) : null,
            end: r.end ? new Date(r.end) : null,
          })));
        }
      } catch (e) {
        console.error('Failed to parse saved calendar ranges', e);
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Persist calendar state automatically after initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('calendar-current-date', currentDate.toISOString());
    }
  }, [currentDate, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('calendar-ranges', JSON.stringify(
        savedRanges.map(r => ({
          id: r.id,
          start: r.start ? r.start.toISOString() : null,
          end: r.end ? r.end.toISOString() : null,
        }))
      ));
    }
  }, [savedRanges, isInitialized]);

  const nextMonth = useCallback(() => setCurrentDate(prev => addMonths(prev, 1)), []);
  const prevMonth = useCallback(() => setCurrentDate(prev => subMonths(prev, 1)), []);

  const handleDateClick = useCallback((date: Date) => {
    if (draftStart) {
      if (isSameDay(date, draftStart)) {
        setDraftStart(null);
        return;
      }
      
      const start = isBefore(draftStart, date) ? draftStart : date;
      const end = isBefore(draftStart, date) ? date : draftStart;
      
      const newRange: DateRange = {
        id: `rng_${Math.random().toString(36).substring(2, 9)}`,
        start,
        end
      };
      
      setSavedRanges(prev => [...prev, newRange]);
      setDraftStart(null);
      setActiveRangeId(newRange.id);
      return;
    }

    const clickedRange = savedRanges.find(r => {
      if (r.start && isSameDay(date, r.start)) return true;
      if (r.end && isSameDay(date, r.end)) return true;
      if (r.start && r.end && isWithinInterval(date, { start: r.start, end: r.end })) return true;
      return false;
    });

    if (clickedRange) {
      setActiveRangeId(prev => prev === clickedRange.id ? null : clickedRange.id);
    } else {
      setDraftStart(date);
      setActiveRangeId(null);
    }
  }, [draftStart, savedRanges]);

  const getDayState = useCallback((date: Date): string => {
    if (draftStart && isSameDay(date, draftStart)) return 'active-start';

    for (const r of savedRanges) {
      const isActive = r.id === activeRangeId;
      const prefix = isActive ? 'active-' : '';
      
      if (r.start && isSameDay(date, r.start)) return `${prefix}start`;
      if (r.end && isSameDay(date, r.end)) return `${prefix}end`;
      if (r.start && r.end && isWithinInterval(date, { start: r.start, end: r.end })) return `${prefix}middle`;
    }
    return 'none';
  }, [savedRanges, activeRangeId, draftStart]);

  const clearActiveRange = useCallback(() => {
    if (activeRangeId) {
      setSavedRanges(prev => prev.filter(r => r.id !== activeRangeId));
      setActiveRangeId(null);
    } else if (draftStart) {
      setDraftStart(null);
    }
  }, [activeRangeId, draftStart]);

  const activeRange = savedRanges.find(r => r.id === activeRangeId) || null;
  const rangeView = draftStart 
    ? { start: draftStart, end: null } 
    : (activeRange ? { start: activeRange.start, end: activeRange.end } : { start: null, end: null });

  return {
    currentDate,
    range: rangeView,
    activeRangeId,
    nextMonth,
    prevMonth,
    handleDateClick,
    getDayState,
    clearActiveRange,
    monthName: format(currentDate, 'MMMM'),
    year: format(currentDate, 'yyyy'),
  };
};
