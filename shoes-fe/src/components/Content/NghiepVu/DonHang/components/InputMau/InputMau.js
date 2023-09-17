import { useState, memo, useEffect } from "react";
import { useItemsContext } from "~items_context";
import { Select } from "antd";

const { Option } = Select;

const customOptionStyle = {
  borderBottom: "1px solid #000", // Add a border line at the bottom of each option
  padding: "4px 0", // Adjust padding as needed
};

const filterOption = (input, option) => {
  return (option?.value ?? "").toLowerCase().startsWith(input.toLowerCase());
};
const InputMau = ({ handleChangeDataTable, readOnly, init = "" }) => {
  const [stateItem, dispatchItem] = useItemsContext();
  const [showSelection, setShowSelection] = useState(false);
  const [showInput, setShowInput] = useState(true);

  const [maMA, setMaMau] = useState(() => {
    if (init) {
      return init;
    } else return "";
  });

  useEffect(() => {
    setMaMau(init);
  }, [init]);

  const handleChange = (value) => {
    setMaMau(value);
    let choice = stateItem.infoItemMau.filter((e) => e.value === value);
    handleChangeDataTable(maMA, choice[0]["label"]);
    setShowInput(true);
    setShowSelection(false);
  };

  const handleFocusInput = () => {
    setShowSelection(true);
    setShowInput(false);
  };
  const handleClickSelection = () => {
    setShowSelection(false);
    setShowInput(true);
  };

  const handleBlurSelection = () => {
    setShowSelection(false);
    setShowInput(true);
    console.log("haiz, blur selection ne");
  };
  return (
    <div style={{ position: "relative" }}>
      {showInput && (
        <input
          id="MAMAU"
          value={maMA}
          tabindex="-1"
          readOnly="true"
          onFocus={handleBlurSelection}
          onClick={handleFocusInput}
          style={{
            width: "90%",
            border: "none",
          }}
        />
      )}

      {showSelection && !readOnly && (
        <Select
          showSearch={true}
          optionFilterProp="children"
          style={{
            width: 400,
            marginLeft: 78,
            position: "absolute",
            // top: 0,
          }}
          value={init}
          onChange={handleChange}
          filterOption={filterOption}
          key="maMA"
          autoFocus={true}
          defaultOpen={true}
          onBlur={handleClickSelection}
          onClick={handleClickSelection}
          bordered={false}
          autoComplete="off"
          placement="bottomLeft"
        >
          {stateItem.infoItemMau.map((e) => (
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
              <span style={{ paddingLeft: "10px" }}>{e["label"]}</span>
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default memo(InputMau);
