'use client'

import Button from '../button/Button';
import { useState } from 'react';
import styles from './drop-down.module.css';

const DropDown = (props) => {

    const [dropped, setDropped] = useState(false);
    
    const items = props.items;
    const selected = items.find(item => item.value === props.selected);
    const menuAligned = props.menuAligned || 'left';
    const menuAlignmentStyle = menuAligned === 'left' ? styles.leftAligned : styles.rightAligned;
    console.log(menuAligned);
    console.log(menuAlignmentStyle);

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
            <Button type={props.type} caption={props.caption || selected.caption} icon={props.icon} onClick={toggleDropped}/>
            {dropped && <ul className={`${styles.list} ${menuAlignmentStyle}`}>
                {items.map((item) => <li key={item.value} onClick={() => handleSelected(item)}>
                    <span>{item.caption}</span>
                    <span>{item.shortcut}</span>
                </li>)}
            </ul>}
        </div>
    );
}

export default DropDown;
