"use client";

import { scheduleData } from "../data/schedule";

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

function getWeekDates(baseDate: Date): Date[] {
  const day = baseDate.getDay(); // 0=일 1=월 ...
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function toKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

type Props = {
  selected: Date;
  onSelect: (date: Date) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

export default function WeekCalendar({ selected, onSelect, onPrevWeek, onNextWeek }: Props) {
  const today = new Date();
  const week = getWeekDates(selected);

  const year = selected.getFullYear();
  const month = selected.getMonth() + 1;

  return (
    <div className="px-4 pb-2">
      {/* 월 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrevWeek}
          className="w-8 h-8 flex items-center justify-center text-red-500 font-bold text-lg"
        >
          ‹
        </button>
        <span className="text-xl font-black text-gray-900">
          {year}년 {month}월
        </span>
        <button
          onClick={onNextWeek}
          className="w-8 h-8 flex items-center justify-center text-red-500 font-bold text-lg"
        >
          ›
        </button>
      </div>

      {/* 요일 + 날짜 */}
      <div className="grid grid-cols-7 gap-1">
        {DAY_LABELS.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span
              className={`text-xs font-semibold ${
                i === 5 ? "text-blue-500" : i === 6 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {label}
            </span>
            <button
              onClick={() => onSelect(week[i])}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                toKey(week[i]) === toKey(selected)
                  ? "bg-red-500 text-white shadow-md"
                  : toKey(week[i]) === toKey(today)
                  ? "border-2 border-red-300 text-red-500"
                  : i === 5
                  ? "text-blue-500"
                  : i === 6
                  ? "text-red-400"
                  : "text-gray-800"
              }`}
            >
              {week[i].getDate()}
            </button>
            {/* 경기 있는 날 점 표시 */}
            <div className="h-1.5 flex gap-0.5">
              {scheduleData[toKey(week[i])] && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
