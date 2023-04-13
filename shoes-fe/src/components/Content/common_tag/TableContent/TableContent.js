import { Table } from "antd";
import { Modal } from "@common_tag";
import { useTableContext, actions_table } from "@table_context";
import "./table_ant.css";

const TableContent = () => {
  const [stateTable, dispatchTable] = useTableContext();
  const inforShowTable = stateTable["inforShowTable"];
  const ComponentForm = stateTable["infoShowForm"]["component_form"];

  return (
    <>
      {inforShowTable.showTable && (
        <Table
          pagination={{ defaultPageSize: 15 }}
          title={() => (<div>{inforShowTable.title}</div>)}
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
        <ComponentForm />
      </Modal>
    </>
  );
};
export default TableContent;
