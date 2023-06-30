import styles from "./Modal.module.scss";
import { useTaskContext, resetHeader } from "~task";

const rollback_add = async (listMaDongPhanCongAddButWaitSave) => {
  if (listMaDongPhanCongAddButWaitSave.length > 0) {
    await fetch(
      "http://localhost:8000/phancong/by_list_MADONG/?MADONG=" +
        listMaDongPhanCongAddButWaitSave.join("&MADONG="),
      { method: "delete" }
    );
  }
};
const rollback_delete = async (dataDeleteButWaitSave) => {
  if (dataDeleteButWaitSave.length > 0) {
    await fetch("http://localhost:8000/phancong/rollback_delete", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataDeleteButWaitSave),
    });
  }
};

const Modal = ({
  title,
  status,
  isResetPageEmpty,
  isSaveData,
  setShowModal,
  listMaDongPhanCongAddButWaitSave,
  dataDeleteButWaitSave,
  children,
}) => {
  const [stateTask, dispatchTask] = useTaskContext();
  if (!status) {
    if (isResetPageEmpty) resetHeader(dispatchTask);
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
                  Promise.all([
                    rollback_add(listMaDongPhanCongAddButWaitSave),
                    rollback_delete(dataDeleteButWaitSave),
                  ])
                    .then(() => {
                      setShowModal(false);
                      return;
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }
              } else setShowModal(false);
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
