import { useState, memo, useEffect } from "react";

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

const GiayUnique = ({
  init,
  listGiayUnique,
  handleChangeDataTable,
  readOnly,
}) => {
  const [maMA, setMaMau] = useState(() => {
    if (init) {
      return init;
    } else return "";
  });
  const [showSelection, setShowSelection] = useState(false);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    setMaMau(init);
  }, [init]);

  const handleChange = (value) => {
    setMaMau(value);
    let choice = listGiayUnique.filter((e) => e.MAGIAY === value);
    handleChangeDataTable(value, choice[0]["TENGIAY"]);
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
    <div style={{ position: "relative" }}>
      {showInput && (
        <input
          id="MAGIAY"
          value={maMA}
          tabindex="-1"
          onFocus={handleFocusInput}
          onClick={handleFocusInput}
          readOnly="true"
          style={{
            width: "90%",
            border: "none",
            fontSize: "1.6rem",
          }}
        />
      )}

      {showSelection && !readOnly && (
        <Select
          showSearch={true}
          optionFilterProp="children"
          style={{
            width: 750,
            // marginLeft: 200, // 600,
            position: "absolute",
            top: 0,
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
          {listGiayUnique.map((e) => (
            <Option
              style={customOptionStyle}
              value={e["MAGIAY"]}
              key={e["MAGIAY"]}
            >
              <span
                style={{
                  width: "250px",
                  display: "inline-block",
                  borderRight: "1px solid #000",
                }}
              >
                {e["MAGIAY"]}
              </span>
              <span style={{ paddingLeft: "10px", width: "auto" }}>
                {e["TENGIAY"]}
              </span>
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default memo(GiayUnique);
