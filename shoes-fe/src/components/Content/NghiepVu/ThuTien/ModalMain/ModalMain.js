import styles from "./ModalMain.module.scss";
import { useTaskContext, resetHeader } from "~task";

const ModalMain = ({
  status,
  setShowModal,
  isResetPageEmpty,
  title,
  children,
}) => {
  if (!status) {
    return null;
  }
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
              if (isResetPageEmpty) resetHeader(dispatchTask);
              else setShowModal(false);
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
