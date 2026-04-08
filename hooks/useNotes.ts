import { useState, useEffect, useCallback } from 'react';
import { Note } from '@/types/calendar';

export const useNotes = () => {
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('calendar-notes');
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse notes from localStorage', e);
      }
    }
  }, []);

  const saveNote = useCallback((key: string, content: string) => {
    setNotes(prev => {
      const next = { ...prev };
      if (content.trim() === '') {
        delete next[key];
      } else {
        next[key] = content;
      }
      localStorage.setItem('calendar-notes', JSON.stringify(next));
      return next;
    });
  }, []);

  const getNote = useCallback((key: string) => notes[key] || '', [notes]);

  return {
    notes,
    saveNote,
    getNote,
  };
};
