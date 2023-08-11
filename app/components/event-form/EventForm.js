import { format } from 'date-fns';
import styles from './event-form.module.css';
import { useState } from 'react';
import Button from '../button/Button';
import TextInput from '../form/text-input/TextInput';
import DateInput from '../form/date-input/DateInput';
import TimeInput from '../form/time-input/TimeInput';
import Row from '../form/row/Row';
import ColourInput from '../form/colour-input/ColourInput';
import { faClock, faSwatchbook } from '@fortawesome/free-solid-svg-icons';

const EventForm = ({event, saveEvent}) => {

    const [data, setData] = useState(event);

    const handleChange = (name, value) => {
        console.log(name, value);
        setData((prevData) => ({...prevData, [name]: value}));
    }

    const handleSave = (e) => {
        console.log(data);
        e.preventDefault();
        saveEvent(data);
    }

    const startDateText = format(data.start, 'EEEE, dd MMMM');
    const startTimeText = format(data.start, 'hh:mm');
    const endDateText = format(data.end, 'EEEE, dd MMMM');
    const endTimeText = format(data.start, 'hh:mm');

    console.log('render form');
    console.log(data.start);

    return (
        <form className={styles.eventForm} onSubmit={handleSave} autoComplete="off">
            <div className={styles.fieldContainer}>
                <TextInput name='name' value={data.name} onChange={handleChange} />
                <Row icon={faClock}>
                    <DateInput name="start" value={data.start} onSelect={handleChange}/>
                    <TimeInput name="start" value={data.start} onSelect={handleChange}/>  - 
                    <TimeInput name="end" value={data.end} onSelect={handleChange}/>
                    <DateInput name="end" value={data.end} onSelect={handleChange}/>
                </Row>
                <Row icon={faSwatchbook}>
                    <ColourInput value={data.colour} onSelect={handleChange}/>
                </Row>
            </div>
            <div className={styles.actions}>
                <Button caption="Save" onClick={handleSave}></Button>
            </div>
        </form>
    );

}

export default EventForm;
