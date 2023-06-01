import { Popover } from "antd";
import { useState, memo } from "react";
import ListKhachHang from "./ListKhachHang";

const KhachHang = ({ readOnly, initValue, changeData, size }) => {
  const [data, setData] = useState(initValue);
  return (
    <>
      {!readOnly && (
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
          <input
            name="MAKH"
            value={data}
            readOnly={true}
            style={{ width: size }}
          />
        </Popover>
      )}
      {readOnly && (
        <input
          name="MAKH"
          value={data}
          readOnly={true}
          style={{ width: size }}
        />
      )}
      {/* <input readOnly={true} value={formInfoDonHang["TENKH"]} /> */}
    </>
  );
};

export default KhachHang;
