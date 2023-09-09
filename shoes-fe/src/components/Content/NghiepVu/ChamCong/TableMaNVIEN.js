import MaterialReactTable from "material-react-table";
import { memo } from "react";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import { rem_to_px, border_text_table_config } from "~config/ui";

const COL_NHANVIEN = [
  {
    header: "Mã nhân viên",
    key: "MANVIEN",
    width: 21 * rem_to_px,
    enableEditing: false,
  },
  {
    header: "Tên nhân viên",
    key: "TENNVIEN",
    width: 40 * rem_to_px,
    enableEditing: false,
  },
];

let columns_nvien = processingInfoColumnTable(COL_NHANVIEN);

const TableMaNVIEN = ({
  data,
  rowSelection,
  setRowSelection,
  setIsSaveData,
  setClickedPopover
}) => {
  console.log("re-render sub table when hover", data);
  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns_nvien}
        data={data}
        {...border_text_table_config}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // row selection
        enableMultiRowSelection={false}
        enableRowSelection
        onRowSelectionChange={(rows) => {
          setRowSelection(rows);
          setIsSaveData(false);
          setClickedPopover(false);
        }}
        state={{ rowSelection }}
        muiTableContainerProps={{ sx: { maxHeight: "400px" } }}
      />
    </div>
  );
};

export default memo(TableMaNVIEN);
