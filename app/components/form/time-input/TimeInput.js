import {
  addMinutes,
  eachMinuteOfInterval,
  format,
  isEqual,
  startOfDay,
} from "date-fns";
import styles from "./time-input.module.css";
import { useState } from "react";

const TimeInput = ({ name, value, onSelect }) => {
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

  const caption = format(value, "HH:mm");

  const startTime = startOfDay(value);
  const endTime = addMinutes(startTime, 1425);
  const times = eachMinuteOfInterval(
    { start: startTime, end: endTime },
    { step: 15 }
  );

  return (
    <button className={styles.container} onBlur={handleBlur} type="button">
      <span className={styles.button} onClick={toggleDropped}>
        {caption}
      </span>
      {dropped && (
        <div className={styles.dropdownContainer}>
          {times.map((time, index) => {
            return (
              <div
                key={index}
                className={styles.listItem}
                onClick={(e) => handleSelect(time)}
                ref={(element) => {
                  if (isEqual(time, value) && element) {
                    element.scrollIntoView({
                      behavior: "instant",
                      block: "start",
                    });
                  }
                }}
              >
                {format(time, "HH:mm")}
              </div>
            );
          })}
        </div>
      )}
    </button>
  );
};

export default TimeInput;
