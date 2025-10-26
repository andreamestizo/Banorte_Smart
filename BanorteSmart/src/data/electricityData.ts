export interface DayData {
  day: string;
  cost: number;
  kwh: number;
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

// Week 1: Oct 14-20, 2025 (Current week with spikes)
const week1: WeekData = {
  weekNumber: 1,
  dateRange: '14 Oct - 20 Oct',
  startDate: '2025-10-14',
  endDate: '2025-10-20',
  days: [
    { day: 'Lun', cost: 45, kwh: 12, date: '2025-10-14' },
    { day: 'Mar', cost: 52, kwh: 14, date: '2025-10-15' },
    { day: 'Mié', cost: 125, kwh: 35, date: '2025-10-16' }, // Spike!
    { day: 'Jue', cost: 48, kwh: 13, date: '2025-10-17' },
    { day: 'Vie', cost: 55, kwh: 15, date: '2025-10-18' },
    { day: 'Sáb', cost: 142, kwh: 40, date: '2025-10-19' }, // Spike!
    { day: 'Dom', cost: 38, kwh: 10, date: '2025-10-20' },
  ],
  total: 505,
};

// Week 2: Oct 7-13, 2025 (Last week - lower usage)
const week2: WeekData = {
  weekNumber: 2,
  dateRange: '7 Oct - 13 Oct',
  startDate: '2025-10-07',
  endDate: '2025-10-13',
  days: [
    { day: 'Lun', cost: 42, kwh: 11, date: '2025-10-07' },
    { day: 'Mar', cost: 48, kwh: 13, date: '2025-10-08' },
    { day: 'Mié', cost: 51, kwh: 14, date: '2025-10-09' },
    { day: 'Jue', cost: 44, kwh: 12, date: '2025-10-10' },
    { day: 'Vie', cost: 53, kwh: 14, date: '2025-10-11' },
    { day: 'Sáb', cost: 58, kwh: 16, date: '2025-10-12' },
    { day: 'Dom', cost: 35, kwh: 9, date: '2025-10-13' },
  ],
  total: 331,
};

// Week 3: Sep 30 - Oct 6, 2025 (2 weeks ago - moderate usage)
const week3: WeekData = {
  weekNumber: 3,
  dateRange: '30 Sep - 6 Oct',
  startDate: '2025-09-30',
  endDate: '2025-10-06',
  days: [
    { day: 'Lun', cost: 50, kwh: 13, date: '2025-09-30' },
    { day: 'Mar', cost: 55, kwh: 15, date: '2025-10-01' },
    { day: 'Mié', cost: 62, kwh: 17, date: '2025-10-02' },
    { day: 'Jue', cost: 48, kwh: 13, date: '2025-10-03' },
    { day: 'Vie', cost: 71, kwh: 19, date: '2025-10-04' },
    { day: 'Sáb', cost: 68, kwh: 18, date: '2025-10-05' },
    { day: 'Dom', cost: 40, kwh: 11, date: '2025-10-06' },
  ],
  total: 394,
};

// Week 4: Sep 23-29, 2025 (3 weeks ago - high usage)
const week4: WeekData = {
  weekNumber: 4,
  dateRange: '23 Sep - 29 Sep',
  startDate: '2025-09-23',
  endDate: '2025-09-29',
  days: [
    { day: 'Lun', cost: 58, kwh: 16, date: '2025-09-23' },
    { day: 'Mar', cost: 65, kwh: 18, date: '2025-09-24' },
    { day: 'Mié', cost: 88, kwh: 24, date: '2025-09-25' }, // Mini spike
    { day: 'Jue', cost: 52, kwh: 14, date: '2025-09-26' },
    { day: 'Vie', cost: 78, kwh: 21, date: '2025-09-27' },
    { day: 'Sáb', cost: 95, kwh: 26, date: '2025-09-28' }, // Mini spike
    { day: 'Dom', cost: 42, kwh: 11, date: '2025-09-29' },
  ],
  total: 478,
};

export const electricityData: WeekData[] = [week1, week2, week3, week4];

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
  const allWeeks = electricityData;
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
