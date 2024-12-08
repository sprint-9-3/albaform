"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { calendarAtom } from "@/atoms/calendarAtom";
import RangePicker from "./RangePicker";
import Calendar from "./Calendar";

const DatePickerCalendar = ({
  setDateRange,
  initialDate,
}: {
  setDateRange: (dateRange: [string, string]) => void;
  initialDate: [string, string];
}) => {
  const isOpen = useAtomValue(calendarAtom);
  const [range, setRange] = useState<[string, string]>(initialDate || ["", ""]);

  useEffect(() => {
    if (range[0] && range[1]) {
      setDateRange(range);
    }
  }, [range, setDateRange]);

  useEffect(() => {
    setRange(initialDate);
  }, [initialDate]);

  return (
    <div className="relative">
      <RangePicker range={range} />
      {isOpen && <Calendar setRange={setRange} />}
    </div>
  );
};

export default DatePickerCalendar;
