import React from "react";
import { add, sub } from "date-fns";

import styles from "./HabitHeader.module.css";
import getWeekday from "../../utils/date/getWeekday";

const today = new Date();
// So: 0
const day = today.getDay();

const subtractDays = day === 0 ? 6 : day - 1;

const firstDateInWeek = sub(today, { days: subtractDays });

const datesInWeek = Array.from({ length: 7 }, (_, i) =>
  add(firstDateInWeek, { days: i })
);

export default function HabitHeader() {
  return (
    <div className={styles.con}>
      <div className={styles.cal_con}>
        {/* <p className={styles.text}>be the designer of your world.</p> */}
        <div className={styles.dates_con}>
          {datesInWeek.map((date) => {
            return <p className={styles.date}>{date.getDate()}'</p>;
          })}
        </div>
        {/* <div className={styles.weekday_con}>
          {datesInWeek.map((date) => {
            return <p className={styles.weekday}>{getWeekday(date)}'</p>;
          })}
        </div> */}
      </div>
    </div>
  );
}