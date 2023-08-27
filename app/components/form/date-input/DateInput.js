import styles from "./date-input.module.css";
import format from "date-fns/format";
import { useState } from "react";
import Calendar from "../../calendar/Calendar";

const DateInput = ({ name, value, onSelect }) => {
  const [dropped, setDropped] = useState(false);

  function toggleDropped() {
    setDropped(!dropped);
  }

  function handleBlur() {
    setDropped(false);
  }

  function handleSelect(newDate) {
    setDropped(false);
    onSelect(name, newDate);
  }

  const caption = format(value, "EEEE, dd MMMM");

  return (
    <button className={styles.container} onBlur={handleBlur} type="button">
      <span className={styles.button} onClick={toggleDropped}>
        {caption}
      </span>
      {dropped && (
        <div className={styles.dropdownContainer}>
          <Calendar date={value} onSelect={handleSelect} showNav />
        </div>
      )}
    </button>
  );
};

export default DateInput;
