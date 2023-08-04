'use client'

import Calendar from '../calendar/Calendar';
import styles from './side-bar.module.css'
import { useSelectedLayoutSegments } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import DropDown from '../drop-down/DropDown';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ModalContext } from '@/app/layout';
import { useContext } from 'react';

const SideBar = () => {

    const router = useRouter();
    const { openModal } = useContext(ModalContext);

    const now = new Date();

    const segments = useSelectedLayoutSegments();
    const viewName = segments[segments.length - 1];

    const handleDateChange = (date) => {
        const url = '/' + format(date, 'yyyy/MM/dd') + '/' + viewName;
        router.push(url);
    }

    const handleCreate = (type) => {
        const newEvent = {
            type,
            start: new Date(),
            end: new Date(),
            colour: '#4287f5'
        }
        openModal(newEvent);
    }

    const items = [
        { caption: 'Event', shortcut: 'E', value: 'event'},
        { caption: 'Task', shortcut: 'T', value: 'task'}
    ];

    return (
        <div className={styles.sideBar}>
            <DropDown
                type={'primary'}
                items={items}
                caption="Create"
                icon={faCaretDown}
                menuAligned="left"
                onSelected={(data) => handleCreate(data)}
                />
            <Calendar startingMonth={now} onSelect={handleDateChange} showNav/>
        </div>
    )
}

export default SideBar;