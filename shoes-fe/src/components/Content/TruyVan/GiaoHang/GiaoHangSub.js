import { useState, useEffect } from "react";
import FormGiaoHang from "./FormGiaoHang";
import ModalForm from "./ModalForm";
import SubTable from "./SubTable";
import styles from "./GiaoHangSub.module.scss";
import { convertDateForReport } from "~utils/processing_date";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const list_key = [
  { header: "Số phiếu", key: "SOPHIEU" },
  {
    header: "Ngày phiếu",
    key: "NGAYPHIEU",
    Cell: ({ cell }) => <p>{convertDateForReport(cell.getValue())}</p>,
  },
  { header: "Khách hàng", key: "MAKH" },
  { header: "Tên khách hàng", key: "TENKH" },
  { header: "Diễn giải", key: "DIENGIAIPHIEU" },
];

const infoColumns = processingInfoColumnTable(list_key);

const GiaoHangSub = ({ setIsSaveDataTruyVanGiaoHang, permission }) => {
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [sendData, setSendData] = useState({});
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("GiaoHang");

  useEffect(() => {
    fetch("http://localhost:8000/tv_giaohang")
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
    <div className={styles.container}>
      <header className={styles.header_table}>Phiếu Giao hàng - F0033</header>
      <SubTable
        columns={infoColumns}
        data={dataTable}
        setShowForm={setShowForm}
        setSendData={setSendData}
        setDataTable={setDataTable}
        // rowSelection={rowSelection}
        // setRowSelection={setRowSelection}
        maxHeight={"65rem"}
      />
      {showForm && (
        <ModalForm setShowForm={setShowForm}>
          <FormGiaoHang infoKH={sendData} setShowForm={setShowForm} />
        </ModalForm>
      )}
    </div>
  );
};

export default GiaoHangSub;
