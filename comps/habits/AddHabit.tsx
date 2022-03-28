import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoAdd } from "react-icons/io5";

import styles from "./AddHabit.module.css";

const ANIM_DUR = 0.42;
const ANIM_DUR_MS = ANIM_DUR * 1000;

interface AddHabitProps {
  setShowAddHabitForm: Dispatch<SetStateAction<boolean>>;
  showAddHabitForm: boolean;
}

export default function AddHabit({
  setShowAddHabitForm,
  showAddHabitForm,
}: AddHabitProps) {
  const [clicked, setClicked] = useState(false);
  const [showAddButton, setShowAddButton] = useState(true);

  useEffect(() => {
    if (!showAddHabitForm) {
      setTimeout(() => setShowAddButton(true), 500);
    } else {
      setShowAddButton(false);
    }
  }, [showAddHabitForm]);

  return (
    <motion.div
      layoutId="form"
      animate={{ opacity: showAddHabitForm ? 0 : 1 }}
      className={styles.con}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), ANIM_DUR_MS);
        setTimeout(() => setShowAddHabitForm(true), ANIM_DUR_MS * 2);
      }}
    >
      <motion.div
        animate={{
          width: clicked ? "50%" : "100%",
          borderRadius: clicked ? "3rem" : ".33rem",
        }}
        transition={{ duration: ANIM_DUR }}
        className={`${styles.inner_con} ${clicked && styles.inner_con_active}`}
      >
        {showAddButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <IoAdd size={33} />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
