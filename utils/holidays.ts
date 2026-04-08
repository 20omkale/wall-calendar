import { format } from 'date-fns';

export interface Holiday {
  name: string;
  emoji: string;
  type: 'national' | 'international' | 'observance';
}

// Key: "MM-DD" format
const HOLIDAYS: Record<string, Holiday> = {
  '01-01': { name: "New Year's Day",         emoji: '🎆', type: 'national'       },
  '01-14': { name: "Makar Sankranti",         emoji: '🪁', type: 'national'       },
  '01-15': { name: "MLK Jr. Day",             emoji: '✊', type: 'national'       },
  '01-26': { name: "Republic Day",            emoji: '🇮🇳', type: 'national'      },
  '02-14': { name: "Valentine's Day",         emoji: '❤️', type: 'observance'    },
  '03-08': { name: "International Women's Day", emoji: '💜', type: 'international' },
  '03-17': { name: "St. Patrick's Day",       emoji: '🍀', type: 'observance'    },
  '03-21': { name: "World Poetry Day",        emoji: '📜', type: 'international' },
  '04-01': { name: "April Fools' Day",        emoji: '🃏', type: 'observance'    },
  '04-07': { name: "World Health Day",        emoji: '🏥', type: 'international' },
  '04-14': { name: "Ambedkar Jayanti",        emoji: '📚', type: 'national'       },
  '04-22': { name: "Earth Day",               emoji: '🌍', type: 'international' },
  '05-01': { name: "International Labour Day",emoji: '⚒️', type: 'international' },
  '05-04': { name: "Star Wars Day",           emoji: '⭐', type: 'observance'    },
  '06-05': { name: "World Environment Day",   emoji: '🌿', type: 'international' },
  '06-21': { name: "World Music Day",         emoji: '🎵', type: 'international' },
  '07-04': { name: "Independence Day (US)",   emoji: '🎆', type: 'national'       },
  '08-12': { name: "International Youth Day", emoji: '🌟', type: 'international' },
  '08-15': { name: "Independence Day (India)",emoji: '🇮🇳', type: 'national'      },
  '09-05': { name: "Teacher's Day",           emoji: '📚', type: 'observance'    },
  '10-02': { name: "Gandhi Jayanti",          emoji: '🕊️', type: 'national'      },
  '10-16': { name: "World Food Day",          emoji: '🍽️', type: 'international' },
  '10-31': { name: "Halloween",               emoji: '🎃', type: 'observance'    },
  '11-11': { name: "Veterans Day",            emoji: '🎖️', type: 'national'       },
  '11-14': { name: "Children's Day",          emoji: '👶', type: 'national'       },
  '12-24': { name: "Christmas Eve",           emoji: '🎄', type: 'observance'    },
  '12-25': { name: "Christmas Day",           emoji: '🎅', type: 'national'       },
  '12-31': { name: "New Year's Eve",          emoji: '🥂', type: 'observance'    },
};

export function getHoliday(date: Date): Holiday | null {
  const key = format(date, 'MM-dd');
  return HOLIDAYS[key] ?? null;
}
