import { useState } from "react";
import clsx from "clsx";
import styles from "./FormKhachHang.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormKhachHang = () => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [stateTable, dispatchTable] = useTableContext();
  console.log(
    "stateTable.inforShowTable.record:, ",
    stateTable.inforShowTable.record
  );
  const [inputForm, setInputForm] = useState(() => {
    var infos = stateTable.inforShowTable.infoTable.filter((obj) => {
      return obj.STT === stateTable.inforShowTable.record.STT;
    });
    return infos[0];
  });
  console.log("record form: re-render");

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    // saveDataBase()
    dispatchTable(
      actions_table.setInforTable(
        stateTable.inforShowTable.infoTable.map((info) =>
          info.STT === inputForm.STT ? inputForm : info
        )
      )
    );
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <div className={styles.item}>
        <label>Mã khách hàng</label>
        <input
          name="Mã khách hàng"
          value={inputForm["Mã khách hàng"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Tên khách hàng</label>
        <input
          name="Tên khách hàng"
          value={inputForm["Tên khách hàng"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Địa chỉ</label>
        <input
          name="Địa chỉ"
          value={inputForm["Địa chỉ"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Điện thoại</label>
        <input
          name="Điện thoại"
          value={inputForm["Điện thoại"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Fax</label>
        <input
          name="Fax"
          value={inputForm["Fax"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Email</label>
        <input
          name="Email"
          value={inputForm["Email"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Giá ưu tiên</label>
        <input
          name="Giá ưu tiên"
          value={inputForm["Giá ưu tiên"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Ghi chú</label>
        <input
          name="Ghi chú"
          value={inputForm["Ghi chú"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.button_container}>
        <button onClick={handleSaveFrom}>Lưu</button>
        <button>Button 2</button>
        <button>Đóng</button>
      </div>
    </div>
  );
};

export default FormKhachHang;
