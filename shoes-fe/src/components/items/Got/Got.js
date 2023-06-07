import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const Got = ({ initValue, changeData, size_input, size_span }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemGot);
  }, []);

  return (
    <>
      <Selection
        defaultValue={{
          value: initValue["value"],
          label: initValue["label"],
        }}
        data={data}
        changeData={changeData}
        size_input={size_input}
        size_span={size_span}
      />
    </>
  );
};

export default memo(Got);
