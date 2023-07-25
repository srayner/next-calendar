'use client'

import Calendar from '../../../../components/calendar/Calendar';
import styles from './page.module.css';

const YearPage = (props) => {

  const { year, month, day } = props.params;
  const currentDate = new Date(year, month - 1, day);
  const currentYear = currentDate.getFullYear();
  
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

export default YearPage