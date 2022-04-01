import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import { IoAddCircle, IoClose } from "react-icons/io5";

import styles from "./CalendarItem.module.css";
import { EventType } from "./Calendar";

const COLORS: { color: string; labelName: string }[] = [
  { color: "#E2E3E5", labelName: "normal" },
  { color: "#D1E7DD", labelName: "priority" },
  { color: "#CFE2FF", labelName: "attention" },
  { color: "#F8D7DA", labelName: "important" },
];

interface CalendarItemProps {
  data: EventType[][];
  setData: Dispatch<SetStateAction<EventType[][]>>;
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
  const [showFormContent, setShowFormContent] = useState(false);

  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (clicked) {
      // weil sonst die Animation springy wird
      setTimeout(() => setShowFormContent(true), ANIM_DUR_MS - 210);
    }
  }, [clicked]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const title = (e.currentTarget.elements[0] as HTMLInputElement).value;

    const label = COLORS[selectedIdx];

    const data_ = [...DATA];

    data_[i][j] = { title, label };

    setData(data_);
  }

  return (
    <div className={styles.weekday_item}>
      {DATA[i][j] ? (
        <div
          className={styles.event}
          style={{ backgroundColor: DATA[i][j].label.color }}
        >
          {DATA[i][j].title}
        </div>
      ) : !clicked ? (
        <motion.div
          layoutId="addEvent"
          initial={{
            opacity: 0,
            width: "100%",
            height: "100%",
          }}
          whileHover={{
            opacity: 0.99,
            backgroundColor: "rgba(51, 51, 51,0.98)",
            borderRadius: ".5rem",
          }}
          transition={{
            duration: 0.5,
            backgroundColor: { duration: 0 },
            position: { delay: 0.6 },
          }}
          className={styles.add_btn}
          onClick={() => setClicked(true)}
        >
          <IoAddCircle size={42} color="#eee" />
        </motion.div>
      ) : (
        <motion.div
          layoutId="addEvent"
          animate={{
            opacity: 1,
            backgroundColor: "rgba(51, 51, 51,0.99)",
            border: "1px solid #333",
            borderRadius: ".6rem",
            width: "21rem",
            height: "21rem",
            // padding: ".33rem",
            position: "absolute",
            zIndex: 99,
          }}
          className={styles.add_event_form}
        >
          {clicked && showFormContent && (
            <form onSubmit={onSubmit} className={styles.add_event_form_content}>
              <IoClose
                onClick={() => setClicked(false)}
                size={21}
                className={styles.close_form}
              />

              <input
                type="text"
                placeholder="event..."
                autoFocus
                className={styles.input}
              />

              <div className={styles.colors}>
                {COLORS.map(({ color, labelName }, idx) => {
                  return (
                    <div
                      key={color}
                      className={styles.color_con}
                      onClick={() => setSelectedIdx(idx)}
                    >
                      <div
                        className={styles.color_inner}
                        style={{
                          backgroundColor: color,
                        }}
                      >
                        {selectedIdx === idx && (
                          <motion.div
                            layoutId="outerCircle"
                            className={styles.color_outer}
                            style={{
                              border: `2px solid ${color}`,
                            }}
                          />
                        )}
                        {labelName}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className={styles.submit}>Add</button>
            </form>
          )}
        </motion.div>
      )}
    </div>
  );
}
