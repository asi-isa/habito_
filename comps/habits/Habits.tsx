import React, { useState } from "react";
import isEqual from "../../utils/date/isEqual";
import isInList from "../../utils/date/isInList";
import Habit from "./Habit";

import styles from "./Habits.module.css";

const DATA = [
  { name: "meditate", dates: [new Date("2022-03-28"), new Date("2022-03-30")] },
  { name: "read", dates: [new Date("2022-04-01"), new Date("2022-04-02")] },
];

export default function Habits() {
  const [data, setData] = useState(DATA);

  function setDates(name: string) {
    return (day: Date) => {
      const data_ = [...data];
      const idx = data_.findIndex((data) => data.name === name);
      const habit = data_[idx];

      const isInList_ = isInList(day, habit.dates);

      if (isInList_) {
        habit.dates = habit.dates.filter((date) => !isEqual(day, date));
      } else {
        habit.dates = [...habit.dates, day];
      }

      setData(data_);
    };
  }

  return (
    <section className={styles.con}>
      {data.map((habit) => {
        return (
          <Habit
            {...habit}
            toggleActive={setDates(habit.name)}
            key={habit.name}
          />
        );
      })}
    </section>
  );
}
