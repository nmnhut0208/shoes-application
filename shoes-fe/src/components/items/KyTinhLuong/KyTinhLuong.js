import { memo, useState, useEffect } from "react";
import Selection from "./Selection";
import { useItemsContext } from "~items_context";

const KyTinhLuong = ({
  readOnly,
  value,
  setValue,
  label,
  setLabel,
  size_input,
  have_span,
  size_span,
  size_selection = 450,
  have_set_save = false,
  isSaveData = true,
}) => {
  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemKyTinhLuong);
  }, []);

  useEffect(() => {
    setValue(value);
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
      have_span={have_span}
      readOnly={readOnly}
      size_selection={size_selection}
      have_set_save={have_set_save}
      isSaveData={isSaveData}
    />
  );
};

export default memo(KyTinhLuong);
