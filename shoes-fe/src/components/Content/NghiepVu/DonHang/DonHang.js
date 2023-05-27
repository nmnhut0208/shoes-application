import { useEffect, useState, useMemo } from "react";
import moment from "moment";

import {
  INFO_COLS_DONHANG,
  COLS_HAVE_SUM_FOOTER,
  COLS_HAVE_SELECT_INPUT,
} from "./ConstantVariable";
import { Modal } from "~common_tag";
import { useTableContext, actions_table } from "~table_context";
import { renderDataEmpty } from "~utils/processing_data_table";

import {
  TableDonHang,
  FormGiay,
  FormMau,
  DanhMucGiayKhachHang,
  TableMaKH,
  OptionMau,
} from "./components";
import styles from "./DonHang.module.scss";
import { Popover } from "antd";

const updateSODH = (sodh) => {
  console.log("save so don hang");
  fetch("http://localhost:8000/hethong/donhang/SODH", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ LASTNUMBER: sodh }),
  }).catch((error) => {
    console.log("error: ", error);
  });
};

const saveDonDatHang = (formInfoDonHang, dataDatHang) => {
  for (let i = 0; i < dataDatHang.length; i++) {
    dataDatHang[i] = { ...dataDatHang[i], ...formInfoDonHang };
  }
  console.log("save don hang");
  fetch("http://localhost:8000/donhang", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataDatHang),
  })
    .then((response) => {
      console.log("response: ", response);
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

const updateFormDonHang = (
  formInfoDonHang,
  setFormInfoDonHang,
  setLastestDH
) => {
  fetch("http://localhost:8000/hethong/donhang/SODH")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(":data: ", data);
      console.log("today: ", moment().format("YYYY-MM-DD HH:mm:ss"));
      let sodh = data["SODH"];
      setFormInfoDonHang({
        ...formInfoDonHang,
        SODH: sodh,
        NGAYDH: moment().format("YYYY-MM-DD HH:mm:ss"),
        NGAYGH: moment().add(5, "d").format("YYYY-MM-DD HH:mm:ss"),
      });
      setLastestDH(data["LastestDH"]);
    })
    .catch((err) => {
      console.log(err);
    });
};

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
  console.log("formInfoDonHang: ", formInfoDonHang);

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
        let listMauDefault = [
          { lable: "", value: null },
          { label: "", value: "" },
        ];
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
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
  }, []);

  // lúc đầu render form với ID Đơn hàng tự gen
  // ngày tháng hiện tại

  // TODO: còn thiếu 1 logic
  // Khi user nhập số đơn hàng mà đủ format
  // query thông tin => show => để user có thể chỉnh sửa khi lỡ nhập đơn hàng sai
  // hay nên để chức năng sửa lúc truy vấn luôn ta @@
  // thì khỏi làm thêm việc này

  const convertDate = (date) => {
    return moment(date, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
  };

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

  const handleChangeForm = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = e.target.value;
    setFormInfoDonHang(data);
  };

  const handleChangeFormForTypeDate = (e) => {
    const data = { ...formInfoDonHang };
    data[e.target.name] = moment(e.target.value, "YYYY-MM-DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
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
    alert("Lưu thông tin trước khi save bạn nhé!");
    updateFormDonHang(formInfoDonHang, setFormInfoDonHang, setLastestDH);
    setDataTable(renderDataEmpty(INFO_COLS_DONHANG, 1));
  };

  const handleSaveDonHang = () => {
    // lọc những loại giày được đặt, số lượng > 0
    // save database

    let dataDatHang = dataTable.slice(0, dataTable.length - 1);
    // remove the last empty line
    console.log("dataDatHang: ", dataDatHang);
    dataDatHang = dataDatHang.filter((data) => data["SOLUONG"] > 0);
    console.log("dataDatHang: ", dataDatHang);
    if (dataDatHang.length == 0) {
      alert("Bạn chưa đặt hàng hoặc chưa chọn số lượng mỗi loại giày cần đặt!");
      return;
    } else {
      // send API to save database
      // insert list
      // update lại flag nào để để biết mã đơn hàng này đã được lưu
      // để lỡ chú lưu rồi lại lưu tiếp
      // SODH: đã lưu => true
      // check lại trước khi lưu
      saveDonDatHang(formInfoDonHang, dataDatHang);
      console.log("dataDatHang: ", dataDatHang);
      updateSODH(lastestDH);
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
        //you can access a cell in many callback column definition options like this
        info["Cell"] = ({ cell }) => {
          return (
            <>
              <OptionMau
                init={dataTable[cell.row.id][cell.column.id]}
                id_row={cell.row.id}
                id_column={cell.column.id}
                dataTable={dataTable}
                dataMau={dataMau}
                handleChange={(value) => {
                  dataTable[cell.row.id][cell.column.id] = value;
                  setDataTable([...dataTable]);
                }}
              />
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
                onChange={(e) => handleChangeForm(e)}
                readOnly={true}
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
                  onChange={(e) => handleChangeForm(e)}
                  readOnly={true}
                  // readOnly={view}
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
          <FormMau />
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
