import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './round-button.module.css';
import { useRouter } from 'next/navigation';

const RoundButton = (props) => {
    
    const router = useRouter();

    const navigate = () => {
        router.push(props.href);
    }

    const onClick = props.href ? navigate : props.onClick;

    return (
        <button className={styles.roundButton} onClick={onClick}>
            <FontAwesomeIcon icon={props.icon} />
        </button>
    )
}

export default RoundButton;