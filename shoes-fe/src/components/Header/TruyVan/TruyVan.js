import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { itemsTruyVan } from "./ConstantVariable";
import { useTaskContext, actions } from "~task";

const TruyVan = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const handleOnclick = (e) => {
    dispatchTask(actions.setTaskTruyVan(e.key));
  };
  return (
    <Dropdown
      menu={{
        items: itemsTruyVan,
        onClick: handleOnclick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Truy vấn
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default TruyVan;
