import styles from "./Modal.module.scss";
import { useTaskContext, resetHeader } from "~task";

const Modal = ({
  title,
  status,
  isSaveData,
  setShowModal,
  listMaDongPhanCongAddButWaitSave,
  children,
}) => {
  const [stateTask, dispatchTask] = useTaskContext();
  if (!status) {
    resetHeader(dispatchTask);
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
                  if (listMaDongPhanCongAddButWaitSave.length > 0) {
                    fetch(
                      "http://localhost:8000/phancong/by_list_MADONG/?MADONG=" +
                        listMaDongPhanCongAddButWaitSave.join("&MADONG="),
                      { method: "delete" }
                    )
                      .then((response) => {
                        console.log("response: ", response);
                      })
                      .catch((error) => {
                        console.log("error: ", error);
                      });
                  }

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
