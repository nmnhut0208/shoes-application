import { memo, useState, useEffect } from "react";
import Selection from "./Selection";
import { useItemsContext } from "~items_context";

const KhachHang = ({
  readOnly,
  value,
  setValue,
  label,
  setLabel,
  size_input,
  have_span,
  size_span,
  size_selection = 450,
}) => {
  console.log("re-render ItemKhachHang");
  // const [clicked, setClicked] = useState(false);

  const [data, setData] = useState([{ value: "", label: "" }]);
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    setData(stateItem.infoItemKhachHang);
  }, []);

  // const [value, setValue] = useState(() => {
  //   if (initValue["value"]) return initValue["value"];
  //   else return "";
  // });
  // const [label, setLabel] = useState(() => {
  //   if (initValue["label"]) return initValue["label"];
  //   else return "";
  // });
  // useEffect(() => {
  //   setValue(initValue["value"]);
  //   setLabel(initValue["label"]);
  // }, [initValue]);

  useEffect(() => {
    // changeData({ value, label });
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
    />
  );
};

export default memo(KhachHang);
