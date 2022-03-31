import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BsTrash } from "react-icons/bs";

import styles from "./Habits.module.css";
import HabitHeader from "./HabitHeader";
import AddHabitForm from "./AddHabitForm";
import Habit from "./Habit";
import isInList from "../../utils/date/isInList";
import isEqual from "../../utils/date/isEqual";

const DATA = [
  { name: "meditate", dates: [new Date("2022-03-28"), new Date("2022-03-30")] },
  { name: "read", dates: [new Date("2022-04-01"), new Date("2022-04-02")] },
];

export default function Habits() {
  const [data, setData] = useState(DATA);

  const [showAddHabitForm, setShowAddHabitForm] = useState(false);
  const [showRemoveHabitCon, setShowRemoveHabitCon] = useState(false);

  function addHabit(name: string) {
    setData((cV) => [...cV, { name, dates: [] }]);
  }

  function handleOnDragEnd(result: DropResult) {
    // console.log(result);

    if (!result.destination) return;

    const items = [...data];

    // delete
    if (result.destination.droppableId === "delete") {
      items.splice(result.source.index, 1);
    }
    // reorder
    else {
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
    }

    setData(items);
    setShowRemoveHabitCon(false);
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
        onDragStart={() => {
          setShowAddHabitForm(false);
          setShowRemoveHabitCon(true);
        }}
      >
        <Droppable droppableId="habits">
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
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        <Droppable droppableId="delete">
          {(provided) => (
            <div
              className={styles.delete_con}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <AnimatePresence>
                {showRemoveHabitCon && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={styles.delete}
                  >
                    <BsTrash color="#750550" size={21} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
