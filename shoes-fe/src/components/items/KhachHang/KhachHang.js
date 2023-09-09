import { Popover, Space } from "antd";
import { memo, useState } from "react";
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
  const [clicked, setClicked] = useState(false);
  const hide = () => {
    setClicked(false);
  };

  const handleClickChange = (open) => {
    setClicked(open);
  };
  return (
    <Space>
      {!readOnly && (
        <Popover
          placement="bottomLeft"
          content={<ListKhachHang setValue={setValue} setLabel={setLabel} closePopover={hide} />}
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
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
