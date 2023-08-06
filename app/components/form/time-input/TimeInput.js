import { addHours, eachMinuteOfInterval, startOfDay } from 'date-fns';
import styles from './time-input.module.css';
import format from 'date-fns/format';
import { useState } from 'react';

const TimeInput = ({value}) => {

    const [date, setDate] = useState(value);
    const [dropped, setDropped] = useState(false);

    function toggleDropped() {
        setDropped(!dropped);
    }

    function handleBlur() {
        setDropped(false);
    }

    function handleSelect(newDate) {
        setDate(newDate);
        setDropped(false);
    }

    const caption = format(value, 'hh:mm');

    const startTime = startOfDay(date);
    const endTime = addHours(date, 1);
    const times = eachMinuteOfInterval(
        {start: startTime, end: endTime},
        {step: 15}
    );

    return (
        <button className={styles.container} onBlur={handleBlur}>
            <span className={styles.button} onClick={toggleDropped}>{caption}</span>
            {dropped &&
                <div className={styles.dropdownContainer}>
                    {times.map(time => {
                        return (<div>{format(time, 'hh:mm')}</div>);
                    })}
                </div>
            }
        </button>
    );
}

export default TimeInput;