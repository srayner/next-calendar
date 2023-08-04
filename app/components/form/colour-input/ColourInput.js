import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './colour-input.module.css';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const ColourInput = ({value}) => {

    const style = {
        backgroundColor: value
    }

    return (
        <div className={styles.button}>
            <div className={styles.circle} style={style}></div>
            <FontAwesomeIcon icon={faCaretDown} />
        </div>
    )
}

export default ColourInput;
