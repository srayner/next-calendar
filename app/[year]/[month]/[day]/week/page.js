'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import { useRouter } from 'next/navigation';
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import { filterEventsByDate } from '@/src/local-storage';
import styles from './page.module.css';
import { populateHours } from '@/src/events';

const WeekPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    
    const router = useRouter();

    const clickHandler = (day) => {
        router.push(format(day, '/yyyy/MM/dd') + '/day');
    }

    const days = eachDayOfInterval({
        start: startOfWeek(currentDate, {weekStartsOn: 1}),
        end: endOfWeek(currentDate, {weekStartsOn: 1})
    });

    const hours = [];
    for (let i = 0; i < 24; i++) {
        const name = i.toString().padStart(2, '0') + ':00'; 
        let hour = {name: name};
        days.map((day) => {
            const dayName = format(day, 'ddd');
            hour[dayName] = {events: []};
        });
        hours.push(hour);
    }

    days.map((day) => {
        const events = filterEventsByDate(day);
        const dayName = format(day, 'ddd');
        populateHours(hours, dayName, events);
    });

    return (
        <div className={styles.weekView}>
            <WeekDays date={currentDate} onClick={clickHandler}/>
            <div className={styles.hours}>
                <div className={styles.topRow} key="-1">
                    <div className={styles.hour}></div>
                    <div className={styles.hourLine}></div>
                    {days.map((day, index) => (
                        <div className={styles.hourContainer} key={index}></div>
                    ))}
                </div>

                {hours.map((hour, index) => (
                    <div className={styles.row} key={index}>
                        <div className={styles.hour}>{hour.name}</div>
                        <div className={styles.hourLine}></div>
                        {days.map((day, index) => (
                            <div key={index} className={styles.hourContainer}>
                                {hour[format(day, 'ddd')].events.map((event, index) => (
                                    <div
                                        key={index}
                                        className={styles.event}
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
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );

  }
  
  export default WeekPage;