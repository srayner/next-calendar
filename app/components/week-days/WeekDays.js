import { eachDayOfInterval, endOfWeek, format, isToday, startOfWeek } from 'date-fns';
import styles from './week-days.module.css';

const WeekDays = (props) => {

    let days;
    if (props.singleDay) {
        days = [props.date]
    } else {
        days = eachDayOfInterval({
            start: startOfWeek(props.date, {weekStartsOn: 1}),
            end: endOfWeek(props.date, {weekStartsOn: 1})
        });
    }

    return (
        <div className={styles.weekDays}>
            {days.map((day, index) => (
                <div className={styles.weekDayContainer} key={index} onClick={() => props.onClick(day)}>
                    <div className={styles.weekDayName}>{format(day, 'EEE')}</div>
                    <div className={`
                        ${styles.weekDay}
                        ${isToday(day) ? styles.today : ''}
                        ${props.singleDay ? styles.disableHover : ''}
                    `}>{format(day, 'd')}</div>
                </div>
            ))}
        </div>
    )
}

export default WeekDays;
