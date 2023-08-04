import styles from './time-input.module.css';
import format from 'date-fns/format';

const TimeInput = ({value}) => {

    const caption = format(value, 'hh:mm');

    return (
        <>
            <span className={styles.button}>{caption}</span>
        </>
    );
}

export default TimeInput;