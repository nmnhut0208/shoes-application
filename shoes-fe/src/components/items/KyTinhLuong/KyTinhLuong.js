import { Popover, Space } from "antd";
import { useState, memo, useEffect } from "react";
import ListKyTinhLuong from "./ListKyTinhLuong";

const KyTinhLuong = ({
  readOnly,
  initValue,
  changeData,
  size_input,
  have_span,
  size_span,
}) => {
  const [data, setData] = useState(initValue["MAKY"]);
  const [data_span, setDataSpan] = useState(initValue["TENKY"]);
  useEffect(() => {
    setData(initValue["MAKY"]);
    setDataSpan(initValue["TENKY"]);
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
                setDataSpan(info["TENKY"]);
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
      {have_span && (
        <input readOnly={true} value={data_span} style={{ width: size_span }} />
      )}
    </Space>
  );
};

export default memo(KyTinhLuong);
