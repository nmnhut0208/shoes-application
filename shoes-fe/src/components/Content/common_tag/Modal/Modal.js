import { useTableContext, actions_table } from "~table_context";
import styles from "./Modal.module.scss";

const Modal = ({ children }) => {
  const [stateTable, dispatchTable] = useTableContext();
  const infoShowModal = stateTable["infoShowModal"];

  console.log("tvgiaohang: ");

  if (!infoShowModal.visible) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.model__body}>
        <div className={styles.header_modal}>
          <label className={styles.title_modal}>{infoShowModal.title}</label>
          <button
            className={styles.button_close_modal}
            onClick={() => dispatchTable(actions_table.setModeShowModal(false))}
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
