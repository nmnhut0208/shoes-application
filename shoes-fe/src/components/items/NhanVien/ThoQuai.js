import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const ThoQuai = ({ initValue, changeData, size_input }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemThoQuai);
  }, []);

  const [value, setValue] = useState(initValue["value"]);
  const [label, setLabel] = useState(initValue["label"]);
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
    />
  );
};

export default memo(ThoQuai);
