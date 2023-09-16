import { useState, memo, useEffect } from "react";
import { Popover } from "antd";
import { useItemsContext } from "~items_context";
import { Select } from "antd";

const InputMau = ({ handleChangeDataTable, readOnly, rerender, init = "" }) => {
  const [clicked, setClicked] = useState(false);
  const [stateItem, dispatchItem] = useItemsContext();
  const [maMA, setMaMau] = useState(() => {
    if (init) {
      return init;
    } else return "";
  });

  const [labelMau, setLabelMau] = useState("");

  const handleClickChange = (open) => {
    setClicked(open);
  };

  useEffect(() => {
    if (labelMau !== "") handleChangeDataTable(maMA, labelMau);
  }, [labelMau]);

  useEffect(() => {
    setMaMau(init);
    for (let i = 0; i < stateItem.infoItemMau.length; i++) {
      console.log(stateItem.infoItemMau[i]["label"].length);
    }
  }, [init]);

  const handleChange = (value) => {
    setClicked(false);
    setMaMau(value);
    var choice = stateItem.infoItemMau.filter((e) => e.value === value);
    setLabelMau(choice[0]["lable"]);
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  console.log("stateItem.infoItemMau: ", stateItem.infoItemMau[100]);

  return (
    <>
      {readOnly !== true ? (
        <Popover
          placement="bottomLeft"
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
          content={
            <Select
              showSearch
              defaultOpen={true}
              optionFilterProp="children"
              style={{
                width: "400px",
              }}
              defaultValue={init}
              onChange={handleChange}
              options={stateItem.infoItemMau}
              filterOption={filterOption}
            />
          }
        >
          <input
            id="MAMAU"
            value={maMA}
            autoComplete="off"
            style={{ border: "none" }}
            tabindex="-1"
          />
        </Popover>
      ) : (
        <input value={maMA} readOnly={readOnly} style={{ border: "none" }} />
      )}
    </>
  );
};

export default memo(InputMau);
