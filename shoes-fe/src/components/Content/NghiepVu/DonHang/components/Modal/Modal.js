import { useState, useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({
  title,
  status,
  setShowModal,
  without_close_button,
  children,
}) => {
  if (!status) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.model__body}>
        <div className={styles.header_modal}>
          <label className={styles.title_modal}>{title}</label>
          {!without_close_button && (
            <button
              className={styles.button_close_modal}
              onClick={() => setShowModal(false)}
            >
              X
            </button>
          )}
        </div>
        <div className={styles.content_modal}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
