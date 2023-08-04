import styles from './row.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Row = ({children, icon}) => {
    return (
        <div className={styles.row}>
            <div className={styles.icon}>
                {icon && <FontAwesomeIcon icon={icon} />}
            </div>
            <div className={styles.content}>{children}</div>
        </div>
    );
}

export default Row;
