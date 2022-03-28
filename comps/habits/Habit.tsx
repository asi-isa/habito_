import React, { useEffect, useState } from "react";
import { add, sub } from "date-fns";

import styles from "./Habit.module.css";
import isEqual from "../../utils/date/isEqual";
import isInList from "../../utils/date/isInList";

const today = new Date("2022-03-27");
// So: 0
const day = today.getDay();

const subtractDays = day === 0 ? 6 : day - 1;

const firstDateInWeek = sub(today, { days: subtractDays });

const daysInWeek = Array.from({ length: 7 }, (_, i) =>
  add(firstDateInWeek, { days: i })
);

interface HabitProps {
  name: string;
  dates: Date[];
  toggleActive: (day: Date) => void;
}

export default function Habit({ name, dates, toggleActive }: HabitProps) {
  // const [dates, setDates] = useState(dates_);

  // function toggleActive(day: Date) {
  //   const isInList_ = isInList(day, dates);

  //   if (isInList_) {
  //     setDates((currentDates) =>
  //       currentDates.filter((date) => !isEqual(day, date))
  //     );
  //   } else {
  //     setDates((currentDates) => [...currentDates, day]);
  //   }
  // }

  return (
    <article className={styles.con}>
      <h2 className={styles.name}>{name}</h2>

      {daysInWeek.map((day) => {
        let isActiveDay = isInList(day, dates);

        return (
          <div
            onClick={() => toggleActive(day)}
            className={`${styles.day} ${isActiveDay && styles.day_active}`}
            key={day.toISOString()}
          />
        );
      })}
    </article>
  );
}
