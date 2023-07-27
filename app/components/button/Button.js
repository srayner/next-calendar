
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './button.module.css';
import { useRouter } from 'next/navigation';

const Button = (props) => {
  
    const router = useRouter();

    const navigate = () => {
        router.push(props.href);
    }

    const onClick = props.href ? navigate : props.onClick;

    let style = `${styles.button}`
    if (props.type === 'secondary') {
        style = `${styles.button} ${styles.secondary}`
    }

    return (
        <button className={style} onClick={onClick}>
            <span>{props.caption}</span>
            {props.icon && <FontAwesomeIcon icon={props.icon} />}
        </button>
    )
}

export default Button