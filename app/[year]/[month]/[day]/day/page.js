'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import { filterEventsByDate } from '@/src/local-storage';
import { initHours } from '@/src/hours';
import { populateHours } from '@/src/events';
import styles from './days.module.css';

const DayPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    
    const days = [currentDate];
    const hours = initHours(days);
    const events = filterEventsByDate(currentDate);
    populateHours(hours, currentDate, events);
    
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
                                        top: event.position.top,
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