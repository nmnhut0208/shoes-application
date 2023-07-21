import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const Quai = ({ readOnly, initValue, changeData, size_input }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemQuai);
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

export default memo(Quai);
