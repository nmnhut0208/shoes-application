import { Popover } from "antd";
import { useState, memo } from "react";
import ListKhachHang from "./ListKhachHang";

const KhachHang = ({ initValue, changeData }) => {
  const [data, setData] = useState(initValue);
  return (
    <>
      <Popover
        placement="bottomLeft"
        content={
          <ListKhachHang
            changeData={(info) => {
              setData(info["MAKH"]);
              changeData(info);
            }}
          />
        }
      >
        <input name="MAKH" value={data} readOnly={true} />
      </Popover>
      {/* <input readOnly={true} value={formInfoDonHang["TENKH"]} /> */}
    </>
  );
};

export default KhachHang;
