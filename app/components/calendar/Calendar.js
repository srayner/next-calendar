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

const Calendar = () => {
  const [month, setMonth] = useState(new Date())

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
      <div className={styles.title}>
        <div className={styles.monthName}>{format(month, "MMMM yyyy")}</div>
        <FontAwesomeIcon className={styles.button} icon={faChevronLeft} onClick={prev}/>
        <FontAwesomeIcon className={styles.button} icon={faChevronRight} onClick={next} />
      </div>
      <div className={styles.dayGrid}>

        {weekdays.map((weekday, index) => (
          <div className={styles.weekDay} key={index}>{weekday}</div>
        ))}

        {days.map((day, index) => (
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
        ))}
      </div>
    </div>
  )
}

export default Calendar
