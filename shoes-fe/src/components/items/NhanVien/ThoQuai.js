import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const ThoQuai = ({ initValue, changeData, size_input, size_span }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemThoQuai);
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

export default memo(ThoQuai);
