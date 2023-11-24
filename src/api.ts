import axios from "axios";
import { startOfDay, startOfWeek, endOfDay, endOfWeek } from "date-fns";

axios.interceptors.response.use((response) => {
  function transformEvent(event) {
    event.start = new Date(event.start);
    event.end = new Date(event.end);
  }

  if (Array.isArray(response.data)) {
    response.data.map(transformEvent);
  } else if (typeof response.data === "object") {
    transformEvent(response.data);
  }

  return response;
});

export const getEventsForDay = async (day: Date) => {
  const response = await axios.get("/api/events", {
    params: {
      start: startOfDay(day),
      end: endOfDay(day),
    },
  });

  return response.data;
};

export const getEventsForWeek = async (day: Date) => {
  const response = await axios.get("/api/events", {
    params: {
      start: startOfWeek(day, { weekStartsOn: 1 }),
      end: endOfWeek(day, { weekStartsOn: 1 }),
    },
  });

  return response.data;
};

export const createEvent = async (event, onCreated) => {
  const response = await axios.post("/api/events", {
    ...event,
  });

  if (typeof onCreated === "function") {
    onCreated(response.data);
  }
};

export const updateEvent = async (event, onUpdate) => {
  const response = await axios.put("/api/events", {
    ...event,
  });

  if (typeof onUpdate === "function") {
    onUpdate(response.data);
  }
};
