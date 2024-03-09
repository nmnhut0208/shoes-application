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
  id,
  onFocus,
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
    handleChangeDataTable(
      value,
      choice[0]["TENGIAY"],
      choice[0]["GIABAN"],
      choice[0]["TENCA"],
      choice[0]["HAVEHINHANH"]
    );

    var keysInfo = id.split("_");
    var x = parseInt(keysInfo[1]);
    var y = parseInt(keysInfo[2]);

    var yNewToTab = y + 1;
    let yNewRef = yNewToTab >= 6 ? yNewToTab - 6 : yNewToTab;
    let key = yNewToTab >= 6 ? "size" : "Id";
    var next_element = document.getElementById(`${key}_${x}_${yNewRef}`);
    if (yNewToTab < 6) {
      setTimeout(function () {
        // settimeout để hành động này thực hiện sau cùng, sau khi làm các thứ quan trọng khác trước
        next_element.click();
      }, 0);
    }
    if (yNewToTab >= 6 && yNewToTab <= 13) {
      next_element.focus(); // phải focus trước rồi mới selection sau nên là thêm timeout chỗ này chờ focus xong
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
    <div style={{ position: "relative", left: "0px", width: "100%" }}>
      {showInput && (
        <input
          id={id}
          value={maMA}
          tabindex="1"
          onFocus={handleFocus}
          onClick={handleClick}
          readOnly="true"
          style={{
            width: "100%",
            border: "none",
            fontFamily: "Arial",
            fontSize: "1.6rem",
            resize: "none",
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
            tabindex: "1",
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
                {e["HAVEHINHANH"]} - {e["TENGIAY"]}
              </span>
              {/* <span style={{ paddingLeft: "10px", width: "auto" }}>
                {e["HAVEHINHANH"]}
              </span> */}
            </Option>
          ))}
        </Select>
      )}
    </div>
  );
};

export default memo(GiayUnique);
