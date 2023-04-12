import { Table, Space } from "antd";
// import ResizableAntdTable from 'resizable-antd-table';
import { useEffect, useState } from "react";
import Modal from "@common_tag";
import FormSuon from "./FormSuon";

const list_key = ["STT", "Mã sườn", "Tên sườn", 
"Mã gót", "Tên gót", "Mã mũi", "Tên mũi", "Ghi chú"];

const infoColumns = [];
for (var obj in list_key) {
  const info = {
    title: list_key[obj],
    width: 100,
    dataIndex: list_key[obj],
    key: list_key[obj].toLowerCase(),
  };
  infoColumns.push(info);
}

infoColumns.push({
  title: "Action",
  key: "action",
  render: (_, record) => (
    <Space size="middle">
      <a>Invite {record.name}</a>
      <a>Delete</a>
    </Space>
  ),
});

const Suon = () => {
  const [infoTable, setInfoTable] = useState({});
  const [showTable, setShowTable] = useState(false);
  const [record, setRecord] = useState({});
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/items_suon")
    .then((response) => {
        console.log("response: ", response);
        return response.json();
      })
      .then((info) => {
        console.log(":info: ", info);
        setInfoTable(info);
        setShowTable(true);
      })
      .catch((err) => {
        console.log(":error: ", err);
      });
  }, []);

  const handleCancelForm = () => {
    setVisibleForm(false);
  };

  return (
    <>
      {showTable && (
        <Table
          // caption="Thông tin Giày"
          columns={infoColumns}
          dataSource={infoTable}
          scroll={{
            x: 1300,
            y: 500,
          }}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                setRecord(record);
                setVisibleForm(true);
              },
            };
          }}
        />
      )}

      <Modal title="Sườn - F0020" 
        open={visibleForm} 
        onCancel={handleCancelForm}>
        <FormSuon
        // TODO: sau này sửa STT thành key duy nhất nè
          id={record.STT}
          handleCancelForm={handleCancelForm}
          infoTable={infoTable}
          setInfoTable={setInfoTable}
        ></FormSuon>
      </Modal>
    </>
  );

};
export default Suon;
