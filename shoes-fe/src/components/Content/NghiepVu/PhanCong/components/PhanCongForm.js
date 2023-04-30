import { useState, memo, useEffect, React } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import MaterialReactTable from "material-react-table";

import clsx from "clsx";
import { rem_to_px } from "~config/ui";
import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";
import styles from "../PhanCong.module.scss";

const listSubInforGiay = [
  { key: "Mã giày", width: 15 * rem_to_px, enableEditing: false },
  { key: "Tên giày", width: 30 * rem_to_px, enableEditing: false },
  { key: "Màu sườn", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu cá", width: 12 * rem_to_px, enableEditing: false },
  { key: "Màu quai", width: 12 * rem_to_px, enableEditing: true },
];

const columnsSubInfoGiay = processingInfoColumnTable(listSubInforGiay);

const DetailInfoGiay = ({ data, rowSelection, setRowSelection }) => {
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
  const [rowSelection, setRowSelection] = useState({});

  const handleChangeForm = (e) => {
    const data = { ...form };
    data[e.target.name] = e.target.value;
    setChiTietPhanCong(data);
  };

  // show DetailInfoGiay for MaGiay's detail information
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    let keys = Object.keys(rowSelection);
    if (keys.length > 0) {
      setChiTietPhanCong(listGiayWillPhanCong[keys[0]]);
    }
    setAnchorEl(null);
  }, [rowSelection]);

  return (
    <div className={clsx(styles.phan_cong, styles.form)}>
      <h1 className={styles.title_phancong}>Phân công</h1>
      <label>Mã giày</label>
      <div>
        <input
          name="Mã giày"
          value={form["Mã giày"]}
          onChange={(e) => handleChangeForm(e)}
          onClick={handlePopoverClick}
        />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <DetailInfoGiay
              data={listGiayWillPhanCong}
              rowSelection={{}}
              setRowSelection={setRowSelection}
            />
          </Typography>
        </Popover>
      </div>

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

export default memo(PhanCongForm);
