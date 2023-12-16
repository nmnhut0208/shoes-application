import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const SUON = ({ readOnly, initValue, changeData, size_input }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemSuon);
  }, []);

  const [value, setValue] = useState(() => {
    if (initValue["value"]) return initValue["value"];
    else return "";
  });
  const [label, setLabel] = useState(() => {
    if (initValue["label"]) return initValue["label"];
    else return "";
  });
  useEffect(() => {
    changeData({ value, label });
  }, [value]);

  return (
    <Selection
      readOnly={readOnly}
      value={value}
      setValue={setValue}
      label={label}
      setLabel={setLabel}
      data={data}
      size_input={size_input}
    />
  );
};

export default memo(SUON);
