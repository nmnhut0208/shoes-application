import { useState, useEffect, useMemo } from "react";
import styles from "./FormQuai.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";
import { CustomAlert } from "~utils/alert_custom";

import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { getImageOfDanhMuc } from "~utils/api_get_image";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";

const list_input_required = {
  MAQUAI: "Mã quai",
  TENQUAI: "Tên quai",
  DONGIA: "Đơn giá quai",
};

const FormQuai = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [stateItem, dispatchItem] = useItemsContext();
  const view = useMemo(
    () => stateTable.inforShowTable.action_row === "view",
    []
  );
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  const [image_url, setImageURL] = useState("");
  const [image_base64, setImageBase64] = useState("");

  useEffect(() => {
    if (inputForm["MAQUAI"] != "" && image_base64 === "") {
      getImageOfDanhMuc("quai", inputForm["MAQUAI"], "MAQUAI").then((value) => {
        setImageBase64(value);
        setInputForm({ ...inputForm, HINHANH: value });
      });
    }
  }, []);

  const handleChangeInformationForm = (e) => {
    const data = { ...inputForm };
    data[e.target.name] = e.target.value;
    setInputForm(data);
  };

  const handleSaveFrom = () => {
    for (let key in list_input_required) {
      if (inputForm[key] === undefined || inputForm[key] === "") {
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
        CustomAlert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
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
        CustomAlert("Lưu thành công.");
      })
      .catch((error) => {
        console.log("error: ", error);
        CustomAlert("Xảy ra lỗi. Chưa lưu được.");
      });
    dispatchTable(actions_table.setModeShowModal(false));
  };

  const changeImage = (e) => {
    if (e.target.value !== "") {
      var reader = new FileReader();
      reader.onload = (e) => {
        var imgElement = document.createElement("img");
        imgElement.src = e.target.result;
        imgElement.onload = function () {
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");

          // Set new dimensions for the canvas (and therefore the compressed image)
          var maxWidth = 1200; // example, change this size to fit your requirements
          var maxHeight = 1200; // example, change this size to fit your requirements
          var width = imgElement.width;
          var height = imgElement.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Draw the resized image onto the canvas
          ctx.drawImage(imgElement, 0, 0, width, height);

          // Get the image from the canvas with lower quality (quality from 0.1 to 1.0)
          var compressedDataURL = canvas.toDataURL("image/jpeg", 0.7); // Quality 50%

          // Remove the data URL prefix to get the pure base64 string
          var base64String = compressedDataURL.split(",")[1];
          let image = "data:image/png;base64,".concat(base64String);
          setImageBase64(image);
          setInputForm({ ...inputForm, HINHANH: image });
        };
      };
      reader.readAsDataURL(e.target.files[0]);
      setImageURL("");
    }
  };

  const handleDeleteImage = (e) => {
    setImageBase64("");
    setImageURL("");
    setInputForm({ ...inputForm, HINHANH: "" });
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
              autocomplete="off"
            />
          </div>

          <div className={styles.item}>
            <label>Tên quai</label>
            <input
              readOnly={view}
              name="TENQUAI"
              value={inputForm["TENQUAI"]}
              onChange={(e) => handleChangeInformationForm(e)}
              autocomplete="off"
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
              onKeyDown={handleDisableKeyDownUp}
              onKeyUp={handleDisableKeyDownUp}
              onFocus={handleFocus}
            />
          </div>

          <div className={styles.item}>
            <label>Ghi chú</label>
            <input
              readOnly={view}
              name="GHICHU"
              value={inputForm["GHICHU"]}
              onChange={(e) => handleChangeInformationForm(e)}
              autocomplete="off"
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

          <button onClick={handleDeleteImage} style={{ border: "none" }}>
            Xoá hình ảnh
          </button>
        </div>
      </div>

      <div className={styles.button_container}>
        {!view && <button onClick={handleSaveFrom}>Lưu</button>}
      </div>
    </div>
  );
};

export default FormQuai;
