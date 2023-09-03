"use client";

import WeekDays from "@/app/components/week-days/WeekDays";
import Event from "@/app/components/event/Event";
import { useRouter } from "next/navigation";
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { moveEvent, populateHours } from "@/src/events";
import { initHours } from "@/src/hours";
import { getEventsForWeek } from "@/src/api";
import { useEffect, useState } from "react";
import { filterEventsByDate } from "@/src/events";
import { ModalContext } from "@/app/layout";
import { useContext } from "react";
import HourContainer from "@/app/components/hour-container/HourContainer";
import { updateEvent } from "@/src/api";
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

  function handleOnDrag(e, event) {
    e.dataTransfer.setData("text/plain", event);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleOnDrop(e, hourName, day) {
    const eventId = e.dataTransfer.getData("text/plain");
    const event = events.find((event) => event.id === eventId);

    // we need to combine the day and the hours.
    // It would be good to refactor so that we get a Date object that has the time set correctly.
    const [newHours, newMinutes] = hourName.split(":").map(Number);
    const newStart = new Date(day);
    newStart.setHours(newHours);
    newStart.setMinutes(newMinutes);
    const updatedEvent = moveEvent(event, newStart);
    updateEvent(updatedEvent, eventUpdated);
  }

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
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
              >
                {hour[format(day, "EEE")].events.map((event, index) => (
                  <Event
                    event={event}
                    key={index}
                    onClick={editEvent}
                    draggable
                    onDragStart={handleOnDrag}
                  />
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
