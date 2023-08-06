'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './colour-input.module.css';
import { faCaretDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ColourInput = ({value}) => {

    const [dropped, setDropped] = useState(false);

    function toggleDropped() {
        setDropped(!dropped);
    }

    function handleBlur() {
        setDropped(false);
    }

    const style = {
        backgroundColor: value
    }

    const colours = [
        {name: 'Tomato', hex: '#d50000'},
        {name: 'Flamingo', hex: '#e67c73'}, 
        {name: 'Tangerine', hex: '#f4511e'}, 
        {name: 'Banana', hex: '#f6bf26'},
        {name: 'Sage', hex: '#33b679'},
        {name: 'Basil', hex: '#0b8043'},
        {name: 'Peacock', hex: '#039be5'},
        {name: 'Blueberry', hex: '#3f51b5'},
        {name: 'Lavendar', hex: '#7986cb'},
        {name: 'Grape', hex: '#8e24aa'},
        {name: 'Graphite', hex: '#616161'},
    ];

    return (
        <button className={styles.container} onBlur={handleBlur} type="button">
            <div className={styles.button} onClick={toggleDropped}>
                <div className={styles.circle} style={style}></div>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {dropped && <div className={styles.list}>
                {colours.map(colour => {
                    return <div className={styles.circle} style={{backgroundColor: colour.hex}}>
                        {colour.hex === value && <FontAwesomeIcon icon={faCheck} />}
                        <div className={styles.tooltip}>{colour.name}</div>
                    </div>
                })}
            </div>}
        </button>
    );
}

export default ColourInput;
