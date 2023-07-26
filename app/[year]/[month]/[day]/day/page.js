'use client'

import WeekDays from '../../../../components/week-days/WeekDays';

const DayPage = (props) => {

    const { year, month, day } = props.params;
    const currentDate = new Date(year, month - 1, day);

    return (
        <WeekDays date={currentDate} singleDay/>
    );

  }
  
  export default DayPage;