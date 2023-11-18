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

  const handleCopyRow = (row) => {
    let index = row.index;
    var newData = [...data];
    let indexAdd = newData.length - 1;
    newData.splice(indexAdd, 0, data[index]);
    console.log("data[index]: ", newData);

    setDataTable(newData);
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
      displayColumnDefOptions={{
        "mrt-row-actions": {
          minSize: 110, //set custom width
          // minSize: 24,
          muiTableHeadCellProps: {
            align: "center", //change head cell props
          },
          muiTableBodyCellProps: {
            minSize: 110,
          },
          enableResizing: false,
        },
        "mrt-row-numbers": {
          minSize: 20,
          enableColumnOrdering: true, //turn on some features that are usually off
          enableResizing: false,
          muiTableHeadCellProps: {
            align: "right",
          },
          muiTableBodyCellProps: {
            align: "right",
          },
        },
      }}
      renderRowActions={({ row, table }) => (
        <div style={{ width: "100px" }}>
          {row.original["MAGIAY"] !== "" && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button
                className={styles.delete_button}
                onClick={() => handleDeleteRow(row)}
              >
                Xoá
              </button>
              <button
                className={styles.copy_button}
                onClick={() => handleCopyRow(row)}
              >
                Copy
              </button>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default memo(TableDonHang);
