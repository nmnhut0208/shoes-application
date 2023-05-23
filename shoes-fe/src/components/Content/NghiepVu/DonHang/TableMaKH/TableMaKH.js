import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { COL_KHACHHANG } from "./ConstantVariable";

let columns_kh = processingInfoColumnTable(COL_KHACHHANG);
const TableMaKH = ({ data, rowSelection, setRowSelection }) => {
  console.log("re-render sub table when hover", data);
  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns_kh}
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

export default TableMaKH;
