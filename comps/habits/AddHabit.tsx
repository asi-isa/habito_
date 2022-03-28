import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoAdd } from "react-icons/io5";

import styles from "./AddHabit.module.css";

const ANIM_DUR = 0.6;
const ANIM_DUR_MS = ANIM_DUR * 1000;

export default function AddHabit() {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      className={styles.con}
      onClick={() => {
        setClicked(true);
        setTimeout(() => setClicked(false), ANIM_DUR_MS);
      }}
    >
      <motion.div
        animate={{
          width: clicked ? "40%" : "100%",
          borderRadius: clicked ? "3rem" : ".33rem",
        }}
        transition={{ duration: ANIM_DUR }}
        className={`${styles.inner_con} ${clicked && styles.inner_con_active}`}
      >
        <IoAdd size={33} />
      </motion.div>
    </div>
  );
}
