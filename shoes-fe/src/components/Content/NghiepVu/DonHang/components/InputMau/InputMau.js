import { useState, memo, useEffect } from "react";
import { useItemsContext } from "~items_context";
import { Select } from "antd";

const { Option } = Select;

const customOptionStyle = {
  borderBottom: "1px solid #000", // Add a border line at the bottom of each option
  padding: "4px 0", // Adjust padding as needed
  fontSize: "1.7rem",
};

const filterOption = (input, option) => {
  return (option?.value ?? "").toLowerCase().startsWith(input.toLowerCase());
};
const InputMau = ({
  id,
  onFocus,
  handleChangeDataTable,
  readOnly,
  init = "",
}) => {
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
    if (value.trim() === "") {
      value = "";
      handleChangeDataTable("", "");
    } else {
      let choice = stateItem.infoItemMau.filter((e) => e.value === value);
      handleChangeDataTable(value, choice[0]["label"]);
    }
    setMaMau(value);
    var keysInfo = id.split("_");
    var x = parseInt(keysInfo[1]);
    var y = parseInt(keysInfo[2]);

    var yNewToTab = y + 1;
    let yNewRef = yNewToTab >= 6 ? yNewToTab - 6 : yNewToTab;
    let key = yNewToTab >= 6 ? "size" : "Id";
    var next_element = document.getElementById(`${key}_${x}_${yNewRef}`);
    if (yNewToTab < 6) {
      next_element.click();
      setTimeout(function () {
        next_element.click();
      }, 0); // để 0 cũng được, để nó vô hàng chờ thôi => brower event
    }
    if (yNewToTab >= 6 && yNewToTab <= 13) {
      next_element.focus();
      setTimeout(function () {
        next_element.select();
      }, 0);
    }
    setShowInput(true);
    setShowSelection(false);
  };

  const handleClick = () => {
    onFocus();
    if (readOnly) return;
    setShowSelection(true);
    setShowInput(false);
  };

  const handleFocus = () => {
    onFocus();
    if (readOnly) return;
    setShowSelection(false);
    setShowInput(true);
  };

  const handleClickSelection = () => {
    setShowSelection(false);
    setShowInput(true);
  };
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {showInput && (
        <input
          id={id}
          value={maMA}
          tabindex="1"
          readOnly="true"
          onFocus={handleFocus}
          onClick={handleClick}
          style={{
            width: "100%",
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
                  width: "115px",
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
