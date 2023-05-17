import { useState, useEffect } from "react";
import FormGiaoHang from "./FormGiaoHang";
import { Modal } from "~common_tag";
import SubTable from "./SubTable";
import styles from "./GiaoHang.module.scss";

const list_key = [
  { key: "Số phiếu" },
  { key: "Ngày phiếu" },
  { key: "Số đơn hàng" },
  { key: "Khách hàng" },
  { key: "Tên khách hàng" },
  { key: "Diễn giải" },
];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    header: list_key[obj]["key"],
    width: list_key[obj]["width"],
    accessorKey: list_key[obj]["key"],
    key: list_key[obj]["key"].toLowerCase(),
  };
  infoColumns.push(info);
}

const GiaoHang = () => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  useEffect(() => {
    fetch("http://localhost:8000/items_tv_giao_hang")
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
        // rowSelection={rowSelection}
        // setRowSelection={setRowSelection}
        maxHeight={"65rem"}
      />
      {showForm && (
        <Modal>
          <FormGiaoHang />
        </Modal>
      )}
    </>
  );
};

export default GiaoHang;
