import { useState, useMemo, useEffect, memo } from "react";
import { processingInfoColumnTable } from "~utils/processing_data_table";
import MaterialReactTable from "material-react-table";
import { COL_KYTINHLUONG } from "./ConstantVariable";
import { useItemsContext } from "~items_context";
import { border_text_table_config } from "~config/ui";

const ListKyTinhLuong = ({ setValue, setLabel, showPopover }) => {
  const [data, setData] = useState([]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemKyTinhLuong);
  }, []);

  const columns = useMemo(() => {
    return processingInfoColumnTable(COL_KYTINHLUONG);
  }, []);

  return (
    <div style={{ height: "auto" }}>
      <MaterialReactTable
        {...border_text_table_config}
        enableTopToolbar={false}
        columns={columns}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}

        enableMultiRowSelection={false} //use radio buttons instead of checkboxes
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            row.getToggleSelectedHandler();
            setValue(data[row.id]["MAKY"]);
            if (setLabel)
              setLabel(data[row.id]["TENKY"]);
            showPopover(false);
          },
          sx: { cursor: "pointer" },
        })}

        muiTableContainerProps={{
          sx: { height: "30rem" },
        }}
      />
    </div>
  );
};

export default memo(ListKyTinhLuong);
