import { useState, memo, useEffect } from "react";
import { Popover } from "antd";
import MaterialReactTable from "material-react-table";

import clsx from "clsx";
import { rem_to_px } from "~config/ui";
import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";
import styles from "../PhanCong.module.scss";
import styles_form from "./PhanCongForm.module.scss";

const listSubInforGiay = [
  { key: "Mã giày", width: 15 * rem_to_px, enableEditing: false },
  { key: "Tên giày", width: 30 * rem_to_px, enableEditing: false },
  { key: "Màu sườn", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu cá", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu quai", width: 12 * rem_to_px, enableEditing: true },
];

const columnsSubInfoGiay = processingInfoColumnTable(listSubInforGiay);

const SubTable = ({ data, rowSelection, setRowSelection }) => {
  console.log("re-render sub table when hover", data);
  return (
    <div style={{ height: "auto" }}>
      <h1>{data.length}</h1>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columnsSubInfoGiay}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // scroll to bottom
        // enableRowVirtualization
        // muiTableContainerProps={{
        //   sx: { maxHeight: "30rem" },
        // }}
        // row selection
        enableMultiRowSelection={false}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
      />
    </div>
  );
};

const PhanCongForm = ({ form, setChiTietPhanCong, listGiayWillPhanCong }) => {
  console.log("PhanCongForm: re-render", form);
  console.log("listGiayWillPhanCong: ", listGiayWillPhanCong);
  const [rowSelection, setRowSelection] = useState({});
  console.log("rowSelection: ", rowSelection);
  useEffect(() => {
    let keys = Object.keys(rowSelection);
    if (keys.length > 0) {
      console.log("useEffect rowSelection: ", rowSelection);
      setChiTietPhanCong(listGiayWillPhanCong[keys[0]]);
    }
  }, [rowSelection]);

  useEffect(() => {
    setRowSelection({});
  }, [listGiayWillPhanCong]);
  /*
  1 đơn hàng có nhiều mã giày, nên sẽ cập nhật lại select option của
  giày => những thông tin liên quan khác tới giày chỉ show ra chứ ko sửa

  Những thông tin liên quan tới phân công: thợ, size thì mới cho sửa
   */
  // const [form, setForm] = useState({});

  const handleChangeForm = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setChiTietPhanCong(data);
  };
  const handleChangeMaGiay = (e) => {
    // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    // console.log("e: ", e, e.target.value);
    var index = listGiayWillPhanCong.findIndex(
      (item) => item["Mã giày"] == e.target.value
    );
    setChiTietPhanCong(listGiayWillPhanCong[index]);
  };

  return (
    <div className={clsx(styles.phan_cong, styles.form)}>
      <h1 className={styles.title_phancong}>Phân công</h1>
      <label>Mã giày</label>
      <Popover
        placement="bottom"
        content={
          <SubTable
            data={listGiayWillPhanCong}
            rowSelection={rowSelection}
            setRowSelection={setRowSelection}
          />
        }
      >
        <input
          name="Mã giày"
          value={form["Mã giày"]}
          onChange={(e) => handleChangeForm(e)}
          className={styles_form.input_ma_giay}
        />
      </Popover>

      {/* <select
        name="Mã giày"
        value={form["Mã giày"]}
        onChange={(e) => handleChangeMaGiay(e)}
      >
        {listGiayWillPhanCong.length > 0 &&
          listGiayWillPhanCong.map((info, index) => (
            <option value={info["Mã giày"]}>
              {[
                info["Mã giày"],
                // ,
                // info["Tên giày"],
                // info["Màu sườn"],
                // info["Màu cá"],
                // info["Màu quai"],
              ].join("|")}
            </option>
          ))}
      </select> */}

      <span>{form["Tên giày"]}</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair}>
          <label>Màu sườn</label>
          <input name="Màu sườn" value={form["Màu sườn"]} />
        </div>
        <div className={styles.group_input_row}>
          <div className={styles.pair}>
            <label>Màu cá</label>
            <input name="Màu cá" value={form["Màu cá"]} />
          </div>
          <div className={styles.pair}>
            <label>Màu quai</label>
            <input name="Màu quai" value={form["Màu quai"]} />
          </div>
        </div>
      </div>
      <label>Thợ đế</label>
      <select
        name="Thợ đế"
        value={form["Thợ đế"]}
        onChange={(e) => handleChangeForm(e)}
      >
        <option value="thu">De Thu</option>
        <option value="ngoc">De Ngon</option>
        <option value="an">De An</option>
        <option value="nhien">De Nhien</option>
      </select>
      {/* <input
        
      /> */}
      <span>{form["Thợ đế"]}</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair_tho_quai}>
          <label>Thợ quai</label>
          <select
            name="Thợ quai"
            value={form["Thợ quai"]}
            onChange={(e) => handleChangeForm(e)}
          >
            <option value="Cong">Quai Cong</option>
            <option value="Lan">Quai Lan</option>
            <option value="Hoang">Quai Hoang</option>
            <option value="Ly">Quang Ly</option>
          </select>
          {/* <input
            name="Thợ quai"
            value={form["Thợ quai"]}
            onChange={(e) => handleChangeForm(e)}
          /> */}
          {/* select box */}
        </div>
        <span className={styles.span_thoquai}>{form["Thợ quai"]}</span>
      </div>
      <div className={styles.content_size}>
        <div className={styles.pair_info}>
          <label>Size 0</label>
          <input
            name="Size 0"
            type="number"
            min="0"
            readOnly={form["Size 0"] !== "" && parseInt(form["Size 0"]) == 0}
            value={form["Size 0"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 5</label>
          <input
            name="Size 5"
            value={form["Size 5"]}
            type="number"
            min="0"
            readOnly={form["Size 5"] !== "" && parseInt(form["Size 5"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 6</label>
          <input
            name="Size 6"
            value={form["Size 6"]}
            type="number"
            min="0"
            readOnly={form["Size 6"] !== "" && parseInt(form["Size 6"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 7</label>
          <input
            name="Size 7"
            value={form["Size 7"]}
            type="number"
            min="0"
            readOnly={form["Size 7"] !== "" && parseInt(form["Size 7"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 8</label>
          <input
            name="Size 8"
            value={form["Size 8"]}
            type="number"
            min="0"
            readOnly={form["Size 8"] !== "" && parseInt(form["Size 8"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 9</label>
          <input
            name="Size 9"
            value={form["Size 9"]}
            type="number"
            min="0"
            readOnly={form["Size 9"] !== "" && parseInt(form["Size 9"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
      </div>
      <label>Diễn giải</label>
      <input
        className={styles.input_diengiai}
        name="Diễn giải"
        value={form["Diễn giải"]}
        onChange={(e) => handleChangeForm(e)}
      />
    </div>
  );
};

export default PhanCongForm;
