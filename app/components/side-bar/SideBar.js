'use client'

import Calendar from '../calendar/Calendar';
import styles from './side-bar.module.css'
import { useSelectedLayoutSegments } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { addHours, format, roundToNearestMinutes, startOfDay } from 'date-fns';
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

    function debug() {
        const now = new Date();
        const myTrunc = roundToNearestMinutes(now, {nearestTo: 15, roundingMethod: 'trunc'});
        const myCeil = roundToNearestMinutes(now, {nearestTo: 15, roundingMethod: 'ceil'});
        const myFloor = roundToNearestMinutes(now, {nearestTo: 15, roundingMethod: 'floor'});

        console.log(now);
        console.log(myTrunc);
        console.log(myCeil);
        console.log(myFloor);
    }
    const handleCreate = (type) => {
        debug();
        const now = new Date();
        const start = roundToNearestMinutes(now, {nearestTo: 15, roundingMethod: 'ceil'});
        const end = addHours(start , 1);
        const newEvent = {
            type,
            start: start,
            end: end,
            colour: '#039be5'
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