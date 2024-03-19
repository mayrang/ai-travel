import dayjs from "dayjs";

export interface Post {
  calendarId: number;
  startTime: Date | dayjs.Dayjs;
  endTime: Date | dayjs.Dayjs;
  start?: boolean;
  multiple?: boolean;
  // Add other properties as needed
}

export interface Holiday {
  locdate: Date;
  seq: number;
  dateName: string;
  isHoliday: "N" | "Y";
  // Add other properties as needed
}

export interface WeekDay {
  date: number;
  dayFormat?: string;
  type: "prev" | "now" | "next";
  posts?: Post[];
  holiday?: Holiday;
}
