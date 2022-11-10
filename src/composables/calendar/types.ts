export type Day = {
  day: number;
  isToday: boolean;
  month: string;
  monthAbbr: string;
  offset: number;
  weekday: string;
  year: number;
};

export type Month = Array<Day | null>;

export type Year = Array<Month>;
