import styles from "./ModalMain.module.scss";
import { useTaskContext, resetHeader } from "~task";

const ModalMain = ({ title, children }) => {
  const [stateTask, dispatchTask] = useTaskContext();

  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.model__body}>
        <div className={styles.header_modal}>
          <label className={styles.title_modal}>{title}</label>
          <button
            className={styles.button_close_modal}
            onClick={() => {
              resetHeader(dispatchTask);
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

export default ModalMain;
