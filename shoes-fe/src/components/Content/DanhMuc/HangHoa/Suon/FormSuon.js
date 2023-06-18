import { useState } from "react";
import styles from "./FormSuon.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";

import { ItemGot, ItemMui } from "~items";

const FormSuon = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  const [stateItem, dispatchItem] = useItemsContext();

  const [image_url, setImageURL] = useState("");
  const [image_base64, setImageBase64] = useState(
    stateTable.inforShowTable.record["HINHANH"]
  );

  const [view, setView] = useState(
    () => stateTable.inforShowTable.action_row === "view"
  );

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
            info.MASUON === inputForm.MASUON ? inputForm : info
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
      dispatchItem(
        actions_items_context.setInfoSuon([
          ...stateItem.infoItemSuon,
          { label: inputForm["TENSUON"], value: inputForm["MASUON"] },
        ])
      );
    }
    console.log("inputForm: ", inputForm);
    fetch("http://localhost:8000/suon", {
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
            <label>Mã sườn</label>
            <input
              name="MASUON"
              readOnly={stateTable.inforShowTable.action_row === "edit" || view}
              value={inputForm["MASUON"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Tên sườn</label>
            <input
              readOnly={view}
              name="TENSUON"
              value={inputForm["TENSUON"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Mã gót</label>
            <ItemGot
              readOnly={view}
              initValue={{
                value: inputForm["MAGOT"],
                label: inputForm["TENGOT"],
              }}
              changeData={(dict_data) => {
                setInputForm({
                  ...inputForm,
                  MAGOT: dict_data["value"],
                  TENGOT: dict_data["label"],
                });
              }}
              size_input={"10rem"}
              size_span={"19.2rem"}
            />
          </div>

          <div className={styles.item}>
            <label>Mã mũi</label>
            <ItemMui
              readOnly={view}
              initValue={{
                value: inputForm["MAMUI"],
                label: inputForm["TENMUI"],
              }}
              changeData={(dict_data) => {
                setInputForm({
                  ...inputForm,
                  MAMUI: dict_data["value"],
                  TENMUI: dict_data["label"],
                });
              }}
              size_input={"10rem"}
              size_span={"19.2rem"}
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
            readOnly={view}
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
        {!view && <button onClick={handleSaveFrom}>Lưu</button>}
        <button>Button 2</button>
        <button>Đóng</button>
      </div>
    </div>
  );
};

export default FormSuon;
