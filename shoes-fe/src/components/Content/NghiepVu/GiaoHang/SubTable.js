import { memo } from "react";
import MaterialReactTable from "material-react-table";
import { border_text_table_config } from "~config/ui";
import { handleDisableKeyDownUp, handleFocus } from "~utils/event";
import styles from "./SubTable.module.scss";

const SubTable = ({
  columns,
  data,
  dataAll,
  curDH,
  setDataTable,
  // rowSelection,
  // flag_rowSelection,
  setRowSelection,
  setIsSaveData,
  maxHeight,
  change,
  setKeys,
}) => {
  const handleSaveCell = (cell, value) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    if (dataAll.length === 0) return;
    let data_new = [...dataAll[curDH]];
    var row_current = data_new[cell.row.index];
    // Tính lại tại thay đổi tại dòng hiện tại đang chỉnh sửa
    // Tính lại số lượng
    var list_size = [
      "SIZE5",
      "SIZE6",
      "SIZE7",
      "SIZE8",
      "SIZE9",
      "SIZE0",
      "SIZE1",
    ];
    if (list_size.includes(cell.column.id) || cell.column.id === "GIABAN") {
      if (value === "") value = 0;
      row_current[cell.column.id] = parseInt(value);

      var so_luong = 0;
      for (var i = 0; i < list_size.length; i++) {
        so_luong += row_current[list_size[i]];
      }
      row_current["SOLUONG"] = so_luong;
      row_current["THANHTIEN"] = row_current["SOLUONG"] * row_current["GIABAN"];
      data_new[cell.row.index] = row_current;
    } else {
      data_new[cell.row.index][cell.column.id] = value;
    }
    //send/receive api updates here
    dataAll[curDH] = data_new;
    setDataTable({ ...dataAll }); //re-render with new data
    setIsSaveData(false);
  };

  return (
    <MaterialReactTable
      {...border_text_table_config}
      columns={columns}
      data={data}
      enableColumnResizing
      enableColumnActions={false}
      enableSorting={false}
      enableSelectAll={false}
      // enableRowSelection={flag_rowSelection}
      //   getRowId={(row) => row.userId}
      onRowSelectionChange={(rows) => {
        setRowSelection(rows);
        setIsSaveData(false);
      }}
      // state={{ rowSelection }}
      enableTopToolbar={false}
      enableBottomToolbar={false}
      enablePagination={false}
      muiTableContainerProps={{ sx: { maxHeight: { maxHeight } } }}
      enableRowVirtualization
      enableStickyFooter
      editingMode="table"
      enableRowActions={true}
      enableEditing={change}
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
        type: "number",
        onKeyDown: (event) => {
          handleDisableKeyDownUp(event);
        },
        onKeyUp: (event) => {
          handleDisableKeyDownUp(event);
        },
        onFocus: (event) => {
          handleFocus(event);
        },
        sx: {
          input: {
            textAlign: "right",
          },
        },
      })}
      // renderRowActions Delete
      renderRowActions={({ row, table }) => (
        <button
          className={styles.delete_button}
          onClick={() => {
            let data_new = dataAll[curDH];
            const index = row.index;
            data_new = data_new.filter((_, i) => i !== index);
            dataAll[curDH] = data_new;
            setDataTable({ ...dataAll });
            setKeys((prev) => prev + 1);
            setIsSaveData(false);
          }}
        >
          Xoá
        </button>
      )}
    />
  );
};

export default memo(SubTable);
