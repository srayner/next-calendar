'use client'

import WeekDays from '../../../../components/week-days/WeekDays';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const WeekPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);
    
    const router = useRouter();

    const clickHandler = (day) => {
        router.push(format(day, '/yyyy/MM/dd') + '/day');
    }

    return (
        <WeekDays date={currentDate} onClick={clickHandler}/>
    );

  }
  
  export default WeekPage;