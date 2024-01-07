import { useState, memo, useEffect } from "react";
import { Space } from "antd";
import { CustomAlert } from "~utils/alert_custom";
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
  have_span,
  have_set_save,
  isSaveData,
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
    if (have_set_save && !isSaveData) {
      CustomAlert("Lưu thông tin hiện tại trước khi đổi khách hàng!!!");
      return;
    }
    setMaMau(value);
    let choice = data.filter((e) => e.MAKH === value);
    console.log("choice: ", choice);
    setValue(value);
    setLabel(choice[0]["TENKH"]);
    setTenMau(choice[0]["TENKH"]);
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
          {have_span && (
            <input
              readOnly={true}
              value={tenMau}
              style={{ width: size_span }}
            />
          )}
        </Space>
      )}

      {showSelection && (
        <Select
          showSearch={true}
          optionFilterProp="children"
          style={{
            width: size_selection,
            // position: "absolute",
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
                  value={e["MAKH"]}
                  key={e["MAKH"]}
                >
                  <span
                    style={{
                      width: "100px",
                      display: "inline-block",
                      borderRight: "1px solid #000",
                      paddingLeft: "0px",
                    }}
                  >
                    {e["MAKH"]}
                  </span>
                  <span style={{ paddingLeft: "5px", width: "200px" }}>
                    {e["TENKH"]}
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
                  paddingLeft: "0px",
                }}
              >
                {value}
              </span>
              <span style={{ paddingLeft: "5px", width: "200px" }}>
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
