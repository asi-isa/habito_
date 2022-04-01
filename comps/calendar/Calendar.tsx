import React from "react";

import styles from "./Calendar.module.css";

const COLS = 7;
const ROWS = 7;
const DATA = Array.from({ length: COLS }, (_, i) =>
  Array.from({ length: ROWS }, (_, j) => "")
);

DATA[0][0] = "first";

export default function Calendar() {
  return (
    <section className={styles.con}>
      <div className={styles.cal_header}>
        <div className={styles.time}>time</div>
        <div className={styles.weekday}>monday</div>
        <div className={styles.weekday}>tuesday</div>
        <div className={styles.weekday}>wednesday</div>
        <div className={styles.weekday}>thursday</div>
        <div className={styles.weekday}>friday</div>
        <div className={styles.weekday}>saturday</div>
        <div className={styles.weekday}>sunday</div>
      </div>

      <div className={styles.cal_body}>
        <div className={styles.time_col}>
          <div className={styles.time_item}>08:00 - 09:30</div>
          <div className={styles.time_item}>09:50 - 11:20</div>
          <div className={styles.time_item}>11:30 - 13:00</div>
          <div className={styles.time_item}></div>
          <div className={styles.time_item}>14:00 - 15:30</div>
          <div className={styles.time_item}>15:45 - 17:15</div>
          <div className={styles.time_item}>17:30 - 19:00</div>
        </div>

        {Array.from({ length: 7 }).map((weekday, i) => {
          return (
            <div className={styles.weekday_col}>
              {Array.from({ length: 7 }).map((weekdayItem, j) => {
                console.log("i,j", i, j, DATA[i][j]);

                return <div className={styles.weekday_item}>{DATA[i][j]}</div>;
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
