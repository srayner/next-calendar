import {
    isToday,
    isWithinInterval,
    startOfMonth,
    startOfWeek,
    format,
    endOfMonth,
    endOfWeek,
    eachDayOfInterval
} from 'date-fns';
import styles from "./page.module.css";

const MonthPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const days = eachDayOfInterval({
        start: startOfWeek(monthStart, {weekStartsOn: 1}),
        end: endOfWeek(monthEnd, {weekStartsOn: 1})
    });

    return (
        <div className={styles.monthView}>
        
            <div className={styles.weekDays}>
                {weekdays.map((weekday, index) => (
                    <div className={styles.weekdayContainer} key={index}>
                        <div className={styles.weekDayName}>{weekday}</div>
                    </div>
                ))}
            </div>

            <div className={styles.dayGrid}>
                {days.map((day, index) => (
                    <div className={styles.dayContainer} key={index}>
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
                    </div>
                ))}
            </div>

        </div>
            
        
    );

  }
  
  export default MonthPage;