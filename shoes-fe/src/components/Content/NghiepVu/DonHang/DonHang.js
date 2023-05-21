import { useEffect, useState, useMemo } from "react";

import {
  INFO_COLS_DONHANG,
  COLS_HAVE_SUM_FOOTER,
  COLS_HAVE_SELECT_INPUT,
} from "./ConstantVariable";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";
import { renderDataEmpty } from "~utils/processing_data_table";

import TableDonHang from "./TableDonHang";
import FormGiay from "./FormGiay";
import FormMau from "./FormMau";
import DanhMucGiayKhachHang from "./DanhMucGiayKhachHang";
import styles from "./DonHang.module.scss";
import { Popover } from "antd";
import TableMaKH from "./TableMaKH";
import OptionMau from "./OptionMau";

const DonHang = ({ dataView, view }) => {
  // NOTE: ko biết cách vẫn show ra núp edit khi ko có data
  // nên đành để thành thêm 1 dòng trống sau dataTable
  const [dataTable, setDataTable] = useState(() => {
    return renderDataEmpty(INFO_COLS_DONHANG, 1);
  });

  console.log("dataTable: ", dataTable);

  const [dataTableKhachHang, setDataTableKhachHang] = useState([]);
  const [rowSelectionMaKH, setRowSelectionMaKH] = useState({});

  const [dataMau, setDataMau] = useState([]);

  useEffect(() => {
    // thay đổi khi thêm màu
    fetch("http://localhost:8000/mau")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        console.log("info: ", info);
        let listMau = info.map(function (ob) {
          return { label: ob.TENMAU, value: ob.MAMAU };
        });
        let listMauDefault = [{ null: "" }, { "": "" }];
        setDataMau([...listMauDefault, ...listMau]);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  useEffect(() => {
    let keys = Object.keys(rowSelectionMaKH);
    if (keys.length > 0) {
      setFormInfoDonHang({
        ...formInfoDonHang,
        MAKH: dataTableKhachHang[keys[0]]["MAKH"],
        TENKH: dataTableKhachHang[keys[0]]["TENKH"],
      });
    }
  }, [rowSelectionMaKH]);

  useEffect(() => {
    fetch("http://localhost:8000/khachhang")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTableKhachHang(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  // lúc đầu render form với ID Đơn hàng tự gen
  // ngày tháng hiện tại

  // TODO: còn thiếu 1 logic
  // Khi user nhập số đơn hàng mà đủ format
  // query thông tin => show => để user có thể chỉnh sửa khi lỡ nhập đơn hàng sai
  // hay nên để chức năng sửa lúc truy vấn luôn ta @@
  // thì khỏi làm thêm việc này

  useEffect(() => {
    if (view) {
      console.log("dataView: ", dataView);
      setFormInfoDonHang(dataView);
      fetch("http://localhost:8000/items_donhang_with_id", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: dataView["SODH"], nof: 30 }),
      })
        .then((response) => {
          return response.json();
        })
        .then((info) => {
          setDataTable(info);
          console.log(dataTable);
        })
        .catch((err) => {
          console.log(":error: ", err);
        });
    }
  }, [dataView]);

  const [stateTable, dispatchTable] = useTableContext();
  const [formInfoDonHang, setFormInfoDonHang] = useState({});
  const [infoFormWillShow, setInfoFormWillShow] = useState({
    giay: false,
    mau: false,
    dmGiaykh: false,
  });

  const handleChangeForm = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = e.target.value;
    setFormInfoDonHang(data);
  };
  const handleThemGiay = () => {
    setInfoFormWillShow({
      giay: true,
      mau: false,
      dmGiaykh: false,
    });
    dispatchTable(actions_table.setTitleModal("Giày - F0025"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const handleThemMau = () => {
    setInfoFormWillShow({
      giay: false,
      mau: true,
      dmGiaykh: false,
    });
    dispatchTable(actions_table.setTitleModal("Màu sắc - F0010"));
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const handleNhapTiep = () => {
    // Render lại số đơn hàng
    // Reset lại hết những thông tin hiện có
    // để chú nhận đơn hàng mới
    setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
  };

  const handleClickMaGiay = () => {
    setInfoFormWillShow({
      giay: false,
      mau: false,
      dmGiaykh: true,
    });
    dispatchTable(
      actions_table.setTitleModal("Danh mục giày của Khách hàng - F0049")
    );
    dispatchTable(actions_table.setModeShowModal(true));
  };

  const infoColumns = useMemo(() => {
    const infoColumnsInit = [];

    for (var obj in INFO_COLS_DONHANG) {
      let key = INFO_COLS_DONHANG[obj]["key"];
      var info = {
        header: INFO_COLS_DONHANG[obj]["header"],
        size: INFO_COLS_DONHANG[obj]["width"],
        accessorKey: INFO_COLS_DONHANG[obj]["key"],
        enableEditing: INFO_COLS_DONHANG[obj]["enableEditing"],
        key: INFO_COLS_DONHANG[obj]["key"].toLowerCase(),
      };

      if (COLS_HAVE_SELECT_INPUT.includes(key)) {
        // info["editSelectOptions"] = dataMau;
        // info["editVariant"] = "select";
        // info["enableEditing"] = true;

        //you can access a cell in many callback column definition options like this
        info["Cell"] = ({ cell }) => {
          let _key = cell.row.id + "-" + cell.column.id;
          console.log("_key", _key);
          return (
            <>
              {/* <label for={_key}>{cell.getValue()}</label> */}
              <select
                id={_key}
                style={{ display: "none" }}
                onChange={(e) => {
                  dataTable[cell.row.id][cell.column.id] = e.target.value;
                  setDataTable([...dataTable]);
                }}
              >
                <OptionMau dataMau={dataMau} />
              </select>
            </>
          );
        };
      }

      if (key === "TENGIAY") info["Footer"] = () => <div>Tổng cộng</div>;
      if (COLS_HAVE_SUM_FOOTER.includes(key)) {
        let sum_value = dataTable.reduce((total, row) => total + row[key], 0);
        info["Footer"] = () => <div>{sum_value}</div>;
      }
      infoColumnsInit.push(info);
    }
    return infoColumnsInit;
  }, [dataTable]);

  return (
    <>
      <div className={styles.form}>
        <div className={styles.group_item}>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Số đơn hàng</label>
              <input
                name="SODH"
                value={formInfoDonHang["SODH"]}
                onChange={(e) => setFormInfoDonHang(e)}
                readOnly={view}
              />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Mã khách hàng</label>
              <Popover
                placement="bottomLeft"
                content={
                  <TableMaKH
                    data={dataTableKhachHang}
                    rowSelection={rowSelectionMaKH}
                    setRowSelection={setRowSelectionMaKH}
                  />
                }
              >
                <input
                  name="MAKH"
                  value={formInfoDonHang["MAKH"]}
                  onChange={(e) => setFormInfoDonHang(e)}
                  readOnly={view}
                />
              </Popover>
              <input readOnly={true} value={formInfoDonHang["TENKH"]} />
            </div>
          </div>
          <input
            type="checkbox"
            name="Giá lẻ"
            // value="true"
            value={formInfoDonHang["Giá lẻ"]}
            onChange={(e) => setFormInfoDonHang(e)}
            readOnly={view}
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
              <input
                type="date"
                name="NGAYDH"
                value={formInfoDonHang["NGAYDH"]}
                onChange={(e) => setFormInfoDonHang(e)}
                readOnly={view}
              />
            </div>
            <div className={styles.pair}>
              <label>Ngày giao hàng</label>
              <input
                type="date"
                name="NGAYGH"
                value={formInfoDonHang["NGAYGH"]}
                onChange={(e) => setFormInfoDonHang(e)}
                readOnly={view}
              />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label className={styles.label_for_textatea}>Diễn dãi</label>
              <textarea
                value={formInfoDonHang["DIENGIAIPHIEU"]}
                onChange={(e) => setFormInfoDonHang(e)}
                readOnly={view}
              />
            </div>
          </div>
        </div>
      </div>
      {
        <TableDonHang
          columns={infoColumns}
          data={dataTable}
          setDataTable={setDataTable}
          handleAddGiay={handleClickMaGiay}
          view={view}
        />
      }
      <div className={styles.form}>
        {/* Không hiểu tại sao gộp 2 form lại thì ko nhận extend nên phải tách đỡ ra vầy */}
        <div className={styles.group_button}>
          <button onClick={handleThemGiay}>Thêm giày</button>
          <button onClick={handleThemMau}>Thêm màu</button>
          {!view && <button onClick={handleNhapTiep}>Nhập tiếp</button>}
          {!view && <button>Lưu</button>}
          <button>In</button>
          <button>Đóng</button>
        </div>
      </div>
      {infoFormWillShow["giay"] && (
        <Modal>
          <FormGiay />
        </Modal>
      )}
      {infoFormWillShow["mau"] && (
        <Modal>
          <FormMau />
        </Modal>
      )}
      {infoFormWillShow["dmGiaykh"] && (
        <Modal>
          <DanhMucGiayKhachHang
            id_khachhang={formInfoDonHang["MAKH"]}
            dataOrigin={dataTable}
            setInfoSelection={setDataTable}
          />
        </Modal>
      )}
    </>
  );
};

export default DonHang;
