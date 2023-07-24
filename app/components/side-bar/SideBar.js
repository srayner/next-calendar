import Calendar from '../calendar/Calendar';
import styles from './side-bar.module.css'

const SideBar = () => {
  
  const now = new Date();

  return (
    <div className={styles.sideBar}>
      <Calendar startingMonth={now} showNav/>
    </div>
  )
}

export default SideBar;