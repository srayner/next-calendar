'use client'

import Button from '../button/Button';
import DropDown from '../drop-down/DropDown';
import RoundButton from '../round-button/RoundButton';
import Text from '../text/Text';
import { faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
    addYears,
    addMonths,
    addWeeks,
    addDays,
    endOfWeek,
    format,
    getMonth,
    getYear,
    startOfWeek,
    subYears,
    subMonths,
    subWeeks,
    subDays,
} from 'date-fns';
import styles from './title-bar.module.css';
import { useParams } from 'next/navigation';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useRouter } from 'next/navigation';

const TitleBar = (props) => {

    const router = useRouter();

    const {year, month, day} = useParams();
    const segments = useSelectedLayoutSegments();
    const viewName = segments[segments.length - 1];
    
    if (typeof(year) === 'undefined') {
        return;
    }
    
    const currentDate = new Date(year, month - 1, day);
    const today = new Date();
    const todayLink = '/' + format(today, 'yyyy/MM/dd') + '/' + viewName;

    let prevLink;
    let nextLink;
    let dateText;
    switch (viewName) {
        case 'year':
            prevLink = format(subYears(currentDate, 1), '/yyyy/MM/dd') + '/year';
            nextLink = format(addYears(currentDate, 1), '/yyyy/MM/dd') + '/year';
            dateText = format(currentDate, 'yyyy');
            break;
        case 'month':
            prevLink = format(subMonths(currentDate, 1), '/yyyy/MM/dd') + '/month';
            nextLink = format(addMonths(currentDate, 1), '/yyyy/MM/dd') + '/month';
            dateText = format(currentDate, 'MMMM yyyy');
            break;
        case 'week':
            prevLink = format(subWeeks(currentDate, 1), '/yyyy/MM/dd') + '/week';
            nextLink = format(addWeeks(currentDate, 1), '/yyyy/MM/dd') + '/week';
            const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
            const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
            if (getYear(weekStart) === getYear(weekEnd)) {
                if (getMonth(weekStart) === getMonth(weekEnd)) {
                    dateText =
                        format(weekEnd, 'MMMM') + ' ' +
                        format(currentDate, 'yyyy');
                } else {
                    dateText =
                        format(weekStart, 'MMM') + ' - ' +
                        format(weekEnd, 'MMM') + ' ' +
                        format(currentDate, 'yyyy');
                }
            } else {
                dateText =
                    format(weekStart, 'MMM yyyy') + ' - ' +
                    format(weekEnd, 'MMM yyyy');
            }
            break;
        default:
            prevLink = format(subDays(currentDate, 1), '/yyyy/MM/dd') + '/day';
            nextLink = format(addDays(currentDate, 1), '/yyyy/MM/dd') + '/day';
            dateText = format(currentDate, 'd MMM yyyy');
    }

    const handleViewChange = (view) => {
        router.push(`/${year}/${month}/${day}/${view}`);
    }

    const items = [
        { caption: 'Year', shortcut: 'Y', value: 'year'},
        { caption: 'Month', shortcut: 'M', value: 'month' },
        { caption: 'Week', shortcut: 'W', value: 'week' },
        { caption: 'Day', shortcut: 'D', value: 'day' }
    ];

    return (
        <div className={styles.titleBar}>
            <div className={styles.leftItems}>
                <img src="/calendar.png" />
                <div className={styles.title}>Calendar</div>
                <Button key="1" type={'primary'} caption="Today" href={todayLink} />
                <RoundButton icon={faChevronLeft} href={prevLink}/>
                <RoundButton icon={faChevronRight} href={nextLink}/>
                <Text>{dateText}</Text>
            </div>
            <div className={styles.rightItems}>
                <DropDown
                    type={'secondary'}
                    items={items}
                    selected={viewName}
                    icon={faCaretDown}
                    menuAligned="right"
                    onSelected={(view) => handleViewChange(view)}
                />
            </div>
        </div>
    )
}

export default TitleBar