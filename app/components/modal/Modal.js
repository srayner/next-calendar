'use client'

import styles from "./modal.module.css";
import { useContext } from 'react';
import { ModalContext } from "@/app/layout";
import EventForm from '../event-form/EventForm';
import { saveEvent } from '@/src/local-storage';

const Modal = () => {
    const {isOpen, closeModal, event} = useContext(ModalContext);

    if (!isOpen) return null;

    function onSave(data) {
        saveEvent(data);
        closeModal();
    }
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.topBar}>
                    <span className={styles.closeModalBtn} onClick={closeModal}>
                        &times;
                    </span>
                </div>
                <div className={styles.contentContainer}>
                    <EventForm event={event} saveEvent={onSave} />
                </div>
            </div>
            
        </div>
    );
};

export default Modal;
