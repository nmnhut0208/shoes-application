import { Popover, Space } from "antd";
import { useState, memo } from "react";
import ListKhachHang from "./ListKhachHang";

const KhachHang = ({
  readOnly,
  initValue,
  changeData,
  size_input,
  have_span,
  size_span,
}) => {
  const [data, setData] = useState(initValue["MAKH"]);
  const [data_span, setDataSpan] = useState(initValue["TENKH"]);
  return (
    <Space>
      {!readOnly && (
        <Popover
          placement="bottomLeft"
          content={
            <ListKhachHang
              changeData={(info) => {
                setData(info["MAKH"]);
                setDataSpan(info["TENKH"]);
                changeData(info);
              }}
            />
          }
        >
          <input
            name="MAKH"
            value={data}
            readOnly={true}
            style={{ width: size_input }}
          />
        </Popover>
      )}
      {readOnly && (
        <input
          name="MAKH"
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

export default memo(KhachHang);
