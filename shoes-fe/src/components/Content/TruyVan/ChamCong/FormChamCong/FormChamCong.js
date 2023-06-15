import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import styles from "./FormChamCong.module.scss";
import { Popover } from "antd";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { rem_to_px } from "~config/ui";
import { convertDate } from "~utils/processing_date";
import moment from "moment";

const list_key = [
  { header: "Mã giày", key: "MAGIAY" },
  { header: "Tên giày", key: "TENGIAY" },
  { header: "Số lượng", key: "SOLUONG" },
  // { header: "Số lượng hoàn thành", key: "SLCHAMCONG" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["header"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"],
  };
  infoColumns.push(info);
}

const FormChamCong = ({ infoForm, setData }) => {
  const [dataTable, setDataTable] = useState([]);

  console.log("ChamCong", infoForm["MAKY"]);

  const handleDelete = () => {
    const send_data = {
      MAKY: infoForm["MAKY"],
      MANVIEN: infoForm["MANVIEN"],
      SOPHIEU: infoForm["SOPHIEU"],
    };
    fetch("http://localhost:8000/tv_chamcong", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data["status"] === "success") {
          fetch("http://localhost:8000/tv_chamcong")
            .then((response) => {
              return response.json();
            })
            .then((info) => {
              setData(info);
            })
            .catch((err) => {
              console.log(err);
            });
          alert("Xóa thành công");
        } else {
          alert("Xóa thất bại");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const send_data = {
      MAKY: infoForm["MAKY"],
      MANVIEN: infoForm["MANVIEN"],
      SOPHIEU: infoForm["SOPHIEU"],
    };
    fetch("http://localhost:8000/tv_chamcong", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(send_data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setDataTable(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.left}>
          {/* <label className={styles.title}>Đơn hàng</label> */}
          <div className={styles.left_row}>
            <label>Mã kỳ</label>

            <input
              value={infoForm["MAKY"]}
              type="text"
              className={styles.medium}
            />
          </div>
          <div className={styles.left_row}>
            <label>Mã nhân viên</label>

            <input
              value={infoForm["MANVIEN"]}
              type="text"
              className={styles.medium}
            />
          </div>
          <div className={styles.left_row}>
            <label>Phiếu PC</label>
            <input
              value={infoForm["SOPHIEU"]}
              type="text"
              className={styles.medium}
            />
          </div>
        </div>
        <div className={styles.right}>
          {/* <label className={styles.title}>Thông tin phiếu</label> */}
          <div className={styles.right_row}>
            <label>Ngày phiếu</label>
            <input
              type="date"
              value={convertDate(infoForm["NGAYPHIEU"])}
              // onChange={(e) => {
              //   setInfoForm({ ...infoForm, NGAYPHIEU: e.target.value });
              // }}
              className={styles.small}
            />
          </div>
          <div className={styles.right_row}>
            <label>Diễn giải</label>
            <input
              type="text"
              value={infoForm["DIENGIAI"]}
              // onChange={(e) => {
              //   setInfoForm({ ...infoForm, DIENGIAI: e.target.value });
              // }}
              className={styles.medium}
            />
          </div>
        </div>
      </div>
      <header className={styles.header_table}>Chi tiết phiếu phân công</header>
      <SubTable
        columns={infoColumns}
        data={dataTable}
        rowSelection={{}}
        flag_rowSelection={false}
        // setRowSelection={setRowSelection}
        maxHeight={"26rem"}
      />
      <div className={styles.group_button}>
        <div>
          <button onClick={handleDelete}>Xóa</button>
          <button>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default FormChamCong;
