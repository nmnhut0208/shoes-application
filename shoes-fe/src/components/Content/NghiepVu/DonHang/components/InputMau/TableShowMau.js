import MaterialReactTable from "material-react-table";

import { memo, useState } from "react";
import { rem_to_px } from "~config/ui";
import { processingInfoColumnTable } from "~utils/processing_data_table";

const INFO_COLS_DONHANG = [
  {
    header: "Mã màu",
    key: "value",
    width: 7 * rem_to_px,
  },
  {
    header: "Tên màu",
    key: "label",
    width: 10 * rem_to_px,
  },
];

const cols = processingInfoColumnTable(INFO_COLS_DONHANG);

const TableShowMau = ({ columns, data, setInput, setLabel, showPopover }) => {
  return (
    <MaterialReactTable
      columns={cols}
      data={data}
      enableMultiRowSelection={false} //use radio buttons instead of checkboxes
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => {
          row.getToggleSelectedHandler();
          setInput(data[row.id]["value"]);
          setLabel(data[row.id]["label"]);
          showPopover(false);
        },
        sx: { cursor: "pointer" },
      })}

      // enable phân trang
      enablePagination={false}
      //   enableBottomToolbar={true}
      // scroll to bottom
      muiTableContainerProps={{
        sx: { maxHeight: "30rem", maxWidth: "auto" },


      }}
    />
  );
};

export default memo(TableShowMau);
