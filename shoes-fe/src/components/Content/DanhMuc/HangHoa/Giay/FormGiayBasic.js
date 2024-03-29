import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import styles from "./FormGiayBasic.module.scss";
import {
  ItemKhachHang,
  ItemDe,
  ItemSuon,
  ItemCa,
  ItemQuai,
  ItemMau,
} from "~items";
import { getImageOfDanhMuc } from "~utils/api_get_image";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";
import { useItemsContext } from "~items_context";

let list_info_generator_MAGIAY = ["MAKH", "SortID", "MASUON", "MAQUAI"];

const FormGiayBasic = ({ form, setDataForm, mode }) => {
  const readOnly = useMemo(() => mode === "edit", [mode]);
  const [image_base64, setImageBase64] = useState("");
  const [image_url, setImageURL] = useState("");
  const [stateItem, dispatchItem] = useItemsContext();

  const [maKH, setMaKH] = useState(form["MAKH"]);
  useEffect(() => {
    handleChangeInformationForm({
      MAKH: maKH,
    });
  }, [maKH]);

  useEffect(() => {
    if (form["MAGIAY"] != "" && image_base64 === "") {
      getImageOfDanhMuc("giay", form["MAGIAY"], "MAGIAY").then((value) => {
        setImageBase64(value);
        setDataForm({ ...form, HINHANH: value });
      });
    }
  }, []);

  const handleChangeInformationForm = (dict_data) => {
    const data = { ...form, ...dict_data };
    let name = Object.keys(dict_data)[0];
    if (list_info_generator_MAGIAY.includes(name)) {
      let MAKH = data["MAKH"];
      let MASUON = data["MASUON"];
      data["SortID"] = data["MAQUAI"];
      let SortID = data["SortID"];
      let part_number = "";
      let part_character = "";
      if (SortID && SortID.length > 0) {
        part_number = "000" + SortID.replace(/[^0-9]/g, "");
        part_number = part_number.slice(
          part_number.length - 3,
          part_number.length
        );
        part_character = SortID.replace(/[^a-zA-Z]/g, "");
        if (part_character.length === 0) {
          part_character = "A";
        }
      }
      data["MAGIAY"] = part_character + part_number + "-" + MAKH + "-" + MASUON;
      if (name == "MASUON") {
        let _slitMASUON = dict_data["MASUON"].split("-");
        let magot = _slitMASUON[0];
        let mamui = _slitMASUON[1];
        try {
          data["TENGOT"] = stateItem.infoItemGot.filter(
            (x) => x["value"] == magot
          )[0]["label"];
        } catch {
          data["TENGOT"] = "";
        }
        try {
          data["TENMUI"] = stateItem.infoItemMui.filter(
            (x) => x["value"] == mamui
          )[0]["label"];
        } catch {
          data["TENMUI"] = "";
        }
      }
      data["TENGIAY"] =
        data["TENGOT"] +
        "," +
        data["TENQUAI"] +
        "," +
        data["TENMUI"] +
        "," +
        data["MAQUAI"];
    }

    setDataForm(data);
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
          setDataForm({ ...form, HINHANH: image });
        };
      };
      reader.readAsDataURL(e.target.files[0]);
      setImageURL("");
    }
  };

  const handleDeleteImage = (e) => {
    setImageBase64("");
    setImageURL("");
    setDataForm({ ...form, HINHANH: "" });
  };

  return (
    <div className={styles.form}>
      <div class={styles.form}>
        <div className={styles.group_first}>
          <div className={styles.group_first__left}>
            <div className={styles.group_first__left_row}>
              <label>Mã giày</label>
              <input
                readOnly={readOnly}
                value={form["MAGIAY"]}
                onChange={(e) =>
                  handleChangeInformationForm({ MAGIAY: e.target.value })
                }
                name="MAGIAY"
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã tham chiếu</label>
              <input
                name="SortID"
                readOnly={true}
                value={form["SortID"]}
                onChange={(e) =>
                  handleChangeInformationForm({ SortID: e.target.value })
                }
                className={styles.item_size_middle}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Tên giày</label>
              <input
                name="TENGIAY"
                value={form["TENGIAY"]}
                onChange={(e) =>
                  handleChangeInformationForm({ TENGIAY: e.target.value })
                }
                className={styles.item_size_big}
                autocomplete="off"
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Khách hàng</label>
              <ItemKhachHang
                readOnly={readOnly}
                value={form["MAKH"]}
                setValue={setMaKH}
                size_input={"15rem"}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã đế</label>
              <ItemDe
                initValue={{ value: form["MADE"], label: form["TENDE"] }}
                changeData={(dict_data) => {
                  handleChangeInformationForm({
                    MADE: dict_data["value"],
                    TENDE: dict_data["label"],
                  });
                }}
                size_input={"14rem"}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã sườn</label>
              <ItemSuon
                readOnly={readOnly}
                initValue={{ value: form["MASUON"], label: form["TENSUON"] }}
                changeData={(dict_data) => {
                  handleChangeInformationForm({
                    MASUON: dict_data["value"],
                    TENSUON: dict_data["label"],
                  });
                }}
                size_input={"14rem"}
              />
            </div>

            <div className={styles.group_first__left_row}>
              <label>Mã cá</label>
              <ItemCa
                initValue={{ value: form["MACA"], label: form["TENCA"] }}
                changeData={(dict_data) => {
                  handleChangeInformationForm({
                    MACA: dict_data["value"],
                    TENCA: dict_data["label"],
                  });
                }}
                size_input={"14rem"}
              />
            </div>
          </div>

          <div className={styles.group_first__right}>
            <div className={styles.group_first__right_image}>
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

              <button onClick={handleDeleteImage} style={{ border: "none" }}>
                Xoá hình ảnh
              </button>
            </div>
          </div>
          <br />
        </div>

        <div className={styles.group_second}>
          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Mã quai</label>
              <ItemQuai
                readOnly={readOnly}
                initValue={{ value: form["MAQUAI"], label: form["TENQUAI"] }}
                changeData={(dict_data) => {
                  handleChangeInformationForm({
                    MAQUAI: dict_data["value"],
                    TENQUAI: dict_data["label"],
                  });
                }}
                size_input={"14rem"}
              />
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá trang trí</label>
                <input
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  name="GIATRANGTRI"
                  value={form["GIATRANGTRI"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIATRANGTRI: e.target.value })
                  }
                />
              </div>

              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá tân trang</label>
                <input
                  name="GIATANTRANG"
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  value={form["GIATANTRANG"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIATANTRANG: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Màu</label>
              <ItemMau
                initValue={{ value: form["MAMAU"], label: form["TENMAU"] }}
                changeData={(dict_data) => {
                  handleChangeInformationForm({
                    MAMAU: dict_data["value"],
                    TENMAU: dict_data["label"],
                  });
                }}
                size_input={"14rem"}
              />
            </div>

            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá sườn</label>
                <input
                  name="GIASUON"
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  value={form["GIASUON"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIASUON: e.target.value })
                  }
                />
              </div>

              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Nhân công</label>
                <input
                  name="GIANHANCONG"
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  value={form["GIANHANCONG"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIANHANCONG: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Đơn giá</label>
              <input
                type="number"
                onKeyDown={handleDisableKeyDownUp}
                onKeyUp={handleDisableKeyDownUp}
                onFocus={handleFocus}
                min={0}
                name="DONGIA"
                value={form["DONGIA"]}
                onChange={(e) =>
                  handleChangeInformationForm({ DONGIA: e.target.value })
                }
                className={styles.item_size_middle}
              />
            </div>
            <div className={styles.group_second_row__right}>
              <div className={styles.group_second_row__right_pair}>
                <label>Giá gót</label>
                <input
                  name="GIAGOT"
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  value={form["GIAGOT"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIAGOT: e.target.value })
                  }
                />
              </div>
              <div className={styles.group_second_row__right_pair}>
                <label className={styles.label_custom}>Giá keo</label>
                <input
                  name="GIAKEO"
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  value={form["GIAKEO"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIAKEO: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className={styles.group_second_row}>
            <div className={styles.group_second_row__left}>
              <label>Ghi chú</label>
              <input
                name="GHICHU"
                value={form["GHICHU"]}
                onChange={(e) =>
                  handleChangeInformationForm({ GHICHU: e.target.value })
                }
                className={styles.item_size_big}
                autocomplete="off"
              />
            </div>

            <div className={styles.group_second_row__right}>
              <div
                className={clsx(
                  styles.group_second_row__right_pair,
                  styles.group_second_row__right_gia_von
                )}
              >
                <label>Giá vốn</label>
                <input
                  name="GIAVON"
                  type="number"
                  onKeyDown={handleDisableKeyDownUp}
                  onKeyUp={handleDisableKeyDownUp}
                  onFocus={handleFocus}
                  min={0}
                  value={form["GIAVON"]}
                  onChange={(e) =>
                    handleChangeInformationForm({ GIAVON: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.group_third}>
          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Trang trí đế</label>
              <textarea
                name="TRANGTRIDE"
                value={form["TRANGTRIDE"]}
                onChange={(e) =>
                  handleChangeInformationForm({ TRANGTRIDE: e.target.value })
                }
              />
            </div>

            <div className={styles.group_third_row_item}>
              <label>Trang trí quai</label>
              <textarea
                name="TRANGTRIQUAI"
                value={form["TRANGTRIQUAI"]}
                onChange={(e) =>
                  handleChangeInformationForm({ TRANGTRIQUAI: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.group_third_row}>
            <div className={styles.group_third_row_item}>
              <label>Ghi chú đế</label>
              <textarea
                name="GHICHUDE"
                value={form["GHICHUDE"]}
                onChange={(e) =>
                  handleChangeInformationForm({ GHICHUDE: e.target.value })
                }
              />
            </div>

            <div className={styles.group_third_row_item}>
              <label>Ghi chú quai</label>
              <textarea
                name="GHICHUQUAI"
                value={form["GHICHUQUAI"]}
                onChange={(e) =>
                  handleChangeInformationForm({ GHICHUQUAI: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGiayBasic;
