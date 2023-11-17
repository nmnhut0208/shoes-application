import { Popconfirm } from "antd";
import styles from "./Modal.module.scss";
import { useTaskContext, resetHeader } from "~task";

const Modal = ({
  title,
  status,
  isSaveData,
  setShowModal,
  isResetPageEmpty,
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

          {!isSaveData ? (
            <Popconfirm
              title="Xác nhận hành động"
              description="Bạn muốn tắt mà không lưu thay đổi?"
              onConfirm={() => setShowModal(false)}
              onCancel={() => {}}
              okText="Đồng ý"
              cancelText="Không đồng ý"
            >
              <button className={styles.button_close_modal}>X</button>
            </Popconfirm>
          ) : (
            <button
              className={styles.button_close_modal}
              onClick={() => {
                setShowModal(false);
              }}
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
