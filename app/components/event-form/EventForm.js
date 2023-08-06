import { format } from 'date-fns';
import styles from './event-form.module.css';
import { useState } from 'react';
import Button from '../button/Button';
import DateInput from '../form/date-input/DateInput';
import TimeInput from '../form/time-input/TimeInput';
import Row from '../form/row/Row';
import ColourInput from '../form/colour-input/ColourInput';
import { faClock, faSwatchbook } from '@fortawesome/free-solid-svg-icons';

const EventForm = ({event, saveEvent}) => {

    const [data, setData] = useState(event);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setData((prevData) => ({...prevData, [name]: value}));
    }

    const handleSave = (e) => {
        e.preventDefault();
        saveEvent(data);
    }

    const startDateText = format(data.start, 'EEEE, dd MMMM');
    const startTimeText = format(data.start, 'hh:mm');
    const endDateText = format(data.end, 'EEEE, dd MMMM');
    const endTimeText = format(data.start, 'hh:mm');

    return (
        <form className={styles.eventForm} onSubmit={handleSave} autoComplete="off">
            <div className={styles.eventNameContainer}>
                <input
                  autoFocus
                  className={styles.eventName}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Add title"
                  onChange={handleChange} />
            </div>

            <Row icon={faClock}>
                <DateInput value={data.start} />
                <TimeInput value={data.start} />  - 
                <TimeInput value={data.end} />
                <DateInput value={data.end} />
            </Row>

            <Row icon={faSwatchbook}>
                <ColourInput value={data.colour} />
            </Row>
        </form>
    );

}

export default EventForm;
