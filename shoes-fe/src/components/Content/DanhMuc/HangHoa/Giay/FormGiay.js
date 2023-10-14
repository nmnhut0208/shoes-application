import { useState, useEffect } from "react";
import { useTableContext, actions_table } from "~table_context";
import FormGiayBasic from "./FormGiayBasic";
import styles from "./FormGiayBasic.module.scss";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { CustomAlert } from "~utils/alert_custom";

const list_input_required = {
  MAGIAY: "Mã giày",
  TENGIAY: "Tên giày",
  MADE: "Mã đế",
  MASUON: "Mã sườn",
  MAQUAI: "Mã quai",
  DONGIA: "Đơn giá",
  MAKH: "Mã khách hàng",
  SortID: "Mã tham chiếu",
};

const FormGiay = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [isSaveData, setIsSaveData] = useState(true);
  const [dataForm, setDataForm] = useState(null);

  useEffect(() => {
    if (stateTable.inforShowTable.record["MAGIAY"] !== "") {
      fetch(
        "http://localhost:8000/giay/all_info_giay?MAGIAY=" +
          stateTable.inforShowTable.record["MAGIAY"]
      )
        .then((response) => response.json())
        .then((info) => {
          console.log("info: ", info);
          setDataForm(info[0]);
          setIsSaveData(true);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      // form empty to add giay
      setDataForm(stateTable.inforShowTable.record);
    }
  }, []);

  useEffect(() => {
    setIsSaveData(false);
  }, [dataForm]);

  const handleSaveFrom = () => {
    for (let key in list_input_required) {
      if (dataForm[key] === undefined || dataForm[key] === "") {
        CustomAlert("Nhập " + list_input_required[key]);
        return false;
      }
    }

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
        CustomAlert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
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
        CustomAlert("Lưu thông tin thành công!");
      })
      .catch((error) => {
        console.log("error: ", error);
        CustomAlert("Xảy ra lỗi, chưa lưu được thông tin!");
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
    // let text = "Lưu thông tin hiện tại trước khi nhân bản!";
    // if (window.confirm(text)) {
    //   handleSaveFrom();
    // }
    dispatchTable(actions_table.setActionForm("add"));
  };

  return (
    <>
      {dataForm && (
        <FormGiayBasic
          form={dataForm}
          setDataForm={setDataForm}
          mode={stateTable.inforShowTable.action_row}
        />
      )}

      <div className={styles.group_button}>
        <div>
          <button
            onClick={handleNhanBan}
            disabled={stateTable.inforShowTable.action_row === "view"}
          >
            Nhân bản
          </button>
        </div>

        <div>
          <button
            onClick={handleSaveFrom}
            disabled={stateTable.inforShowTable.action_row === "view"}
          >
            Lưu
          </button>
          <button
            onClick={handleNhapTiep}
            disabled={stateTable.inforShowTable.action_row === "view"}
          >
            Nhập tiếp
          </button>
        </div>
      </div>
    </>
  );
};

export default FormGiay;
