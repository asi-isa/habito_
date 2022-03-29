import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import styles from "./Habits.module.css";
import HabitHeader from "./HabitHeader";
import AddHabitForm from "./AddHabitForm";
import Habit from "./Habit";
import isInList from "../../utils/date/isInList";
import isEqual from "../../utils/date/isEqual";
import { motion } from "framer-motion";

const DATA = [
  { name: "meditate", dates: [new Date("2022-03-28"), new Date("2022-03-30")] },
  { name: "read", dates: [new Date("2022-04-01"), new Date("2022-04-02")] },
];

export default function Habits() {
  const [data, setData] = useState(DATA);

  const [showAddHabitForm, setShowAddHabitForm] = useState(false);

  function addHabit(name: string) {
    setData((cV) => [...cV, { name, dates: [] }]);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = [...data];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  }

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
    <div className={styles.con}>
      <HabitHeader
        setShowAddHabitForm={setShowAddHabitForm}
        showAddHabitForm={showAddHabitForm}
      />

      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={() => setShowAddHabitForm(false)}
      >
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className={styles.habits}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map((habit, index) => {
                return (
                  <Draggable
                    key={`${habit.name}-${index}`}
                    draggableId={`${habit.name}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        key={habit.name}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Habit {...habit} toggleActive={setDates(habit.name)} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {/* {provided.placeholder} */}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {showAddHabitForm && (
        <AddHabitForm
          setShowAddHabitForm={setShowAddHabitForm}
          showAddHabitForm={showAddHabitForm}
          addHabit={addHabit}
        />
      )}
    </div>
  );
}
