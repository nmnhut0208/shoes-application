import styles from "./ModalForm.module.scss";
import { useTaskContext, resetHeader } from "~task";
import { Popconfirm } from "antd";

const ModalForm = ({ setShowForm, isSaveData, setSaveData, children }) => {
  const [stateTask, dispatchTask] = useTaskContext();
  return (
    <div className={styles.modal}>
      <div className={styles.modal__overlay}></div>
      <div className={styles.model__body}>
        <div className={styles.header_modal}>
          <label className={styles.title_modal}>Giao hàng - F0033</label>
          { !isSaveData ? (
            <Popconfirm
              title="Xác nhận hành động"
              description="Bạn muốn tắt mà không lưu thay đổi?"
              onConfirm={() => {
                setSaveData(true)
                setShowForm(false)
              }}
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
                setShowForm(false);
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

export default ModalForm;
