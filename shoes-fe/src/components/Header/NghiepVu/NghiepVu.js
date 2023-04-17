import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { itemsNghiepVu } from "./ConstantVariable";
import { useTaskContext, actions } from "~task";

const NghiepVu = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const handleOnclick = (e) => {
    dispatchTask(actions.setTaskNghiepVu(e.key));
  };
  return (
    <Dropdown
      menu={{
        items: itemsNghiepVu,
        onClick: handleOnclick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Nghiệp vụ
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default NghiepVu;
