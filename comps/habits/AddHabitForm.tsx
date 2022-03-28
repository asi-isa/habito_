import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./AddHabitForm.module.css";
import { IoClose } from "react-icons/io5";

interface AddHabitFormProps {
  setShowAddHabitForm: Dispatch<SetStateAction<boolean>>;
  showAddHabitForm: boolean;
}

export default function AddHabitForm({
  setShowAddHabitForm,
  showAddHabitForm,
}: AddHabitFormProps) {
  const [value, setValue] = useState("");
  const [showAddBTN, setShowAddBTN] = useState(false);

  return (
    <motion.form
      layoutId="form"
      transition={{ type: "spring", damping: 15 }}
      className={styles.con}
      onSubmit={(e) => {
        e.preventDefault();
        // console.log(Array.from(e.currentTarget.elements)[0]);
      }}
    >
      <div className={styles.inner_con}>
        <input
          className={styles.input}
          type="text"
          placeholder="my next habit..."
          value={value}
          onChange={({ target }) => setValue(target.value.trim())}
          required
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
          <motion.input
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            type="submit"
            value="Add"
            className={styles.cta}
            onClick={() => {}}
          />
        )}
      </AnimatePresence>
    </motion.form>
  );
}
