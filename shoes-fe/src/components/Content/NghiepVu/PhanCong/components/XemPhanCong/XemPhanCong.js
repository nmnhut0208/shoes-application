import MaterialReactTable from "material-react-table";
import styles from "./XemPhanCong.module.scss";
import { useMemo } from "react";
import {
  renderDataEmpty,
  processingInfoColumnTable,
} from "~utils/processing_data_table";
import { INFO_COLS_THO, INFO_COLS_DONHANG } from "./ConstantVariable";

const Table = ({ columns, data, maxHeight }) => {
  return (
    <div>
      <MaterialReactTable
        enableTopToolbar={false}
        columns={columns}
        data={data}
        // components
        enableColumnActions={false}
        enableSorting={false}
        // enable phân trang
        enablePagination={false}
        enableBottomToolbar={true}
        // scroll to bottom
        enableRowVirtualization
        muiTableContainerProps={{
          sx: { maxHeight: [maxHeight, "rem"].join("") },
        }}
      />
    </div>
  );
};

const XemPhanCong = () => {
  const column_tho = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_THO);
  }, []);

  const column_donhang = useMemo(() => {
    return processingInfoColumnTable(INFO_COLS_DONHANG);
  }, []);

  const data_tho = useMemo(() => {
    return renderDataEmpty(INFO_COLS_THO, 10);
  }, []);

  const data_donhang = useMemo(() => {
    return renderDataEmpty(INFO_COLS_DONHANG, 20);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.tho_quai_container}>
        <fieldset>
          <legend>Thợ quai</legend>
          <Table columns={column_tho} data={data_tho} maxHeight={15} />
        </fieldset>
      </div>
      <div className={styles.tho_de_container}>
        <fieldset>
          <legend>Thợ đế</legend>
          <Table columns={column_tho} data={data_tho} maxHeight={15} />
        </fieldset>
      </div>
      <div className={styles.don_hang_container}>
        <Table columns={column_donhang} data={data_donhang} maxHeight={25} />
      </div>
    </div>
  );
};

export default XemPhanCong;
