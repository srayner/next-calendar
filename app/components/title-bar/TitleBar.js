'use client'

import Button from '../button/Button'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; 
import styles from './title-bar.module.css'

const TitleBar = () => {
    return (
        <div className={styles.titleBar}>
            <div className={styles.title}>Calendar</div>
            <Button key="1" type={'primary'} caption="Today" />
            <Button key="2" type={'secondary'} caption="Year" icon={faCaretDown}/>
        </div>
    )
}

export default TitleBar