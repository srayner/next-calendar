import { addHours, eachMinuteOfInterval, startOfDay } from 'date-fns';
import styles from './time-input.module.css';
import {format, isEqual} from 'date-fns';
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

    const caption = format(date, 'HH:mm');

    const startTime = startOfDay(date);
    const endTime = addHours(date, 1);
    const times = eachMinuteOfInterval(
        {start: startTime, end: endTime},
        {step: 15}
    );

    return (
        <button className={styles.container} onBlur={handleBlur} type="button">
            <span className={styles.button} onClick={toggleDropped}>{caption}</span>
            {dropped &&
                <div className={styles.dropdownContainer}>
                    {times.map((time, index) => {
                        return (
                            <div
                                key={index}
                                className={styles.listItem}
                                onClick={e => handleSelect(time)}
                                ref={(element) => {
                                    if (isEqual(time, date) && element) {
                                      element.scrollIntoView({ behavior: 'instant', block: 'start' });
                                    }
                                }}
                            >
                                {format(time, 'HH:mm')}
                            </div>
                        );
                    })}
                </div>
            }
        </button>
    );
}

export default TimeInput;