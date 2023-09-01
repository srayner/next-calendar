"use client";

import Calendar from "../calendar/Calendar";
import styles from "./side-bar.module.css";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { useRouter } from "next/navigation";
import { addHours, format, roundToNearestMinutes, startOfDay } from "date-fns";
import DropDown from "../drop-down/DropDown";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { ModalContext } from "@/app/layout";
import { useContext, useEffect, useState } from "react";

const SideBar = () => {
  const router = useRouter();
  const { year, month, day } = useParams();
  const { openModal } = useContext(ModalContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (year && month && day) {
      setSelectedDate(new Date(year, month - 1, day));
    }
  }, [year, month, day]);

  const segments = useSelectedLayoutSegments();
  const viewName = segments[segments.length - 1];

  const handleDateChange = (date) => {
    const url = "/" + format(date, "yyyy/MM/dd") + "/" + viewName;
    router.push(url);
  };

  const handleCreate = (type) => {
    const now = new Date();
    const start = roundToNearestMinutes(now, {
      nearestTo: 15,
      roundingMethod: "ceil",
    });
    const end = addHours(start, 1);
    const newEvent = {
      type,
      name: "",
      start: start,
      end: end,
      colour: "#039be5",
    };
    openModal(newEvent);
  };

  const items = [
    { caption: "Event", shortcut: "E", value: "EVENT" },
    { caption: "Task", shortcut: "T", value: "TASK" },
  ];

  return (
    <div className={styles.sideBar}>
      <DropDown
        type={"primary"}
        items={items}
        caption="Create"
        icon={faCaretDown}
        menuAligned="left"
        onSelected={(data) => handleCreate(data)}
      />
      <Calendar
        date={selectedDate}
        onSelect={handleDateChange}
        showNav
        showSelected
      />
    </div>
  );
};

export default SideBar;
