"use client";

import WeekDays from "@/app/components/week-days/WeekDays";
import Event from "@/app/components/event/Event";
import { format } from "date-fns";
import { initHours } from "@/src/hours";
import { populateHours } from "@/src/events";
import { getEventsForDay } from "@/src/api";
import styles from "./days.module.css";
import { useEffect, useState } from "react";

const DayPage = (props) => {
  const { year, month, day } = props.params;
  const currentDate = new Date(year, month - 1, day);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsForDay(currentDate).then((eventsFromServer) => {
      setEvents(eventsFromServer);
    });
  }, []);

  const days = [currentDate];
  const hours = initHours(days);

  populateHours(hours, currentDate, events);

  return (
    <div className={styles.dayView}>
      <WeekDays date={currentDate} singleDay />
      <div className={styles.hours}>
        <div className={styles.topRow} key="-1">
          <div className={styles.hour}></div>
          <div className={styles.hourLine}></div>
          <div className={styles.hourContainer}></div>
        </div>

        {hours.map((hour, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.hour}>{hour.name}</div>
            <div className={styles.hourLine}></div>
            <div className={styles.hourContainer}>
              {hour[format(currentDate, "EEE")].events.map((event, index) => (
                <Event event={event} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayPage;
