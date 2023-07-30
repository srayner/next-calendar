'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { filterEventsByDate } from '../../../../data/events.js';
import styles from './page.module.css';
import { populateHours } from '@/src/events';

const WeekPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    
    const router = useRouter();

    const clickHandler = (day) => {
        router.push(format(day, '/yyyy/MM/dd') + '/day');
    }

    const hours = [];
    for (let i = 0; i < 24; i++) {
        const name = i.toString().padStart(2, '0') + ':00'; 
        hours.push({name: name, events: []});
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const events = filterEventsByDate(currentDate);
    populateHours(hours, events);

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
                        <div className={styles.hour}>{hour.name}</div>
                        <div className={styles.hourLine}></div>
                        {days.map((day) => (
                            <div className={styles.hourContainer}>
                                {hour.events.map((event) => (
                                    <div
                                        class={styles.event}
                                        style={{
                                            height: event.position.height,
                                            left: event.position.left,
                                            right: event.position.right,
                                            paddingTop: event.position.height <= 15 ? 0 : '4px',
                                            paddingBottom: event.position.height <= 15 ? 0 : '4px',
                                            color: event.color === 'light' ? 'var(--textLight)' : 'var(--textNeutral)',
                                            backgroundColor: event.backgroundColor

                                        }}
                                    >
                                        {event.name}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

  }
  
  export default WeekPage;