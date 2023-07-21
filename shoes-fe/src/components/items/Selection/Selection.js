import { Space } from "antd";
import { useState, useEffect, memo } from "react";

const Selection = ({
  readOnly,
  value,
  setValue,
  label,
  setLabel,
  data,
  size_input,
  size_span,
  className,
}) => {
  return (
    <Space size="small" className={className}>
      <select
        style={{ width: size_input }}
        onChange={(e) => {
          let _data = data.filter((_data) => _data["value"] === e.target.value);
          setLabel(_data[0]["label"]);
          setValue(e.target.value);
        }}
        value={value}
      >
        {!readOnly && (
          <>
            {data.map((_data, index) => (
              <option value={_data["value"]} key={_data["value"]}>
                {_data["value"]}
              </option>
            ))}
          </>
        )}

        {readOnly && (
          <option value={value} key={value}>
            {value}
          </option>
        )}
      </select>

      <input readOnly={true} value={label} style={{ width: size_span }} />
    </Space>
  );
};

export default memo(Selection);
