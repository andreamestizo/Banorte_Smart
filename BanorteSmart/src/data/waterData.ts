export interface DayData {
  day: string;
  cost: number;
  m3: number; // cubic meters
  date: string;
}

export interface WeekData {
  weekNumber: number;
  dateRange: string;
  startDate: string;
  endDate: string;
  days: DayData[];
  total: number;
}

// Week 1: Oct 14-20, 2025 (Current week - lower usage with savings!)
const week1: WeekData = {
  weekNumber: 1,
  dateRange: '14 Oct - 20 Oct',
  startDate: '2025-10-14',
  endDate: '2025-10-20',
  days: [
    { day: 'Lun', cost: 26, m3: 0.32, date: '2025-10-14' },
    { day: 'Mar', cost: 30, m3: 0.37, date: '2025-10-15' },
    { day: 'Mié', cost: 32, m3: 0.40, date: '2025-10-16' },
    { day: 'Jue', cost: 28, m3: 0.35, date: '2025-10-17' },
    { day: 'Vie', cost: 33, m3: 0.41, date: '2025-10-18' },
    { day: 'Sáb', cost: 38, m3: 0.47, date: '2025-10-19' },
    { day: 'Dom', cost: 22, m3: 0.27, date: '2025-10-20' },
  ],
  total: 209,
};

// Week 2: Oct 7-13, 2025 (Last week - higher usage)
const week2: WeekData = {
  weekNumber: 2,
  dateRange: '7 Oct - 13 Oct',
  startDate: '2025-10-07',
  endDate: '2025-10-13',
  days: [
    { day: 'Lun', cost: 28, m3: 0.35, date: '2025-10-07' },
    { day: 'Mar', cost: 32, m3: 0.40, date: '2025-10-08' },
    { day: 'Mié', cost: 85, m3: 1.06, date: '2025-10-09' }, // Spike!
    { day: 'Jue', cost: 30, m3: 0.37, date: '2025-10-10' },
    { day: 'Vie', cost: 34, m3: 0.42, date: '2025-10-11' },
    { day: 'Sáb', cost: 96, m3: 1.20, date: '2025-10-12' }, // Spike!
    { day: 'Dom', cost: 24, m3: 0.30, date: '2025-10-13' },
  ],
  total: 329,
};

// Week 3: Sep 30 - Oct 6, 2025 (2 weeks ago - moderate usage)
const week3: WeekData = {
  weekNumber: 3,
  dateRange: '30 Sep - 6 Oct',
  startDate: '2025-09-30',
  endDate: '2025-10-06',
  days: [
    { day: 'Lun', cost: 31, m3: 0.38, date: '2025-09-30' },
    { day: 'Mar', cost: 34, m3: 0.42, date: '2025-10-01' },
    { day: 'Mié', cost: 40, m3: 0.50, date: '2025-10-02' },
    { day: 'Jue', cost: 30, m3: 0.37, date: '2025-10-03' },
    { day: 'Vie', cost: 45, m3: 0.56, date: '2025-10-04' },
    { day: 'Sáb', cost: 43, m3: 0.53, date: '2025-10-05' },
    { day: 'Dom', cost: 25, m3: 0.31, date: '2025-10-06' },
  ],
  total: 248,
};

// Week 4: Sep 23-29, 2025 (3 weeks ago - high usage)
const week4: WeekData = {
  weekNumber: 4,
  dateRange: '23 Sep - 29 Sep',
  startDate: '2025-09-23',
  endDate: '2025-09-29',
  days: [
    { day: 'Lun', cost: 36, m3: 0.45, date: '2025-09-23' },
    { day: 'Mar', cost: 42, m3: 0.52, date: '2025-09-24' },
    { day: 'Mié', cost: 58, m3: 0.72, date: '2025-09-25' }, // Mini spike
    { day: 'Jue', cost: 33, m3: 0.41, date: '2025-09-26' },
    { day: 'Vie', cost: 50, m3: 0.62, date: '2025-09-27' },
    { day: 'Sáb', cost: 62, m3: 0.77, date: '2025-09-28' }, // Mini spike
    { day: 'Dom', cost: 27, m3: 0.33, date: '2025-09-29' },
  ],
  total: 308,
};

export const waterData: WeekData[] = [week1, week2, week3, week4];

export const getCurrentWeek = () => week1;
export const getLastWeek = () => week2;

export const calculateSavings = (currentWeek: WeekData, lastWeek: WeekData) => {
  const difference = currentWeek.total - lastWeek.total;
  const percentageChange = ((difference / lastWeek.total) * 100).toFixed(1);

  return {
    saved: difference < 0,
    amount: Math.abs(difference),
    percentage: Math.abs(parseFloat(percentageChange)),
    difference,
  };
};

// Helper function for AI to analyze data
export const getDataSummary = () => {
  const allWeeks = waterData;
  const currentWeek = getCurrentWeek();
  const lastWeek = getLastWeek();

  // Find highest cost day across all weeks
  const allDays = allWeeks.flatMap(week =>
    week.days.map(day => ({ ...day, week: week.dateRange }))
  );
  const highestCostDay = allDays.reduce((max, day) =>
    day.cost > max.cost ? day : max
  );

  // Find average daily cost
  const totalCost = allDays.reduce((sum, day) => sum + day.cost, 0);
  const averageDailyCost = totalCost / allDays.length;

  // Find spikes (2x above average)
  const spikes = allDays.filter(day => day.cost > averageDailyCost * 2);

  return {
    currentWeek: {
      total: currentWeek.total,
      dateRange: currentWeek.dateRange,
      average: (currentWeek.total / 7).toFixed(2),
    },
    lastWeek: {
      total: lastWeek.total,
      dateRange: lastWeek.dateRange,
      average: (lastWeek.total / 7).toFixed(2),
    },
    savings: calculateSavings(currentWeek, lastWeek),
    highestCostDay: {
      day: highestCostDay.day,
      cost: highestCostDay.cost,
      date: highestCostDay.date,
      week: highestCostDay.week,
    },
    averageDailyCost: averageDailyCost.toFixed(2),
    spikes: spikes.map(s => ({
      day: s.day,
      cost: s.cost,
      date: s.date,
      week: s.week,
    })),
    totalWeeks: allWeeks.length,
  };
};
