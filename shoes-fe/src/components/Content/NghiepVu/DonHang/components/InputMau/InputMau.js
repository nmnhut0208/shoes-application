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
const InputMau = ({ handleChangeDataTable, readOnly, rerender, init = "" }) => {
  const [stateItem, dispatchItem] = useItemsContext();
  const [maMA, setMaMau] = useState(() => {
    if (init) {
      return init;
    } else return "";
  });

  const [labelMau, setLabelMau] = useState("");

  useEffect(() => {
    if (labelMau !== "") handleChangeDataTable(maMA, labelMau);
  }, [labelMau]);

  useEffect(() => {
    setMaMau(init);
  }, [init]);

  const handleChange = (value) => {
    setMaMau(value);
    var choice = stateItem.infoItemMau.filter((e) => e.value === value);
    setLabelMau(choice[0]["lable"]);
    setShowInput(true);
    setShowSelection(false);
  };

  const [showSelection, setShowSelection] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const handleFocusInput = () => {
    setShowSelection(true);
    setShowInput(false);
  };
  const handleClickSelection = () => {
    setShowSelection(false);
    setShowInput(true);
  };
  return (
    <div
      style={{
        width: "90%",
        //  marginLeft: "8%", marginRight: "8%"
      }}
    >
      {showInput && (
        <input
          id="MAMAU"
          value={maMA}
          // autoComplete="off"
          tabindex="-1"
          onFocus={handleFocusInput}
          onClick={handleFocusInput}
          style={{
            width: "90%",
            // marginLeft: "8%",
            // marginRight: "8%",
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
            // marginLeft: "8%",
            // marginRight: "8%",
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
          {stateItem.infoItemMau.map((e) => (
            <Option style={customOptionStyle} value={e["value"]}>
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
