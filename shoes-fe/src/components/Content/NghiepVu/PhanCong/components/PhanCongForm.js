import { useState, memo, useEffect, React } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import MaterialReactTable from "material-react-table";

import clsx from "clsx";
import { rem_to_px, border_text_table_config } from "~config/ui";

import { processingInfoColumnTable } from "~utils/processing_data_table";
import styles from "../FormNghiepVuPhanCong/FormNghiepVuPhanCong.module.scss";
import { ItemThoDe, ItemThoQuai } from "~items";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";

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
    key: "MAUSUON",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu cá",
    key: "MAUCA",
    width: 12 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Màu quai",
    key: "MAUQUAI",
    width: 12 * rem_to_px,
    enableEditing: true,
  },
];

const columnsSubInfoGiay = processingInfoColumnTable(listSubInforGiay);

const DetailInfoGiay = ({ data, setRowSelection }) => {
  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        {...border_text_table_config}
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
        enableMultiRowSelection={false} //use radio buttons instead of checkboxes
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            row.getToggleSelectedHandler();
            setRowSelection(row.id);
          },
          sx: { cursor: "pointer" },
        })}
      />
    </div>
  );
};

const PhanCongForm = ({ form, setChiTietPhanCong, listGiayWillPhanCong }) => {
  const [rowSelection, setRowSelection] = useState(0);
  const handleChangeForm = (e) => {
    const data = { ...form };
    if (e.target.name.includes("Size")) {
      data[e.target.name] = parseInt(e.target.value);
    } else data[e.target.name] = e.target.value;
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
    setChiTietPhanCong({
      ...listGiayWillPhanCong[rowSelection],
      THODE: form["THODE"],
      THOQUAI: form["THOQUAI"],
    });
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
          trigger="click"
        >
          <Typography sx={{ p: 2 }}>
            <DetailInfoGiay
              data={listGiayWillPhanCong}
              setRowSelection={setRowSelection}
            />
          </Typography>
        </Popover>
      </div>

      <span className={styles.span_text}>{form["TENGIAY"]}</span>
      <div className={styles.phancong_remain}>
        <div className={styles.pair}>
          <label>Màu sườn</label>
          <input name="MAUSUON" value={form["MAUSUON"]} />
        </div>
        <div className={styles.group_input_row}>
          <div className={styles.pair}>
            <label>Màu cá</label>
            <input name="MAUCA" value={form["MAUCA"]} />
          </div>
          <div className={styles.pair}>
            <label>Màu quai</label>
            <input name="MAUQUAI" value={form["MAUQUAI"]} />
          </div>
        </div>
      </div>

      <label>Thợ đế</label>
      <ItemThoDe
        className={styles.info_thode}
        initValue={{ value: form["THODE"], label: form["TENTHODE"] }}
        changeData={(dict_data) => {
          setChiTietPhanCong({
            ...form,
            THODE: dict_data["value"],
            TENTHODE: dict_data["label"],
          });
        }}
        size_input={"19.5rem"}
        size_span={"25rem"}
      />

      <div className={styles.phancong_remain}>
        <div className={styles.info_thoquai}>
          <label>Thợ quai</label>
          <ItemThoQuai
            //
            initValue={{ value: form["THOQUAI"], label: form["TENTHOQUAI"] }}
            changeData={(dict_data) => {
              setChiTietPhanCong({
                ...form,
                THOQUAI: dict_data["value"],
                TENTHOQUAI: dict_data["label"],
              });
            }}
            size_input={"19.5rem"}
            size_span={"30rem"}
          />
        </div>
      </div>
      <div className={styles.content_size}>
        <div className={styles.pair_info}>
          <label>Size 0</label>
          <input
            name="SIZE0"
            type="number"
            min="0"
            // readOnly={form["SIZE0"] !== "" && parseInt(form["SIZE0"]) == 0}
            value={form["SIZE0"]}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 1</label>
          <input
            name="SIZE1"
            type="number"
            min="0"
            // readOnly={form["SIZE1"] !== "" && parseInt(form["SIZE1"]) == 0}
            value={form["SIZE1"]}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 5</label>
          <input
            name="SIZE5"
            value={form["SIZE5"]}
            type="number"
            min="0"
            // readOnly={form["SIZE5"] !== "" && parseInt(form["SIZE5"]) == 0}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 6</label>
          <input
            name="SIZE6"
            value={form["SIZE6"]}
            type="number"
            min="0"
            // readOnly={form["SIZE6"] !== "" && parseInt(form["SIZE6"]) == 0}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 7</label>
          <input
            name="SIZE7"
            value={form["SIZE7"]}
            type="number"
            min="0"
            // readOnly={form["SIZE7"] !== "" && parseInt(form["SIZE7"]) == 0}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 8</label>
          <input
            name="SIZE8"
            value={form["SIZE8"]}
            type="number"
            min="0"
            // readOnly={form["SIZE8"] !== "" && parseInt(form["SIZE8"]) == 0}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
        <div className={styles.pair_info}>
          <label>Size 9</label>
          <input
            name="SIZE9"
            value={form["SIZE9"]}
            type="number"
            min="0"
            // readOnly={form["SIZE9"] !== "" && parseInt(form["SIZE9"]) == 0}
            onChange={(e) => handleChangeForm(e)}
            onKeyDown={handleDisableKeyDownUp}
            onKeyUp={handleDisableKeyDownUp}
            onFocus={handleFocus}
          />
        </div>
      </div>
      <label>Diễn giải</label>
      <input
        className={styles.input_diengiai}
        name="DIENGIAIDONG"
        value={form["DIENGIAIDONG"]}
        onChange={(e) => handleChangeForm(e)}
        autocomplete="off"
      />
    </div>
  );
};

export default memo(PhanCongForm);
