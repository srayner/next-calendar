'use client'

import { useState } from 'react'
import {
  addMonths,
  isToday,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  format,
  endOfMonth,
  endOfWeek,
  subMonths,
  eachDayOfInterval
} from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import styles from './calendar.module.css'

const Calendar = (props) => {
  const [month, setMonth] = useState(props.startingMonth)

  const prev = () => {
    setMonth(subMonths(month, 1)) 
  }

  const next = () => {
    setMonth(addMonths(month, 1)) 
  }
  
  const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const monthStart = startOfMonth(month)
  const monthEnd = endOfMonth(month)
  const days = eachDayOfInterval({
    start: startOfWeek(monthStart, {weekStartsOn: 1}),
    end: endOfWeek(monthEnd, {weekStartsOn: 1})
  });

  return (
    <div className={styles.calendar}>

      {/* Title */}
      <div className={styles.title}>
        <div className={styles.monthName}>{format(month, "MMMM yyyy")}</div>
        {props.showNav && <FontAwesomeIcon className={styles.button} icon={faChevronLeft} onClick={prev} />}
        {props.showNav && <FontAwesomeIcon className={styles.button} icon={faChevronRight} onClick={next} />}
      </div>

      {/* Weekdays */}
      <div className={styles.weekdayGrid}>
        {weekdays.map((weekday, index) => (
          <div className={styles.weekdayContainer}>
            <div className={styles.weekDay} key={index}>{weekday}</div>
          </div>
        ))}
      </div>

      {/* Days */}
      <div className={styles.dayGrid}>
        {days.map((day, index) => (
          <div className={styles.dayContainer}>
            <div
              className={`
                ${styles.day}
                ${isToday(day) ? styles.today : ''}
                ${isWithinInterval(day, {start: monthStart, end: monthEnd}) ? styles.currentMonth : ''}
              `}
              key={index}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Calendar
