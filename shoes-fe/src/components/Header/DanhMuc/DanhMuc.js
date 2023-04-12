import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { itemsHangHoa } from "./ConstantVariable";
import { useTaskContext, actions } from "@task";

const DanhMuc = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const inforCurrentTask = stateTask.inforCurrentTask;
  console.log("inforCurrentTask: ", inforCurrentTask);
  const handleDanhMuc = (e) => {
    dispatchTask(actions.setTaskDanhMuc(e.key));
  };
  return (
    <Dropdown
      menu={{
        items: itemsHangHoa,
        onClick: handleDanhMuc,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Danh mục
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DanhMuc;
