import styles from './date-input.module.css';
import format from 'date-fns/format';
import { useState } from 'react';
import Calendar from '../../calendar/Calendar';

const DateInput = ({name, value, onSelect}) => {

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
        onSelect(name, newDate);
    }

    const caption = format(date, 'EEEE, dd MMMM');

    return (
        <button className={styles.container} onBlur={handleBlur} type="button">
            <span className={styles.button} onClick={toggleDropped}>{caption}</span>
            {dropped &&
                <div className={styles.dropdownContainer}>
                    <Calendar
                        startingMonth={value} 
                        onSelect={handleSelect}
                        showNav
                    />
                </div>
            }
        </button>
    );
}

export default DateInput;