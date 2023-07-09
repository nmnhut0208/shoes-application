import styles from "./Modal.module.scss";
import { useTaskContext, resetHeader } from "~task";

const Modal = ({ setShowForm, children }) => {
  const [stateTask, dispatchTask] = useTaskContext();
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.model__body}>
        <div className={styles.header_modal}>
          <label className={styles.title_modal}>Delete</label>
          <button
            className={styles.button_close_modal}
            onClick={() => {
              setShowForm(false);
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
