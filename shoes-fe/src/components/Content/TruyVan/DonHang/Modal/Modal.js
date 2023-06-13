import styles from "./Modal.module.scss";

const Modal = ({ title, status, isSaveData, setShowModal, children }) => {
  if (!status) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.model__body}>
        <div className={styles.header_modal}>
          <label className={styles.title_modal}>{title}</label>
          <button
            className={styles.button_close_modal}
            onClick={() => {
              if (!isSaveData) {
                let text = "Bạn muốn tắt Form mà không lưu thay đổi!";
                if (window.confirm(text)) {
                  setShowModal(false);
                }
                return;
              }
              setShowModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.content_modal}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
