import axios from "axios";
import { startOfDay, startOfWeek, endOfDay, endOfWeek } from "date-fns";

export const getEventsForDay = async (day: Date) => {
  const response = await axios.get("/api/events", {
    params: {
      start: startOfDay(day),
      end: endOfDay(day),
    },
  });

  return convertEvents(response.data);
};

export const getEventsForWeek = async (day: Date) => {
  const response = await axios.get("/api/events", {
    params: {
      start: startOfWeek(day, { weekStartsOn: 1 }),
      end: endOfWeek(day, { weekStartsOn: 1 }),
    },
  });

  return convertEvents(response.data);
};

export const createEvent = async (event, onCreated) => {
  const response = await axios.post("/api/events", {
    ...event,
  });

  if (typeof onCreated === "function") {
    onCreated(convertEvent(response.data));
  }
};

export const updateEvent = async (event, onUpdate) => {
  const response = await axios.put("/api/events", {
    ...event,
  });

  if (typeof onUpdate === "function") {
    onUpdate(convertEvent(response.data));
  }
};

function convertEvents(events) {
  return events.map((event) => convertEvent(event));
}

function convertEvent(event) {
  return {
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  };
}
