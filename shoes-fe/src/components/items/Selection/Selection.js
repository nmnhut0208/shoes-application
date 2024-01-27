import { useState, memo, useEffect } from "react";
import { Space } from "antd";

import { Select } from "antd";
const { Option } = Select;

const customOptionStyle = {
  borderBottom: "1px solid #000", // Add a border line at the bottom of each option
  fontSize: "1.45rem",
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
  size_selection = 450,
}) => {
  const [maMA, setMaMau] = useState(() => {
    if (value) {
      return value;
    } else return "";
  });
  const [tenMau, setTenMau] = useState(() => {
    if (label) return label;
    else return "";
  });

  const [showSelection, setShowSelection] = useState(false);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    setMaMau(value);
  }, [value]);

  useEffect(() => {
    setTenMau(label);
  }, [label]);

  const handleChange = (value) => {
    setMaMau(value);
    let choice = data.filter((e) => e.value === value);
    console.log("choice: ", choice);
    setValue(value);
    setLabel(choice[0]["label"]);
    setTenMau(choice[0]["label"]);
    setShowInput(true);
    setShowSelection(false);
  };

  console.log("tenMau: ", tenMau);
  console.log("maMau: ", maMA);

  const handleFocusInput = () => {
    if (readOnly) return;
    setShowSelection(true);
    setShowInput(false);
  };
  const handleClickSelection = () => {
    setShowSelection(false);
    setShowInput(true);
  };
  console.log("data: ", data);
  console.log("showInput: ", showInput);
  return (
    <div className={className}>
      {showInput && (
        <Space>
          <input
            id="MAGIAY"
            value={value}
            onFocus={handleFocusInput}
            onClick={handleFocusInput}
            readOnly="true"
            tabindex="-1"
            style={{
              width: { size_input },
              // border: "none",
              fontSize: "1.45rem",
              resize: "none",
              verticalAlign: "middle",
              contenteditable: "true",
            }}
          />
          <input readOnly={true} value={tenMau} style={{ width: size_span }} />
        </Space>
      )}

      {showSelection && (
        <Select
          showSearch={true}
          optionFilterProp="children"
          style={{
            width: size_selection,
            // marginLeft: 200, // 600,
            position: "absolute",
          }}
          value={maMA}
          onChange={handleChange}
          filterOption={filterOption}
          key="maMA"
          autoFocus={true}
          defaultOpen={true}
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
                      width: "100px",
                      display: "inline-block",
                      borderRight: "1px solid #000",
                    }}
                  >
                    {e["value"]}
                  </span>
                  <span style={{ paddingLeft: "5px", width: "auto" }}>
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
                  width: "100px",
                  display: "inline-block",
                  borderRight: "1px solid #000",
                }}
              >
                {value}
              </span>
              <span style={{ paddingLeft: "10px", width: "auto" }}>
                {label}
              </span>
            </Option>
          )}
        </Select>
      )}
    </div>
  );
};

export default memo(Selection);
