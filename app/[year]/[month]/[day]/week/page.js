'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import styles from './page.module.css';

const WeekPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    
    const router = useRouter();

    const clickHandler = (day) => {
        router.push(format(day, '/yyyy/MM/dd') + '/day');
    }

    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(i.toString().padStart(2, '0') + ':00');
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div className={styles.weekView}>
            <WeekDays date={currentDate} onClick={clickHandler}/>
            <div className={styles.hours}>
                <div className={styles.topRow} key="-1">
                    <div className={styles.hour}></div>
                    <div className={styles.hourLine}></div>
                    {days.map((day) => (
                        <div className={styles.hourContainer}></div>
                    ))}
                </div>

                {hours.map((hour, index) => (
                    <div className={styles.row} key={index}>
                        <div className={styles.hour}>{hour}</div>
                        <div className={styles.hourLine}></div>
                        {days.map((day) => (
                            <div className={styles.hourContainer}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

  }
  
  export default WeekPage;