import { useState, memo, useEffect } from "react";
import Selection from "../Selection";
import { useItemsContext } from "~items_context";

const De = ({ initValue, changeData, size_input }) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemDe);
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
      />
    </>
  );
};

export default memo(De);
