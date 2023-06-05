import { Space } from "antd";
import { useState, useEffect } from "react";

const Selection = ({
  readOnly,
  defaultValue,
  data,
  changeData,
  size_input,
  size_span,
  className,
}) => {
  console.log("readOnly: ", readOnly);
  const [name, setName] = useState(defaultValue["label"]);

  return (
    <Space size="small" className={className}>
      <select
        style={{ width: size_input }}
        onChange={(e) => {
          let _data = data.filter((_data) => _data["value"] === e.target.value);
          setName(_data[0]["label"]);
          changeData({ value: e.target.value, label: _data[0]["label"] });
        }}
        value={defaultValue["value"]}
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
          <option value={name} key={name}>
            {name}
          </option>
        )}
      </select>

      <input readOnly={true} value={name} style={{ width: size_span }} />
    </Space>
  );
};

export default Selection;
