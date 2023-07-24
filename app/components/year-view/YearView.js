'use client'

import Calendar from '../calendar/Calendar'
import styles from './year-view.module.css'

const YearView = () => {
  
  const currentYear = new Date().getFullYear();

  let months = [];
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    months.push(new Date(currentYear, monthIndex));
  }
  
  return (
    <div className={styles.yearView}>
      {months.map((month, index) => (
        <Calendar key={index} startingMonth={month} />
      ))}
    </div>
  )

}

export default YearView;