import { useState } from "react";
import { useTableContext, actions_table } from "~table_context";
import FormGiayBasic from "./FormGiayBasic";
import styles from "./FormGiayBasic.module.scss";

const FormGiay = () => {
  // TODO: Sau này sửa STT thành tên duy nhất.
  const [stateTable, dispatchTable] = useTableContext();
  const [dataForm, setDataForm] = useState(stateTable.inforShowTable.record);

  const handleSaveFrom = () => {
    // saveDataBase()
    dispatchTable(
      actions_table.setInforTable(
        stateTable.inforShowTable.infoTable.map((info) =>
          info.MAGIAY === dataForm.MAGIAY ? dataForm : info
        )
      )
    );

    dispatchTable(actions_table.setModeShowModal(false));
  };

  const handleNhapTiep = () => {
    var form_emty = {};
    for (let key in dataForm) {
      console.log(key, form_emty[key]);
      form_emty[key] = "";
    }
    setDataForm(form_emty);
  };

  return (
    <>
      <FormGiayBasic initForm={dataForm} setDataForm={setDataForm} />

      <div className={styles.group_button}>
        <div>
          <button>Button first</button>
          <button>Second first</button>
        </div>

        <div>
          <button onClick={handleSaveFrom}>Lưu</button>
          <button onClick={handleNhapTiep}>Nhập tiếp</button>
          {/* <button>Đóng</button> */}
        </div>
      </div>
    </>
  );
};

export default FormGiay;
