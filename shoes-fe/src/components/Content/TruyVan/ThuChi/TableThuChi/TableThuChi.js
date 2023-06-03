import { useState, useEffect } from "react";
import SubTable from "./SubTable";
import { useTableContext, actions_table } from "~table_context";
import { Modal } from "~common_tag";
import FormChiTien from "./FormChiTien";

const list_key = [
  { header: "Số phiếu", key: "SOPHIEU" },
  { header: "Ngày phiếu", key: "NGAYPHIEU" },
  { header: "Khách hàng", key: "MAKH" },
  { header: "Tên khách hàng", key: "TENKH" },
  { header: "Số tiền", key: "SODUCUOI" },
  { header: "Diễn giải", key: "DIENGIAIPHIEU" },
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

const url_data = {
  option1: "http://localhost:8000/tv_thuchi",
  option2: "http://localhost:8000/tv_thu",
  option3: "http://localhost:8000/tv_chi",
};

const TableThuChi = ({ option }) => {
  // const [stateTable, dispatchTable] = useTableContext();
  const [dataTable, setDataTable] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // const [showForm, setShowForm] = useState(false);
  //   const [rowSelection, setRowSelection] = useState({});

  console.log("TableThuChi");

  useEffect(() => {
    // dispatchTable(actions_table.setTitleModal("Kho hàng - F0025"));
    // dispatchTable(actions_table.setTitleTable("Kho hàng - F0024"));
    // if (option === "option1") {
    //   dispatchTable(actions_table.setComponentForm(null));
    // } else if (option === "option2") {
    //   dispatchTable(actions_table.setComponentForm(null));
    // } else if (option === "option3") {
    //   dispatchTable(actions_table.setComponentForm(FormChiTien));
    //   console.log("set form chi tien");
    // }
    console.log("url:", url_data[option]);
    fetch(url_data[option])
      .then((response) => {
        return response.json();
      })
      .then((info) => {
        setDataTable(info);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, [option]);

  return (
    <>
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
          <FormChiTien />
        </Modal>
      )}
    </>
  );
};

export default TableThuChi;
