'use client'

import Calendar from '../calendar/Calendar';
import styles from './side-bar.module.css'
import { useSelectedLayoutSegments } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const SideBar = () => {

    const router = useRouter();

    const now = new Date();

    const segments = useSelectedLayoutSegments();
    const viewName = segments[segments.length - 1];

    const handleDateChange = (date) => {
        const url = '/' + format(date, 'yyyy/MM/dd') + '/' + viewName;
        router.push(url);
    }

    return (
        <div className={styles.sideBar}>
            <Calendar startingMonth={now} onSelect={handleDateChange} showNav/>
        </div>
    )
}

export default SideBar;