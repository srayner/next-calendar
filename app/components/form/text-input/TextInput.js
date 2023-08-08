
import styles from './text-input.module.css';

const TextInput = ({name, value, onChange}) => {

    function handleChange(event) {
        onChange(name, event.target.value);
    }

    return (
        <div className={styles.textInput}>
            <input
                autoFocus
                className={styles.eventName}
                type="text"
                id="name"
                name={name}
                value={value}
                placeholder="Add title"
                onChange={handleChange}
            />
        </div>
    )
} 

export default TextInput;