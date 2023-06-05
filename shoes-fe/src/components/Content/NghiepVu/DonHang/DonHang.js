import { useEffect, useState, useMemo } from "react";
import moment from "moment";

import { INFO_COLS_DONHANG } from "./ConstantVariable";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";
import { renderDataEmpty } from "~utils/processing_data_table";

import {
  TableDonHang,
  FormGiay,
  FormMau,
  DanhMucGiayKhachHang,
} from "./components";
import styles from "./DonHang.module.scss";
import {
  updateSODH,
  updateDanhSachMau,
  saveDonDatHang,
  updateFormDonHang,
  updateColumnsInformations,
} from "./helper";
import { ItemKhachHang } from "~items";
import { convertDate } from "~utils/processing_date";

const DonHang = ({ dataView, view }) => {
  // NOTE: ko biết cách vẫn show ra núp edit khi ko có data
  // nên đành để thành thêm 1 dòng trống sau dataTable
  const [dataTable, setDataTable] = useState(() => {
    return renderDataEmpty(INFO_COLS_DONHANG, 1);
  });

  const [dataMau, setDataMau] = useState([]);
  const [isSavedData, setIsSavedData] = useState(false);
  // TODO: note lại trạng thái của page, đã save thông tin page hiện tại chưa
  // nếu save rồi thì thay đổi trạng thái hiện tại thành show
  // xem lại thử logic này cần ko
  const [stateTable, dispatchTable] = useTableContext();
  const [formInfoDonHang, setFormInfoDonHang] = useState({
    // TODO: edit information edit pages
    SODH: "",
    NGUOITAO: "thu",
    DIENGIAIPHIEU: "",
    NGAYDH: "",
    NGAYGH: "",
  });
  const [lastestDH, setLastestDH] = useState(0);

  const [infoFormWillShow, setInfoFormWillShow] = useState({
    giay: false,
    mau: false,
    dmGiaykh: false,
  });

  useEffect(() => {
    updateDanhSachMau(setDataMau);
  }, []); // them dieu kieu check mau thay doi

  useEffect(() => {
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
  }, []);

  // const convertDate = (date) => {
  //   return moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
  // };

  useEffect(() => {
    if (view) {
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

  const handleChangeForm = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = e.target.value;
    setFormInfoDonHang(data);
    setIsSavedData(false);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    setFormInfoDonHang(data);
    setIsSavedData(false);
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
    if (!isSavedData) {
      alert("Lưu thông tin trước khi reset page!");
      return;
    }
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
    setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
    setIsSavedData(false);
  };

  const handleSaveDonHang = () => {
    if (isSavedData) return;

    let dataDatHang = dataTable.slice(0, dataTable.length - 1);
    // remove the last empty line
    dataDatHang = dataDatHang.filter((data) => data["SOLUONG"] > 0);
    if (dataDatHang.length == 0) {
      alert("Bạn chưa đặt hàng hoặc chưa chọn số lượng mỗi loại giày cần đặt!");
      return;
    } else {
      saveDonDatHang(formInfoDonHang, dataDatHang);
      updateSODH(lastestDH);
      setIsSavedData(true);
    }
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
    setIsSavedData(false);
    return updateColumnsInformations(dataMau, dataTable, setDataTable);
  }, [dataTable, dataMau]);

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
                onChange={(e) => handleChangeForm(e)}
                readOnly={true}
              />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label>Mã khách hàng</label>
              <ItemKhachHang
                initValue={{
                  MAKH: formInfoDonHang["MAKH"],
                  TENKH: formInfoDonHang["TENKH"],
                }}
                changeData={(data) => {
                  setFormInfoDonHang({ ...formInfoDonHang, ...data });
                }}
                size_input={"15rem"}
                size_span={"29.7rem"}
                have_span={true}
              />
            </div>
          </div>
          <input
            type="checkbox"
            name="Giá lẻ"
            // value="true"
            value={formInfoDonHang["Giá lẻ"]}
            onChange={(e) => handleChangeForm(e)}
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
                value={convertDate(formInfoDonHang["NGAYDH"])}
                onChange={(e) => handleChangeFormForTypeDate(e)}
                readOnly={view}
              />
            </div>
            <div className={styles.pair}>
              <label>Ngày giao hàng</label>
              <input
                type="date"
                name="NGAYGH"
                value={convertDate(formInfoDonHang["NGAYGH"])}
                onChange={(e) => handleChangeFormForTypeDate(e)}
                readOnly={view}
              />
            </div>
          </div>
          <div className={styles.item_column}>
            <div className={styles.pair}>
              <label className={styles.label_for_textatea}>Diễn dãi</label>
              <textarea
                name="DIENGIAIPHIEU"
                value={formInfoDonHang["DIENGIAIPHIEU"]}
                onChange={(e) => handleChangeForm(e)}
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
          {!view && <button onClick={handleSaveDonHang}>Lưu</button>}
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
          <FormMau dataMau={dataMau} setDataMau={setDataMau} />
        </Modal>
      )}
      {infoFormWillShow["dmGiaykh"] && (
        <Modal>
          <DanhMucGiayKhachHang
            MAKH={formInfoDonHang["MAKH"]}
            dataOrigin={dataTable}
            setInfoSelection={setDataTable}
          />
        </Modal>
      )}
    </>
  );
};

export default DonHang;
