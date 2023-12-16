import { useState, memo, useEffect } from "react";
import { Space } from "antd";

import { Select } from "antd";
const { Option } = Select;

const customOptionStyle = {
  borderBottom: "1px solid #000", // Add a border line at the bottom of each option
  padding: "4px 0", // Adjust padding as needed
  fontSize: "1.7rem",
};

const filterOption = (input, option) => {
  return (option?.value ?? "")
    .toLowerCase()
    .startsWith(input.trim().toLowerCase());
};

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
  const [maMA, setMaMau] = useState(() => {
    if (value) {
      return value;
    } else return "";
  });
  const [showSelection, setShowSelection] = useState(true);
  const [showInput, setShowInput] = useState(true);

  //   useEffect(() => {
  //     setMaMau(value);
  //   }, [value]);

  const handleChange = (value) => {
    setMaMau(value);
    let choice = data.filter((e) => e.value === value);
    setValue(choice[0]["value"]);
    setLabel(choice[0]["lable"]);
    setShowInput(true);
    setShowSelection(false);
  };

  const handleFocusInput = () => {
    if (readOnly) return;
    setShowSelection(true);
    setShowInput(false);
  };
  const handleClickSelection = () => {
    setShowSelection(false);
    setShowInput(true);
  };

  return (
    <>
      <Select
        showSearch={true}
        optionFilterProp="children"
        style={{
          width: { size_input },
          backgroundColor: "red",
        }}
        value={maMA}
        onChange={handleChange}
        filterOption={filterOption}
        key="maMA"
        autoFocus={false}
        defaultOpen={false}
        onBlur={handleClickSelection}
        onClick={handleClickSelection}
      >
        {!readOnly && (
          <>
            {data.map((e) => (
              <Option
                style={customOptionStyle}
                value={e["value"]}
                key={e["value"]}
              >
                <span
                  style={{
                    width: "250px",
                    display: "inline-block",
                    borderRight: "1px solid #000",
                    backgroundColor: "green",
                  }}
                >
                  {e["value"]}
                </span>
                <span style={{ paddingLeft: "10px", width: "auto" }}>
                  {e["label"]}
                </span>
              </Option>
            ))}
          </>
        )}

        {readOnly && (
          <Option style={customOptionStyle} value={value} key={value}>
            <span
              style={{
                width: { size_input },
                display: "inline-block",
                borderRight: "1px solid #000",
              }}
            >
              {value}
            </span>
            <span style={{ paddingLeft: "10px", width: "auto" }}>{label}</span>
          </Option>
        )}
      </Select>
      <input readOnly={true} value={label} style={{ width: size_span }} />
    </>
  );
};

export default memo(Selection);
