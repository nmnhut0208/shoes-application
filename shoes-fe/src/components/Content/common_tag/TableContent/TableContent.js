import { Table } from "antd";
// import ResizableAntdTable from 'resizable-antd-table';
import { useEffect, useState } from "react";
import { Modal } from "@common_tag";
import { useTableContext, actions_table } from "@table_context";

const TableContent = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];

  return (
    <>
      {inforShowTable.showTable && (
        <Table
          columns={inforShowTable.infoColumnTable}
          dataSource={inforShowTable.infoTable}
          scroll={{
            x: 1300,
            y: 500,
          }}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                dispatchTable(actions_table.setInforRecordTable(record));
                dispatchTable(actions_table.setModeShowModal(true));
              },
            };
          }}
        />
      )}

      <Modal>
        < ComponentForm /> 
      </Modal>
    </>
  );

};
export default TableContent;
