import { useState, memo, useEffect } from "react";
import { Popover } from "antd";
import { useItemsContext } from "~items_context";
import TableShowMau from "./TableShowMau";

const searchInfo = (firstLetter, data) => {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (
      data[i]["value"] !== "" &&
      data[i]["firstLetter"] === firstLetter
    )
      result.push(data[i]);
  }
  return result;
};

const InputMau = ({ init, handleChangeDataTable, readOnly, rerender }) => {
  const [clicked, setClicked] = useState(false);
  const [stateItem, dispatchItem] = useItemsContext();
  const [fistLetterMaMau, setFirstLetterMaMau] = useState("");
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


  const handleClickChange = (open) => {
    setClicked(open);
  };

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
    let a = searchInfo(fistLetterMaMau, stateItem.infoItemMau);

    console.log("a: ", a);
    if (a.length > 0) {
      setDataShow(a);
    }
  }, [fistLetterMaMau, rerender]);

  const handleChangeMaMau = (e) => {
    setMaMau(e.target.value);
    if (e.target.value.length > 0) {
      setFirstLetterMaMau(e.target.value[0].toUpperCase());
    }
    else {
      setDataShow(stateItem.infoItemMau);
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
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
          content={
            <TableShowMau
              data={dataShow}
              setInput={setMaMau}
              setLabel={setLabelMau}
              showPopover={setClicked}
            />
          }
        >
          <input
            id="MAMAU"
            value={maMA}
            onChange={handleChangeMaMau}
            autoComplete="off"
            style={{ border: "none" }}
            tabindex="-1"
          />
        </Popover>
      ) : (
        <input value={maMA} readOnly={readOnly} style={{ border: "none" }} />
      )}
    </>
  );
};

export default memo(InputMau);
