'use client'

import Button from '../button/Button';
import { useState } from 'react';
import styles from './drop-down.module.css';

const DropDown = (props) => {

    const [dropped, setDropped] = useState(false);
    const items = [
        { caption: 'Year', shortcut: 'Y', value: 'year'},
        { caption: 'Month', shortcut: 'M', value: 'month' },
        { caption: 'Week', shortcut: 'W', value: 'week' },
        { caption: 'Day', shortcut: 'D', value: 'day' }
    ];
    const selected = items.find(item => item.value === props.selected);
    

    const toggleDropped = () => {
        setDropped(!dropped);
    }

    const handleSelected = (item) => {
        setDropped(false);
        if (typeof(props.onSelected) === 'function') {
            props.onSelected(item.value);
        }
    }

    return (
        <div className={styles.container}>
            <Button type={props.type} caption={selected.caption} icon={props.icon} onClick={toggleDropped}/>
            {dropped && <ul className={styles.list}>
                {items.map((item) => <li key={item.value} onClick={() => handleSelected(item)}>
                    <span>{item.caption}</span>
                    <span>{item.shortcut}</span>
                </li>)}
            </ul>}
        </div>
    );
}

export default DropDown;
