import { Space } from "antd";
import { useState } from "react";

const Selection = ({ defaultValue, data, changeData }) => {
  const [name, setName] = useState(defaultValue["label"]);
  return (
    <Space size="small">
      <select
        onChange={(e) => {
          let _data = data.filter((_data) => _data["value"] === e.target.value);
          setName(_data[0]["label"]);
          changeData({ value: e.target.value, label: _data[0]["label"] });
        }}
        value={defaultValue["value"]}
      >
        {data.map((_data, index) => (
          <option value={_data["value"]} key={_data["value"]}>
            {_data["value"]}
          </option>
        ))}
      </select>

      <input readOnly={true} value={name} />
    </Space>
  );
};

export default Selection;
