import Habits from "../comps/habits/Habits";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <section className={styles.con}>
      <div className={styles.pattern_1} />
      <div className={styles.pattern_2} />
      <div className={styles.pattern_3} />

      <div className={styles.inner_con}>
        <div className={styles.habits_con}>
          <Habits />
        </div>
      </div>
    </section>
  );
}
