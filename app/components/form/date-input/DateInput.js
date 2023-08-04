import styles from './date-input.module.css';
import format from 'date-fns/format';

const DateInput = ({value}) => {

    const caption = format(value, 'EEEE, dd MMMM');

    return (
        <>
            <span className={styles.button}>{caption}</span>
        </>
    );
}

export default DateInput;