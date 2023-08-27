"use client";

import WeekDays from "@/app/components/week-days/WeekDays";
import Event from "@/app/components/event/Event";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { populateHours } from "@/src/events";
import { initHours } from "@/src/hours";
import { getEventsForWeek } from "@/src/api";
import { useEffect, useState } from "react";
import { filterEventsByDate } from "@/src/events";
import { ModalContext } from "@/app/layout";
import { useContext } from "react";
import HourContainer from "@/app/components/hour-container/HourContainer";
import styles from "./page.module.css";

const WeekPage = ({ params }) => {
  const { year, month, day } = params;
  const currentDate = new Date(year, month - 1, day);

  const [events, setEvents] = useState([]);
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    getEventsForWeek(currentDate).then((eventsFromServer) => {
      setEvents(eventsFromServer);
    });
  }, []);

  const router = useRouter();

  const dayClickHandler = (day) => {
    router.push(format(day, "/yyyy/MM/dd") + "/day");
  };

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

  const days = eachDayOfInterval({
    start: startOfWeek(currentDate, { weekStartsOn: 1 }),
    end: endOfWeek(currentDate, { weekStartsOn: 1 }),
  });

  const hours = initHours(days);

  days.map((day) => {
    populateHours(hours, day, filterEventsByDate(day, events));
  });

  return (
    <div className={styles.weekView}>
      <WeekDays date={currentDate} onClick={dayClickHandler} />
      <div className={styles.hours}>
        <div className={styles.topRow} key="-1">
          <div className={styles.hour}></div>
          <div className={styles.hourLine}></div>
          {days.map((day, index) => (
            <div className={styles.hourContainer} key={index}></div>
          ))}
        </div>

        {hours.map((hour, index) => (
          <div className={styles.row} key={index}>
            <div className={styles.hour}>{hour.name}</div>
            <div className={styles.hourLine}></div>
            {days.map((day, index) => (
              <HourContainer
                key={index}
                name={hour.name}
                day={day}
                onClick={editEvent}
              >
                {hour[format(day, "EEE")].events.map((event, index) => (
                  <Event event={event} key={index} onClick={editEvent} />
                ))}
              </HourContainer>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekPage;
