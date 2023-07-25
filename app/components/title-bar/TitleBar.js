'use client'

import Button from '../button/Button';
import RoundButton from '../round-button/RoundButton';
import Text from '../text/Text';
import { faCaretDown, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import styles from './title-bar.module.css';
import { useParams } from 'next/navigation';

const TitleBar = (props) => {

    const {year, month, day} = useParams();
    
    if (typeof(year) === 'undefined') {
        return;
    }
    
    const currentDate = new Date(year, month - 1, day);
    const today = new Date();

    const prevLink = `/${+year - 1}/${month}/${day}/year`;
    const nextLink = `/${+year + 1}/${month}/${day}/year`;
    const todayLink = '/' + format(today, 'yyyy/MM/dd') + '/year';
    
    return (
        <div className={styles.titleBar}>
            <div className={styles.title}>Calendar</div>
            
            <RoundButton icon={faChevronLeft} href={prevLink}/>
            <RoundButton icon={faChevronRight} href={nextLink}/>
            <Text>{format(currentDate, 'yyyy')}</Text>
            <Button key="1" type={'primary'} caption="Today" href={todayLink} />
            <Button key="2" type={'secondary'} caption="Year" icon={faCaretDown} />
        </div>
    )
}

export default TitleBar