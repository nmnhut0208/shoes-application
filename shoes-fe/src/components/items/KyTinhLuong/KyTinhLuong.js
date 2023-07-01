import { Popover, Space } from "antd";
import { useState, memo, useEffect } from "react";
import ListKyTinhLuong from "./ListKyTinhLuong";

const KyTinhLuong = ({ readOnly, initValue, changeData, size_input }) => {
  const [data, setData] = useState(initValue["MAKY"]);
  useEffect(() => {
    setData(initValue["MAKY"]);
  }, [initValue]);
  return (
    <Space>
      {!readOnly && (
        <Popover
          placement="bottomLeft"
          content={
            <ListKyTinhLuong
              changeData={(info) => {
                setData(info["MAKY"]);
                changeData(info);
              }}
            />
          }
        >
          <input
            name="MAKY"
            value={data}
            readOnly={true}
            style={{ width: size_input }}
          />
        </Popover>
      )}
      {readOnly && (
        <input
          name="MAKY"
          value={data}
          readOnly={true}
          style={{ width: size_input }}
        />
      )}
    </Space>
  );
};

export default memo(KyTinhLuong);
