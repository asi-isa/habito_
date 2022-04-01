import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CustomValueType, motion } from "framer-motion";
import { IoAddCircle, IoClose } from "react-icons/io5";

import styles from "./CalendarItem.module.css";

interface CalendarItemProps {
  data: string[][];
  setData: Dispatch<SetStateAction<string[][]>>;
  i: number;
  j: number;
}

const ANIM_DUR = 0.42;
const ANIM_DUR_MS = ANIM_DUR * 1000;

export default function CalendarItem({
  i,
  j,
  data: DATA,
  setData,
}: CalendarItemProps) {
  const [clicked, setClicked] = useState(false);
  const [closed, setClosed] = useState(false);

  // console.log("clicked", clicked);

  // useEffect(() => {
  //   if (!clicked) {
  //     setClosed(true);
  //   }
  // }, [clicked]);

  function onClick(i: number, j: number) {
    setClicked(true);

    console.log(i, j);
  }

  return (
    <div
      className={styles.weekday_item}
      // style={{
      //   overflow: clicked ? "initial" : "hidden",
      // }}
    >
      {DATA[i][j] ? (
        DATA[i][j]
      ) : !clicked ? (
        <motion.div
          layoutId="addEvent"
          initial={{
            opacity: 0,
            width: "100%",
            height: "100%",
            // backgroundColor: "rgba(51, 51, 51,0.98)",
          }}
          whileHover={{
            opacity: 0.99,
            backgroundColor: "rgba(51, 51, 51,0.98)",
            borderRadius: ".5rem",
          }}
          transition={{
            duration: 0.5,
            backgroundColor: { duration: 0 },
            position: { delay: ANIM_DUR + 0.1 },
          }}
          className={styles.add_btn}
          onClick={() => onClick(i, j)}
        >
          <IoAddCircle size={42} color="#eee" />
        </motion.div>
      ) : (
        <motion.div
          layoutId="addEvent"
          animate={{
            opacity: 1,
            backgroundColor: "rgba(238, 238, 238,1)",
            border: "1px solid #333",
            borderRadius: ".5rem",
            width: "15vw",
            height: "15vw",
            position: "absolute",
            zIndex: 99,
          }}
        >
          <IoClose
            onClick={() => {
              setClicked(false);
              console.log("clicked");
            }}
            size={21}
            style={{ zIndex: 999 }}
          />
        </motion.div>
      )}
    </div>
  );
}
