import { Popover, Space } from "antd";
import { memo } from "react";
import ListKhachHang from "./ListKhachHang";

const KhachHang = ({
  readOnly,
  value,
  setValue,
  label,
  setLabel,
  size_input,
  have_span,
  size_span,
}) => {
  console.log("re-render ItemKhachHang");
  return (
    <Space>
      {!readOnly && (
        <Popover
          placement="bottomLeft"
          content={<ListKhachHang setValue={setValue} setLabel={setLabel} />}
          trigger="click"
        >
          <input
            name="MAKH"
            value={value}
            readOnly={true}
            style={{ width: size_input }}
          />
        </Popover>
      )}
      {readOnly && (
        <input
          name="MAKH"
          value={value}
          readOnly={true}
          style={{ width: size_input }}
        />
      )}
      {have_span && (
        <input readOnly={true} value={label} style={{ width: size_span }} />
      )}
    </Space>
  );
};

export default memo(KhachHang);
