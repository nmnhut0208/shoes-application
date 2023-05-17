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
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 15 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên giày",
    key: "TENGIAY",
    width: 30 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu sườn",
    key: "TENMAUSUON",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu cá",
    key: "TENMAUCA",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu quai",
    key: "TENMAUQUAI",
    width: 12 * rem_to_px,
    enableEditing: true,
  },
];

const columnsSubInfoGiay = processingInfoColumnTable(listSubInforGiay);

const DetailInfoGiay = ({ data, rowSelection, setRowSelection }) => {
  return (
    <div style={{ height: "auto" }}>
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
          name="MAGIAY"
          value={form["MAGIAY"]}
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

      <span>{form["TENGIAY"]}</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair}>
          <label>Màu sườn</label>
          <input name="TENMAUSUON" value={form["TENMAUSUON"]} />
        </div>
        <div className={styles.group_input_row}>
          <div className={styles.pair}>
            <label>Màu cá</label>
            <input name="TENMAUCA" value={form["TENMAUCA"]} />
          </div>
          <div className={styles.pair}>
            <label>Màu quai</label>
            <input name="TENMAUQUAI" value={form["TENMAUQUAI"]} />
          </div>
        </div>
      </div>
      <label>Thợ đế</label>
      <select
        name="THODE"
        value={form["THODE"]}
        onChange={(e) => handleChangeForm(e)}
      >
        <option value="thu">De Thu</option>
        <option value="ngoc">De Ngon</option>
        <option value="an">De An</option>
        <option value="nhien">De Nhien</option>
      </select>

      <span>{form["THODE"]}</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair_tho_quai}>
          <label>Thợ quai</label>
          <select
            name="THOQUAI"
            value={form["THOQUAI"]}
            onChange={(e) => handleChangeForm(e)}
          >
            <option value="Cong">Quai Cong</option>
            <option value="Lan">Quai Lan</option>
            <option value="Hoang">Quai Hoang</option>
            <option value="Ly">Quang Ly</option>
          </select>
        </div>
        <span className={styles.span_thoquai}>{form["THOQUAI"]}</span>
      </div>
      <div className={styles.content_size}>
        <div className={styles.pair_info}>
          <label>Size 0</label>
          <input
            name="SIZE0"
            type="number"
            min="0"
            readOnly={form["SIZE0"] !== "" && parseInt(form["SIZE0"]) == 0}
            value={form["SIZE0"]}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 5</label>
          <input
            name="SIZE5"
            value={form["SIZE5"]}
            type="number"
            min="0"
            readOnly={form["SIZE5"] !== "" && parseInt(form["SIZE5"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 6</label>
          <input
            name="SIZE6"
            value={form["SIZE6"]}
            type="number"
            min="0"
            readOnly={form["SIZE6"] !== "" && parseInt(form["SIZE6"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 7</label>
          <input
            name="SIZE7"
            value={form["SIZE7"]}
            type="number"
            min="0"
            readOnly={form["SIZE7"] !== "" && parseInt(form["SIZE7"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 8</label>
          <input
            name="SIZE8"
            value={form["SIZE8"]}
            type="number"
            min="0"
            readOnly={form["SIZE8"] !== "" && parseInt(form["SIZE8"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 9</label>
          <input
            name="SIZE9"
            value={form["SIZE9"]}
            type="number"
            min="0"
            readOnly={form["SIZE9"] !== "" && parseInt(form["SIZE9"]) == 0}
            onChange={(e) => handleChangeForm(e)}
          />
        </div>
      </div>
      <label>Diễn giải</label>
      <input
        className={styles.input_diengiai}
        name="DIENGIAIDONG"
        value={form["DIENGIAIDONG"]}
        onChange={(e) => handleChangeForm(e)}
      />
    </div>
  );
};

export default memo(PhanCongForm);
