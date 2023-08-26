"use client";

import styles from "./modal.module.css";
import { useContext } from "react";
import { ModalContext } from "@/app/layout";
import EventForm from "../event-form/EventForm";
import { createEvent, updateEvent } from "@/src/api";

const Modal = () => {
  const { isOpen, closeModal, event, onUpdate } = useContext(ModalContext);

  if (!isOpen) return null;

  function onSave(data) {
    data.id ? updateEvent(data, onUpdate) : createEvent(data);
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
