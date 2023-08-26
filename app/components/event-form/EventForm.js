import { format } from "date-fns";
import styles from "./event-form.module.css";
import { useState } from "react";
import Button from "../button/Button";
import TextInput from "../form/text-input/TextInput";
import DateInput from "../form/date-input/DateInput";
import TimeInput from "../form/time-input/TimeInput";
import Row from "../form/row/Row";
import ColourInput from "../form/colour-input/ColourInput";
import { faClock, faSwatchbook } from "@fortawesome/free-solid-svg-icons";

const EventForm = ({ event, saveEvent }) => {
  const [data, setData] = useState(event);

  const handleChange = (name, value) => {
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveEvent(data);
  };

  return (
    <form className={styles.eventForm} onSubmit={handleSave} autoComplete="off">
      <div className={styles.fieldContainer}>
        <TextInput name="name" value={data.name} onChange={handleChange} />
        <Row icon={faClock}>
          <DateInput name="start" value={data.start} onSelect={handleChange} />
          <TimeInput
            name="start"
            value={data.start}
            onSelect={handleChange}
          />{" "}
          -
          <TimeInput name="end" value={data.end} onSelect={handleChange} />
          <DateInput name="end" value={data.end} onSelect={handleChange} />
        </Row>
        <Row icon={faSwatchbook}>
          <ColourInput value={data.colour} onSelect={handleChange} />
        </Row>
      </div>
      <div className={styles.actions}>
        <Button caption="Save" onClick={handleSave}></Button>
      </div>
    </form>
  );
};

export default EventForm;
