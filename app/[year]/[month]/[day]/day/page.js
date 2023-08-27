"use client";

import WeekDays from "@/app/components/week-days/WeekDays";
import Event from "@/app/components/event/Event";
import { format } from "date-fns";
import { initHours } from "@/src/hours";
import { populateHours } from "@/src/events";
import { getEventsForDay } from "@/src/api";
import { useEffect, useState } from "react";
import { ModalContext } from "@/app/layout";
import { useContext } from "react";
import HourContainer from "@/app/components/hour-container/HourContainer";
import styles from "./days.module.css";

const DayPage = (props) => {
  const { year, month, day } = props.params;
  const currentDate = new Date(year, month - 1, day);

  const [events, setEvents] = useState([]);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    getEventsForDay(currentDate).then((eventsFromServer) => {
      setEvents(eventsFromServer);
    });
  }, []);

  const eventUpdated = (updatedEvent) => {
    setEvents((prevEvents) => {
      const existingIndex = prevEvents.findIndex(
        (event) => event.id === updatedEvent.id
      );

      if (existingIndex === -1) {
        return [...prevEvents, updatedEvent];
      }

      return [
        ...prevEvents.slice(0, existingIndex),
        updatedEvent,
        ...prevEvents.slice(existingIndex + 1),
      ];
    });
  };

  const editEvent = (event) => {
    openModal(event, eventUpdated);
  };

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
            <HourContainer
              name={hour.name}
              day={currentDate}
              onClick={editEvent}
            >
              {hour[format(currentDate, "EEE")].events.map((event, index) => (
                <Event event={event} key={index} onClick={editEvent} />
              ))}
            </HourContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayPage;
