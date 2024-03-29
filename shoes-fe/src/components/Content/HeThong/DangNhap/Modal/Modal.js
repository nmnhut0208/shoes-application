import { useTableContext, actions_table } from "~table_context";
import styles from "./Modal.module.scss";
import { useTaskContext, resetHeader } from "~task";

const Modal = ({ title, children }) => {
  const [stateTask, dispatchTask] = useTaskContext();
  // const [stateTable, dispatchTable] = useTableContext();
  // const infoShowModal = stateTable["infoShowModal"];

  // if (!infoShowModal.visible) {
  //   return null;
  // }
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

export default Modal;
