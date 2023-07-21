import MaterialReactTable from "material-react-table";
import { memo } from "react";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { rem_to_px, border_text_table_config } from "~config/ui";

const COL_KHACHHANG = [
  {
    header: "Mã khách hàng",
    key: "MAKH",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên khách hàng",
    key: "TENKH",
    width: 40 * rem_to_px,
    enableEditing: false,
  },
];

let columns_kh = processingInfoColumnTable(COL_KHACHHANG);
const TableMaKH = ({ data, rowSelection, setRowSelection, setIsSaveData }) => {
  console.log("re-render sub table when hover", data);
  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        {...border_text_table_config}
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
        onRowSelectionChange={(row) => {
          setRowSelection(row);
          setIsSaveData(false);
        }}
        state={{ rowSelection }}
        muiTableContainerProps={{ sx: { maxHeight: "400px" } }}
      />
    </div>
  );
};

export default memo(TableMaKH);
