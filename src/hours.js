import { format } from 'date-fns';

export const initHours = days => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        const name = i.toString().padStart(2, '0') + ':00';
        let hour = {name: name};
        days.map((day) => {
            const dayName = format(day, 'ddd');
            hour[dayName] = {events: []};
        });  
        hours.push(hour);
    }

    return hours;
}
