import { useState } from "react";
import styles from "./FormKhachHang.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormKhachHang = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAKH === inputForm.MAKH ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          inputForm,
        ])
      );
    }
    console.log("inputForm: ", inputForm);
    fetch("http://localhost:8000/khachhang", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputForm),
    })
      .then((response) => {
        console.log("response: ", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    dispatchTable(actions_table.setModeShowModal(false));
  };

  return (
    <div className={styles.form}>
      <div className={styles.item}>
        <label>Mã khách hàng</label>
        <input
          readOnly={stateTable.inforShowTable.action_row === "edit"}
          name="MAKH"
          value={inputForm["MAKH"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Tên khách hàng</label>
        <input
          name="TENKH"
          value={inputForm["TENKH"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Địa chỉ</label>
        <input
          name="DIACHI"
          value={inputForm["DIACHI"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Điện thoại</label>
        <input
          name="TEL"
          value={inputForm["TEL"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Fax</label>
        <input
          name="FAX"
          value={inputForm["FAX"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Email</label>
        <input
          name="EMAIL"
          value={inputForm["EMAIL"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Giá ưu tiên</label>
        <input
          name="DONGIA"
          value={inputForm["DONGIA"]}
          onChange={(e) => handleChangeInformationForm(e)}
        />
      </div>

      <div className={styles.item}>
        <label>Ghi chú</label>
        <input
          name="GHICHU"
          value={inputForm["GHICHU"]}
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
