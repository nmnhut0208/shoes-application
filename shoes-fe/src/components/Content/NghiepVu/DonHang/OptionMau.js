import { memo } from "react";
const OptionMau = ({ dataMau }) => {
  return (
    <>
      {dataMau.map((data) => (
        <option value={data.value}>
          {data.value} - {data.label}
        </option>
      ))}
    </>
  );
};

export default memo(OptionMau);
