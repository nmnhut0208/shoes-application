import MaterialReactTable from "material-react-table";

import { memo, useState } from "react";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const INFO_COLS_DONHANG = [
  {
    header: "Mã giày",
    key: "MAGIAY",
    width: 7 * rem_to_px,
  },
  {
    header: "Tên giày",
    key: "TENGIAY",
    width: 10 * rem_to_px,
  },
];

const cols = processingInfoColumnTable(INFO_COLS_DONHANG);

const TableShowMau = ({ columns, data, setInput, setLabel }) => {
  //   const [rowSelection, setRowSelection] = useState({});
  //   console.log("rowSelection: ", rowSelection);
  return (
    <MaterialReactTable
      columns={cols}
      data={data}
      enableMultiRowSelection={false} //use radio buttons instead of checkboxes
      //   enableRowSelection
      //   getRowId={(row) => row.userId} //give each row a more useful id
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => {
          row.getToggleSelectedHandler();
          setInput(data[row.id]["MAGIAY"]);
          setLabel(data[row.id]["TENGIAY"]);
        },
        sx: { cursor: "pointer" },
      })}
      //   onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
      //   state={{ rowSelection }} //pass our managed row selection state to the table to use
      // enable phân trang
      enablePagination={false}
      //   enableBottomToolbar={true}
      // scroll to bottom
      //   enableRowVirtualization // tắt cái này đi thì nó hiển thị ổn áp hơn
      muiTableContainerProps={{
        sx: { maxHeight: "30rem", maxWidth: "auto" },
      }}
    />
  );
};

export default memo(TableShowMau);
