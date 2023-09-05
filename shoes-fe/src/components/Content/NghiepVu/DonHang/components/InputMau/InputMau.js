import { useState, memo, useEffect } from "react";
import { Popover, Space } from "antd";
import { useItemsContext } from "~items_context";
import TableShowMau from "./TableShowMau";

const searchInfo = (firstLetter, data) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (
      data[i]["value"] !== "" &&
      data[i]["value"][0].toUpperCase() === firstLetter
    )
      result.push(data[i]);
  }
  return result;
};

const InputMau = ({ init, handleChangeDataTable, readOnly }) => {
  const [stateItem, dispatchItem] = useItemsContext();
  const [fistLetterMaMau, setFirstLetterMaMau] = useState("");
  const [data, setData] = useState(() => stateItem.infoItemMau);
  const [maMA, setMaMau] = useState(() => {
    if (init) {
      return init;
    } else return "";
  });
  const [labelMau, setLabelMau] = useState("");
  const [dataShow, setDataShow] = useState(() => {
    if (init) return searchInfo(init[0], stateItem.infoItemMau);
    else return stateItem.infoItemMau;
  });
  useEffect(() => {
    // để đây, chứ nếu truyền vào hàm kia luôn thì nó
    // sẽ bị bug => quá deep update trong ReactDom
    // nhưng nếu xóa hết, ko chọn MAMAU thì ko update lại được
    if (labelMau !== "") handleChangeDataTable(maMA, labelMau);
  }, [labelMau]);

  useEffect(() => {
    setMaMau(init);
  }, [init]);

  useEffect(() => {
    let a = searchInfo(fistLetterMaMau, data);
    // console.log(a);
    if (a.length > 0) {
      setDataShow(a);
    }
  }, [fistLetterMaMau]);

  const handleChangeMaMau = (e) => {
    setMaMau(e.target.value);
    if (e.target.value.length > 0)
      setFirstLetterMaMau(e.target.value[0].toUpperCase());
    else {
      setDataShow(data);
      setFirstLetterMaMau("");
      setLabelMau("");
      handleChangeDataTable("", "");
    }
  };

  return (
    <>
      {readOnly !== true ? (
        <Popover
          placement="bottomLeft"
          content={
            <TableShowMau
              data={dataShow}
              setInput={setMaMau}
              setLabel={setLabelMau}
            />
          }
        >
          <input
            id="MAMAU"
            value={maMA}
            onChange={handleChangeMaMau}
            autoComplete="off"
            style={{ border: "none" }}
          />
        </Popover>
      ) : (
        <input value={maMA} readOnly={readOnly} style={{ border: "none" }} />
      )}
    </>
  );
};

export default memo(InputMau);
