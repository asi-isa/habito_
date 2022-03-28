import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

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
  return (
    <motion.form
      layoutId="form"
      transition={{ type: "spring", damping: 15 }}
      className={styles.con}
    >
      {showAddHabitForm && (
        <IoClose onClick={() => setShowAddHabitForm(false)} />
      )}

      <input className={styles.input} type="text" />
    </motion.form>
  );
}
