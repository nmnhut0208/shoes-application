import { useState } from "react";
import styles from "./FormGot.module.scss";
import { useTableContext, actions_table } from "~table_context";

const FormGot = () => {
  const [stateTable, dispatchTable] = useTableContext();
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

  const handleSaveFrom = () => {
    let method = "";
    if (stateTable.inforShowTable.action_row === "edit") {
      method = "PUT";
      dispatchTable(
        actions_table.setInforTable(
          stateTable.inforShowTable.infoTable.map((info) =>
            info.MAGOT === inputForm.MAGOT ? inputForm : info
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
    fetch("http://localhost:8000/got", {
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
            <label>Mã gót</label>
            <input
              name="MAGOT"
              readOnly={stateTable.inforShowTable.action_row === "edit"}
              value={inputForm["MAGOT"]}
              onChange={(e) => handleChangeInformationForm(e)}
            />
          </div>

          <div className={styles.item}>
            <label>Tên gót</label>
            <input
              name="TENGOT"
              value={inputForm["TENGOT"]}
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
        </div>

        <div className={styles.image_container}>
          <label className={styles.label_choose_image} for="img">
            Chọn hình ảnh
          </label>
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
        <button onClick={handleSaveFrom}>Lưu</button>
        <button>Button 2</button>
        <button>Đóng</button>
      </div>
    </div>
  );
};

export default FormGot;
