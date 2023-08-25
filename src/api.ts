import axios from "axios";
import { startOfDay, endOfDay } from "date-fns";

export const getEventsForDay = async (day: Date) => {
  const response = await axios.get("/api/events", {
    params: {
      start: startOfDay(day),
      end: endOfDay(day),
    },
  });

  return response.data;
};

export const createEvent = async (event) => {
  const response = await axios.post("/api/events", {
    ...event,
  });

  return response.data;
};
