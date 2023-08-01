'use client'

import styles from "./modal.module.css";
import { useContext } from 'react';
import { ModalContext } from "@/app/layout";

const Modal = ({eventType}) => {
    const {isOpen, closeModal} = useContext(ModalContext);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <span className={styles.closeModalBtn} onClick={closeModal}>
                    &times;
                </span>
                <h2>New {eventType}</h2>
                <p>This is the content of the modal. You can put whatever you want here.</p>
            </div>
        </div>
    );
};

export default Modal;
