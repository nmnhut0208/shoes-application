import { useState, useEffect } from "react";
import FormGiaoHang from "./FormChamCong/";
import { Modal } from "~common_tag";
import SubTable from "./SubTable";
import styles from "./ChamCong.module.scss";
import FormChamCong from "./FormChamCong/FormChamCong";

const list_key = [
  { header: "Mã kỳ", key: "MAKY" },
  { header: "Mã Nhân Viên", key: "MANVIEN" },
  { header: "Số phiếu", key: "SOPHIEU" },
  { header: "Ngày phiếu", key: "NGAYPHIEU" },
  { header: "Số lượng", key: "SOLUONG" },
  { header: "Diễn giải", key: "DIENGIAI" },
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

const GiaoHang = () => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sendData, setSendData] = useState({});
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  useEffect(() => {
    fetch("http://localhost:8000/tv_chamcong")
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTable(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  return (
    <>
      <header className={styles.header_table}>Phiếu Giao hàng - F0033</header>
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setData={setDataTable}
        // rowSelection={rowSelection}
        // setRowSelection={setRowSelection}
        maxHeight={"65rem"}
      />
      {showForm && (
        <Modal>
          <FormChamCong infoForm={sendData} setData={setDataTable} />
        </Modal>
      )}
    </>
  );
};

export default GiaoHang;
