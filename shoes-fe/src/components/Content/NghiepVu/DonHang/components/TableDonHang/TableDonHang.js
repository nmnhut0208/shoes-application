import { memo } from "react";
import MaterialReactTable from "material-react-table";
import styles from "./TableDonHang.module.scss";

import { border_text_table_config } from "~config/ui";

const TableDonHang = ({ columns, data, setDataTable, readOnly }) => {
  console.log("render TableDonHang");

  const handleDeleteRow = (row) => {
    let index = row.index;
    data.splice(index, 1);
    setDataTable([...data]);
  };

  return (
    <MaterialReactTable
      {...border_text_table_config}
      enableTopToolbar={true}
      columns={columns}
      data={data}
      enableColumnActions={false}
      enableSorting={false}
      enableColumnResizing
      // enable phân trang
      enablePagination={false}
      // scroll to bottom
      enableRowVirtualization
      muiTableContainerProps={{ sx: { maxHeight: "45rem" } }}
      enableRowNumbers //  enable row numbers thay cho STT
      // enablePinning // enable pinning
      // footer sum
      enableStickyFooter
      // renderBottomToolbarCustomActions={() => (
      //   <>
      //     {!readOnly && (
      //       <Typography
      //         sx={{ fontStyle: "italic", p: "0 1rem" }}
      //         variant="body2"
      //       ></Typography>
      //     )}
      //   </>
      // )}
      enableRowActions={!readOnly}
      renderRowActions={({ row, table }) => (
        <div>
          {row.original["MAGIAY"] !== "" && (
            <button
              className={styles.delete_button}
              onClick={() => handleDeleteRow(row)}
            >
              Xoá
            </button>
          )}
        </div>
      )}
    />
  );
};

export default memo(TableDonHang);
