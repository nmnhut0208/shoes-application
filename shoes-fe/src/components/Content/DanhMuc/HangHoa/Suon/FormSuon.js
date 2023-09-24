import { useState, useEffect, useMemo } from "react";
import styles from "./FormSuon.module.scss";
import { useTableContext, actions_table } from "~table_context";
import {
  useItemsContext,
  actions as actions_items_context,
} from "~items_context";
import { checkMaDanhMucExisted } from "~danh_muc/helper";
import { ItemGot, ItemMui } from "~items";
import { getImageOfDanhMuc } from "~utils/api_get_image";

const FormSuon = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const [inputForm, setInputForm] = useState(stateTable.inforShowTable.record);
  const [stateItem, dispatchItem] = useItemsContext();

  const [image_url, setImageURL] = useState("");
  const [image_base64, setImageBase64] = useState("");

  useEffect(() => {
    if (inputForm["MASUON"] != "" && image_base64 === "") {
      getImageOfDanhMuc("suon", inputForm["MASUON"], "MASUON").then((value) => {
        setImageBase64(value);
        setInputForm({ ...inputForm, HINHANH: value });
      });
    }
  }, []);

  const view = useMemo(
    () => stateTable.inforShowTable.action_row === "view",
    []
  );

  const handleChangeInformationForm = (dict_data) => {
    const data = { ...inputForm, ...dict_data };
    let name = Object.keys(dict_data)[0];
    let list_feature = ["MAGOT", "MAMUI"];
    if (list_feature.includes(name)) {
      let masuon = data["MAGOT"] + "-" + data["MAMUI"];
      data["MASUON"] = masuon;
      data["TENSUON"] = masuon;
    }
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
      if (
        checkMaDanhMucExisted(
          inputForm["MASUON"],
          stateTable.inforShowTable.infoTable,
          "MASUON"
        )
      ) {
        alert("MÃ này đã tồn tại. Bạn không thể thêm!!!");
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
            <label>Mã sườn</label>
            <input
              name="MASUON"
              readOnly={true}
              value={inputForm["MASUON"]}
              autocomplete="off"
            />
          </div>

          <div className={styles.item}>
            <label>Tên sườn</label>
            <input
              readOnly={true}
              name="TENSUON"
              value={inputForm["TENSUON"]}
              autocomplete="off"
            />
          </div>

          <div className={styles.item}>
            <label>Mã gót</label>
            <ItemGot
              readOnly={stateTable.inforShowTable.action_row === "edit" || view}
              initValue={{
                value: inputForm["MAGOT"],
                label: inputForm["TENGOT"],
              }}
              changeData={(dict_data) => {
                handleChangeInformationForm({
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
              readOnly={stateTable.inforShowTable.action_row === "edit" || view}
              initValue={{
                value: inputForm["MAMUI"],
                label: inputForm["TENMUI"],
              }}
              changeData={(dict_data) => {
                handleChangeInformationForm({
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
              onChange={(e) =>
                handleChangeInformationForm({ GHICHU: e.target.value })
              }
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

export default FormSuon;
