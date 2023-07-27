'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import styles from './days.module.css';

const DayPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);

    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(i.toString().padStart(2, '0') + ':00');
    }

    return (
        <div className={styles.dayView}>
            <WeekDays date={currentDate} singleDay/>
            <div className={styles.hours}>
                <div className={styles.topRow} key="-1">
                    <div className={styles.hour}></div>
                    <div className={styles.hourLine}></div>
                    <div className={styles.hourContainer}></div>
                </div>

                {hours.map((hour, index) => (
                    <div className={styles.row} key={index}>
                        <div className={styles.hour}>{hour}</div>
                        <div className={styles.hourLine}></div>
                        <div className={styles.hourContainer}></div>
                    </div>
                ))}
            </div>
        </div>
    );

  }
  
  export default DayPage;