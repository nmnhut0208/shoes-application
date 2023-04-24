import { useEffect, useState, useMemo } from "react";
import styles from "./DonHang.module.scss";
import { FormGiay } from "~hang_hoa";
import SubTable from "./SubTable";
import { renderDataEmpty } from "../PhanCong/ConstantVariable";

const font_size_html = 62.5;
const font_size_default_rem = 16;
const rem_to_px = (font_size_html * font_size_default_rem) / 100;

const list_key = [
  { key: "STT", width: 7 * rem_to_px, enableEditing: false },
  { key: "Mã giày", width: 21 * rem_to_px, enableEditing: false },
  { key: "Tên giày", width: 40 * rem_to_px, enableEditing: false },
  { key: "Màu đế", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu sườn", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu cá", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu quai", width: 12 * rem_to_px, enableEditing: false },
  { key: "Size 5", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 6", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 7", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 8", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 9", width: 8 * rem_to_px, enableEditing: true },
  { key: "Size 0", width: 8 * rem_to_px, enableEditing: true },
  { key: "Số lượng", width: 24 * rem_to_px, enableEditing: false },
  { key: "Giá bán", width: 24 * rem_to_px, enableEditing: false },
];

const columns_have_sum_feature = [
  "Size 5",
  "Size 6",
  "Size 7",
  "Size 8",
  "Size 9",
  "Size 0",
  "Số lượng",
];

const DonHang = () => {
  const [renderUI, setRenderUI] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  // const [dataTable, setDataTable] = useState(() => {
  //   return renderDataEmpty(infoColumns, 50);
  // });

  const infoColumns = useMemo(() => {
    const infoColumnsInit = [];

    for (var obj in list_key) {
      let key = list_key[obj]["key"];
      var info = {
        header: list_key[obj]["key"],
        size: list_key[obj]["width"],
        accessorKey: list_key[obj]["key"],
        enableEditing: list_key[obj]["enableEditing"],
        key: list_key[obj]["key"].toLowerCase(),
      };

      if (key === "Tên giày") info["Footer"] = () => <div>Tổng cộng</div>;
      if (columns_have_sum_feature.includes(key)) {
        let sum_value = dataTable.reduce((total, row) => total + row[key], 0);
        info["Footer"] = () => <div>{sum_value}</div>;
      }
      infoColumnsInit.push(info);
    }
    return infoColumnsInit;
  }, [dataTable]);

  useEffect(() => {
    fetch("http://localhost:8000/items_donhang")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setRenderUI(true);
        setDataTable(info);
        console.log(dataTable);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return (
    <>
      <div className={styles.form}>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Số đơn hàng</label>
              <input name="Số đơn hàng" />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Mã khách hàng</label>
              <input name="Mã khách hàng" />
              <span>Tên khách hàng</span>
            </div>
          </div>
          <input
            type="checkbox"
            name="Giá lẻ"
            value="true"
            className={styles.checkbox}
          />
          <span for="Giá lẻ" className={styles.span_for_checkbox}>
            Giá lẻ
          </span>
        </div>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Ngày đơn hàng</label>
              <input type="date" name="Ngày đơn hàng" />
            </div>
            <div className={styles.pair}>
              <label>Ngày giao hàng</label>
              <input type="date" name="Ngày giao hàng" />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label className={styles.label_for_textatea}>Diễn dãi</label>
              <textarea />
            </div>
          </div>
        </div>
      </div>
      {
        <SubTable
          columns={infoColumns}
          data={dataTable}
          setDataTable={setDataTable}
        />
      }
    </>
  );
};

export default DonHang;
