import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { itemsBaoCao } from "./ConstantVariable";
import { useTaskContext, actions } from "~task";

const BaoCao = () => {
  const [stateTask, dispatchTask] = useTaskContext();
  const handleOnclick = (e) => {
    dispatchTask(actions.setTaskBaoCao(e.key));
  };
  return (
    <Dropdown
      menu={{
        items: itemsBaoCao,
        onClick: handleOnclick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Báo cáo
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default BaoCao;
