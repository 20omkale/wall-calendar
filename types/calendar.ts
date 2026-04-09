export interface DateRange {
  id?: string;
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  dateKey: string; // e.g., "2024-01-15" or "month-2024-01"
  content: string;
}

export type CalendarMonth = {
  year: number;
  month: number; // 0-11
};
