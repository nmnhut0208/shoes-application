import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const ThoDe = ({ initValue, changeData, size_input, className, size_span }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemThoDe);
  }, []);

  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  useEffect(() => {
    setValue(initValue["value"]);
    setLabel(initValue["label"]);
  }, []);

  useEffect(() => {
    changeData({ value, label });
  }, [value]);

  return (
    <Selection
      className={className}
      value={value}
      setValue={setValue}
      label={label}
      setLabel={setLabel}
      data={data}
      size_input={size_input}
      size_span={size_span}
    />
  );
};

export default memo(ThoDe);
