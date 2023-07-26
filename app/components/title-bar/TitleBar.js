'use client'

import Button from '../button/Button';
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

const TitleBar = (props) => {

    const {year, month, day} = useParams();
    const segments = useSelectedLayoutSegments();
    const viewName = segments[segments.length - 1];
    
    if (typeof(year) === 'undefined') {
        return;
    }
    
    const currentDate = new Date(year, month - 1, day);
    const today = new Date();
    const todayLink = '/' + format(today, 'yyyy/MM/dd') + '/year';

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

    return (
        <div className={styles.titleBar}>
            <div className={styles.title}>Calendar</div>
            
            <RoundButton icon={faChevronLeft} href={prevLink}/>
            <RoundButton icon={faChevronRight} href={nextLink}/>
            <Text>{dateText}</Text>
            <Button key="1" type={'primary'} caption="Today" href={todayLink} />
            <Button key="2" type={'secondary'} caption="Year" icon={faCaretDown} />
            
        </div>
    )
}

export default TitleBar