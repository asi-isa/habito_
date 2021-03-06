import React, { Dispatch, SetStateAction } from "react";
import { add, sub } from "date-fns";

import styles from "./HabitHeader.module.css";
import AddHabit from "./AddHabit";

const today = new Date();
// So: 0
const day = today.getDay();

const subtractDays = day === 0 ? 6 : day - 1;

const firstDateInWeek = sub(today, { days: subtractDays });

const datesInWeek = Array.from({ length: 7 }, (_, i) =>
  add(firstDateInWeek, { days: i })
);

interface HabitHeaderProps {
  setShowAddHabitForm: Dispatch<SetStateAction<boolean>>;
  showAddHabitForm: boolean;
}

export default function HabitHeader({
  setShowAddHabitForm,
  showAddHabitForm,
}: HabitHeaderProps) {
  return (
    <div className={styles.con}>
      <AddHabit
        setShowAddHabitForm={setShowAddHabitForm}
        showAddHabitForm={showAddHabitForm}
      />
      <div className={styles.dates_con}>
        {datesInWeek.map((date) => {
          return (
            <p className={styles.date} key={date.toISOString()}>
              {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}'
            </p>
          );
        })}
      </div>
    </div>
  );
}
