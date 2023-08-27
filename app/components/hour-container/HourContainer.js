import { addHours, setHours, setMinutes } from "date-fns";
import styles from "./hour-container.module.css";

const HourContainer = ({ name, day, children, onClick }) => {
  const [hours, minutes] = name.split(":").map(Number);
  const start = setMinutes(setHours(day, hours), minutes);

  const newEvent = () => {
    const newEvent = {
      type: "EVENT",
      name: "",
      start: start,
      end: addHours(start, 1),
      colour: "#039be5",
    };

    onClick(newEvent);
  };

  return (
    <div className={styles.hourContainer} onClick={() => newEvent()}>
      {children}
    </div>
  );
};

export default HourContainer;
