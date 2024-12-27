import { TimelineEntry } from '../types/calculator';

export const aggregateTimelineByYear = (monthlyTimeline: TimelineEntry[]): TimelineEntry[] => {
  return monthlyTimeline.reduce<TimelineEntry[]>((years, entry) => {
    const yearIndex = Math.floor((entry.period - 1) / 12);
    
    if (!years[yearIndex]) {
      years[yearIndex] = {
        period: yearIndex + 1,
        deposit: 0,
        interest: 0,
        endingBalance: entry.endingBalance
      };
    }
    
    years[yearIndex].deposit += entry.deposit;
    years[yearIndex].interest += entry.interest;
    years[yearIndex].endingBalance = entry.endingBalance;
    
    return years;
  }, []);
};