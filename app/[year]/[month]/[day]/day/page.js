'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import styles from './days.module.css';
import { format } from 'date-fns';
import { filterEventsByDate } from '../../../../data/events.js';
import { populateHours } from '@/src/events';

const DayPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    const dayName = format(currentDate, 'ddd');

    const hours = [];
    for (let i = 0; i < 24; i++) {
        const name = i.toString().padStart(2, '0') + ':00';
        let hour = {name: name};
        hour[dayName] = {events: []};   
        hours.push(hour);
    }

    const events = filterEventsByDate(currentDate);
    populateHours(hours, dayName, events);
    
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
                        <div className={styles.hour}>{hour.name}</div>
                        <div className={styles.hourLine}></div>
                        <div className={styles.hourContainer}>
                            {hour[dayName].events.map((event) => (
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
                    </div>
                ))}
            </div>
        </div>
    );

  }
  
  export default DayPage;