import { memo } from "react";
import MaterialReactTable from "material-react-table";
import { border_text_table_config } from "~config/ui";

const MainTable = ({
  columns,
  data,
  setDataTable,
  rowSelection,
  setCurSelected,
  flag_rowSelection,
  setRowSelection,
  setIsSaveData,
  maxHeight,
  change,
  setKeys
}) => {
  console.log("data: ", data);
  const handleSaveCell = (cell, value) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here
    var row_current = data[cell.row.index];
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
    if (list_size.includes(cell.column.id)) {
      if (value === "") value = 0;
      row_current[cell.column.id] = parseInt(value);

      var so_luong = 0;
      for (var i = 0; i < list_size.length; i++) {
        so_luong += row_current[list_size[i]];
      }
      row_current["SOLUONG"] = so_luong;
      row_current["THANHTIEN"] = row_current["SOLUONG"] * row_current["GIABAN"];
      data[cell.row.index] = row_current;
    } else {
      data[cell.row.index][cell.column.id] = value;
    }
    // console.log("cell: ", data);
    //send/receive api updates here
    setDataTable([...data]); //re-render with new data
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
      muiTableBodyRowProps={({ row }) => ({
        //implement row selection click events manually
        onClick: () => {
          setRowSelection((prev) => ({
            ...prev,
            [row.id]: !prev[row.id],
          }));
          setCurSelected(row.id);
          setKeys(prev => prev + 1)
        },
        selected: rowSelection[row.id],
        sx: {
          cursor: 'pointer',
        },
      })}
      state={{ rowSelection }}
      enableTopToolbar={false}
      enableBottomToolbar={false}
      enablePagination={false}
      muiTableContainerProps={{ sx: { maxHeight: { maxHeight } } }}
      enableRowVirtualization
      enableStickyFooter
      editingMode="table"
      enableEditing={change}
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        //onBlur is more efficient, but could use onChange instead
        onBlur: (event) => {
          handleSaveCell(cell, event.target.value);
        },
        type: "number",
        sx: {
          input: {
            textAlign: "right",
          },
        },
      })}
    />
  );
};

export default memo(MainTable);
