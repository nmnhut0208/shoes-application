import { useState, memo, useEffect } from "react";
import { Popover, Space } from "antd";
import { useItemsContext } from "~items_context";
import Table from "./Table";

const searchInfo = (firstLetter, data) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i]["MAGIAY"].toUpperCase().includes(firstLetter.toUpperCase()))
      result.push(data[i]);
  }
  return result;
};

const GiayUnique = ({
  init,
  listGiayUnique,
  handleChangeDataTable,
  readOnly,
}) => {
  console.log("listGiayUnique: ", listGiayUnique);
  const [maMA, setMaMau] = useState(() => {
    if (init) {
      return init;
    } else return "";
  });
  const [data, setData] = useState([]);
  const [labelMau, setLabelMau] = useState("");
  const [dataShow, setDataShow] = useState(() => {
    if (init) return searchInfo(init[0], listGiayUnique);
    else return listGiayUnique;
  });
  useEffect(() => {
    setData(listGiayUnique);
    setDataShow(listGiayUnique);
  }, [listGiayUnique]);
  console.log("labelMau: ", labelMau);
  useEffect(() => {
    // để đây, chứ nếu truyền vào hàm kia luôn thì nó
    // sẽ bị bug => quá deep update trong ReactDom
    handleChangeDataTable(maMA, labelMau);
  }, [labelMau]);

  const handleChangeMaMau = (e) => {
    setMaMau(e.target.value);
    if (e.target.value.length > 0) {
      let a = searchInfo(e.target.value, data);
      console.log(a);
      if (a.length > 0) {
        setDataShow(a);
      }
    } else {
      setDataShow(data);
      setLabelMau("");
    }
  };

  return (
    <>
      {readOnly !== true ? (
        <Popover
          placement="bottomLeft"
          content={
            <Table data={dataShow} setInput={setMaMau} setLabel={setLabelMau} />
          }
        >
          <input
            id="MAGIAY"
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

export default GiayUnique;
