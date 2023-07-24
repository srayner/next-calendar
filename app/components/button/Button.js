
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './button.module.css'

const Button = (props) => {
  let style = `${styles.button}`
  if (props.type === 'secondary') {
    style = `${styles.button} ${styles.secondary}`
  }
  
  return (
    <button className={style}>
        <span>{props.caption}</span>
        <FontAwesomeIcon icon={props.icon} />
    </button>
  )
}

export default Button