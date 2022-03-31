import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./AddHabitForm.module.css";
import { IoClose } from "react-icons/io5";

interface AddHabitFormProps {
  setShowAddHabitForm: Dispatch<SetStateAction<boolean>>;
  showAddHabitForm: boolean;
  addHabit: (name: string) => void;
}

export default function AddHabitForm({
  setShowAddHabitForm,
  showAddHabitForm,
  addHabit,
}: AddHabitFormProps) {
  const [value, setValue] = useState("");

  return (
    <motion.div
      layoutId="form"
      transition={{ type: "spring", damping: 15 }}
      className={styles.con}
    >
      <div className={styles.inner_con}>
        <input
          className={styles.input}
          type="text"
          placeholder="my next habit..."
          value={value}
          onChange={({ target }) => setValue(target.value.trim())}
          required
          autoFocus
        />

        {showAddHabitForm && (
          <IoClose
            onClick={() => setShowAddHabitForm(false)}
            className={styles.close}
          />
        )}
      </div>

      <AnimatePresence>
        {value.trim() !== "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.cta}
            onClick={() => {
              addHabit(value);
              setValue("");
            }}
          >
            Add
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
