import { Popover, Space } from "antd";
import { useState, memo, useEffect } from "react";
import ListKyTinhLuong from "./ListKyTinhLuong";

const KyTinhLuong = ({
  readOnly,
  value,
  setValue,
  label,
  setLabel,
  size_input,
  have_span,
  size_span,
}) => {
  console.log("re-render ItemKyTinhLuong");
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
          content={<ListKyTinhLuong setValue={setValue} setLabel={setLabel} closePopover={hide} />}
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
        >
          <input
            name="MAKY"
            value={value}
            readOnly={true}
            style={{ width: size_input }}
          />
        </Popover>
      )}
      {readOnly && (
        <input
          name="MAKY"
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

export default memo(KyTinhLuong);
