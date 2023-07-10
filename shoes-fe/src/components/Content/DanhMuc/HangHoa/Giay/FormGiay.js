import { useState, useEffect } from "react";
import { useTableContext, actions_table } from "~table_context";
import FormGiayBasic from "./FormGiayBasic";
import styles from "./FormGiayBasic.module.scss";
import { checkMaDanhMucExisted } from "~danh_muc/helper";

const FormGiay = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [isSaveData, setIsSaveData] = useState(true);
  const [dataForm, setDataForm] = useState(() => {
    setIsSaveData(true);
    return stateTable.inforShowTable.record;
  });

  useEffect(() => {
    setIsSaveData(false);
  }, [dataForm]);

  const handleSaveFrom = () => {
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAGIAY === dataForm.MAGIAY ? dataForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      if (
        checkMaDanhMucExisted(
          dataForm["MAGIAY"],
          stateTable.inforShowTable.infoTable,
          "MAGIAY"
        )
      ) {
        alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
        return false;
      }
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          dataForm,
        ])
      );
    }
    console.log("dataForm: ", dataForm);
    fetch("http://localhost:8000/giay", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataForm),
    })
      .then((response) => {
        console.log("response: ", response);
        alert("Lưu thông tin thành công!");
      })
      .catch((error) => {
        console.log("error: ", error);
        alert("Xảy ra lỗi, chưa lưu được thông tin!");
      });

    // Không tắt form => để user thực hiện các hành động khác
    // dispatchTable(actions_table.setModeShowModal(false));
  };

  const handleNhapTiep = () => {
    var form_emty = {};
    for (let key in dataForm) {
      console.log(key, form_emty[key]);
      form_emty[key] = "";
    }
    setDataForm(form_emty);
  };

  const handleNhanBan = () => {
    let text = "Lưu thông tin hiện tại trước khi nhân bản!";
    if (window.confirm(text)) {
      handleSaveFrom();
    }
    dispatchTable(actions_table.setActionForm("add"));
  };

  console.log(
    "stateTable.inforShowTable.action_row: ",
    stateTable.inforShowTable.action_row
  );

  return (
    <>
      <FormGiayBasic
        form={dataForm}
        setDataForm={setDataForm}
        mode={stateTable.inforShowTable.action_row}
      />

      <div className={styles.group_button}>
        <div>
          <button onClick={handleNhanBan}>Nhân bản</button>
          <button>Second first</button>
        </div>

        <div>
          {stateTable.inforShowTable.action_row !== "view" && (
            <button onClick={handleSaveFrom}>Lưu</button>
          )}
          {stateTable.inforShowTable.action_row !== "view" && (
            <button onClick={handleNhapTiep}>Nhập tiếp</button>
          )}
        </div>
      </div>
    </>
  );
};

export default FormGiay;
