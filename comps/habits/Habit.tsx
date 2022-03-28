import React, { useEffect, useState } from "react";
import { add, sub } from "date-fns";

import styles from "./Habit.module.css";
import isEqual from "../../utils/date/isEqual";
import isInList from "../../utils/date/isInList";

const today = new Date();
// So: 0
const day = today.getDay();

const subtractDays = day === 0 ? 6 : day - 1;

const firstDateInWeek = sub(today, { days: subtractDays });

const datesInWeek = Array.from({ length: 7 }, (_, i) =>
  add(firstDateInWeek, { days: i })
);

interface HabitProps {
  name: string;
  dates: Date[];
  toggleActive: (day: Date) => void;
}

export default function Habit({ name, dates, toggleActive }: HabitProps) {
  return (
    <article className={styles.con}>
      <h2 className={styles.name}>{name}</h2>

      <div className={styles.days}>
        {datesInWeek.map((date) => {
          let isActiveDay = isInList(date, dates);
          return (
            <div
              onClick={() => toggleActive(date)}
              className={`${styles.day} ${isActiveDay && styles.day_active}`}
              key={date.toISOString()}
            />
          );
        })}
      </div>
    </article>
  );
}
