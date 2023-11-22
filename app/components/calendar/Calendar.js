"use client";

import { useState } from "react";
import {
  addMonths,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  format,
  endOfMonth,
  endOfWeek,
  subMonths,
  eachDayOfInterval,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import styles from "./calendar.module.css";

const Calendar = ({ date, onSelect, showNav, showSelected }) => {
  const [month, setMonth] = useState(date);

  useEffect(() => {
    setMonth(new Date(date));
  }, [date]);

  const prev = () => {
    setMonth(subMonths(month, 1));
  };

  const next = () => {
    setMonth(addMonths(month, 1));
  };

  const weekdays = ["M", "T", "W", "T", "F", "S", "S"];
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 1 }),
    end: endOfWeek(monthEnd, { weekStartsOn: 1 }),
  });

  return (
    <div className={styles.calendar}>
      {/* Title */}
      <div className={styles.title}>
        <div className={styles.monthName}>{format(month, "MMMM yyyy")}</div>
        {showNav && (
          <FontAwesomeIcon
            className={styles.button}
            icon={faChevronLeft}
            onClick={prev}
          />
        )}
        {showNav && (
          <FontAwesomeIcon
            className={styles.button}
            icon={faChevronRight}
            onClick={next}
          />
        )}
      </div>

      {/* Weekdays */}
      <div className={styles.weekdayGrid}>
        {weekdays.map((weekday, index) => (
          <div className={styles.weekdayContainer} key={index}>
            <div className={styles.weekDay}>{weekday}</div>
          </div>
        ))}
      </div>

      {/* Days */}
      <div className={styles.dayGrid}>
        {days.map((day, index) => (
          <div
            className={styles.dayContainer}
            key={index}
            onClick={
              typeof onSelect === "function" ? () => onSelect(day) : null
            }
          >
            <div
              className={`
                ${styles.day}
                ${isToday(day) ? styles.today : ""}
                ${isSameDay(day, date) && showSelected ? styles.selected : ""}
                ${
                  isWithinInterval(day, { start: monthStart, end: monthEnd })
                    ? styles.currentMonth
                    : ""
                }
              `}
              key={index}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
