'use client';

import React from 'react';

interface NotesProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  className?: string;
}

export const Notes: React.FC<NotesProps> = ({ value, onChange, title = 'Notes', className = '' }) => {
  return (
    <div className={className}>
      <p className="notes-title">{title}</p>
      <textarea
        className="notes-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Jot down something..."
        aria-label="Monthly notes"
      />
    </div>
  );
};
