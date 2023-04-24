import { useState } from "react";
import MaterialReactTable from "material-react-table";

const SubTable = ({ row_each_page, columns, data }) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns}
        data={data}
        enableColumnActions={false}
        enableSorting={false}
        enableColumnResizing
        // enable phân trang
        enablePagination={false}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{ sx: { maxHeight: "600px" } }}
        enableRowNumbers //  enable row numbers thay cho STT
        // enablePinning // enable pinning
        // footer sum
        enableStickyFooter

        // edit row
        // enableEditing
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
      />
    </div>
  );
};

export default SubTable;
