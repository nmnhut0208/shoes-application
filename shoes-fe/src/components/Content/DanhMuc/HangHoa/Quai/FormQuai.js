import { useState } from "react";
import styles from "./FormQuai.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

import { checkMaDanhMucExisted } from "~danh_muc/helper";

const FormQuai = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateItem, dispatchItem] = useItemsContext();
  const [view, setView] = useState(
    () => stateTable.inforShowTable.action_row === "view"
  );
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  const [image_url, setImageURL] = useState("");
  const [image_base64, setImageBase64] = useState(
    stateTable.inforShowTable.record["HINHANH"]
  );

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = (event) => {
    if (inputForm["DONGIA"] == "") {
      alert("Nhập đơn giá quai!!!");
      event.preventDefault();
      return false;
    }
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAQUAI === inputForm.MAQUAI ? inputForm : info
          )
        )
      );
    } else if (stateTable.inforShowTable.action_row === "add") {
      if (
        checkMaDanhMucExisted(
          inputForm["MAQUAI"],
          stateTable.inforShowTable.infoTable,
          "MAQUAI"
        )
      ) {
        alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
        event.preventDefault();
        return false;
      }
      method = "POST";
      dispatchTable(
        actions_table.setInforTable([
          ...stateTable.inforShowTable.infoTable,
          inputForm,
        ])
      );
      dispatchItem(
        actions_items_context.setInfoQuai([
          ...stateItem.infoItemQuai,
          { label: inputForm["TENQUAI"], value: inputForm["MAQUAI"] },
        ])
      );
    }
    fetch("http://localhost:8000/quai", {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputForm),
    })
      .then((response) => {
        console.log("response: ", response);
        alert("Lưu thành công.");
      })
      .catch((error) => {
        console.log("error: ", error);
        alert("Xảy ra lỗi. Chưa lưu được.");
      });
    dispatchTable(actions_table.setModeShowModal(false));
  };

  const changeImage = (e) => {
    if (e.target.value !== "") {
      var reader = new FileReader();
      reader.onload = function () {
        let base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        let image = "data:image/png;base64,".concat(base64String);
        setImageBase64(image);
        setInputForm({ ...inputForm, HINHANH: image });
      };
      reader.readAsDataURL(e.target.files[0]);
      setImageURL("");
    }
  };

  return (
    <div className={styles.form}>
      <div className={styles.content}>
        <div className={styles.items_container}>
          <div className={styles.item}>
            <label>Mã quai</label>
            <input
              readOnly={stateTable.inforShowTable.action_row === "edit" || view}
              name="MAQUAI"
              value={inputForm["MAQUAI"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Tên quai</label>
            <input
              readOnly={view}
              name="TENQUAI"
              value={inputForm["TENQUAI"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Đơn giá quai</label>
            <input
              readOnly={view}
              type="number"
              name="DONGIA"
              value={inputForm["DONGIA"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Ghi chú</label>
            <input
              readOnly={view}
              name="GHICHU"
              value={inputForm["GHICHU"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>
        </div>

        <div className={styles.image_container}>
          {!view && (
            <label className={styles.label_choose_image} for="img">
              Chọn hình ảnh
            </label>
          )}
          <input
            style={{ display: "none" }}
            type="file"
            id="img"
            name="img"
            accept="image/*"
            value={image_url}
            onChange={(e) => changeImage(e)}
          />
          <img src={image_base64} />
        </div>
      </div>

      <div className={styles.button_container}>
        {!view && (
          <button onClick={(event) => handleSaveFrom(event)}>Lưu</button>
        )}
        <button>Button 2</button>
      </div>
    </div>
  );
};

export default FormQuai;
