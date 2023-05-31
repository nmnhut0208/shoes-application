import { useEffect } from "react";
import DanhMuc from "./DanhMuc/";
import HeThong from "./HeThong/";
import NghiepVu from "./NghiepVu";
import TruyVan from "./TruyVan";
import BaoCao from "./BaoCao";
import { useItemsContext } from "~items_context";
import {
  getListDe,
  getListSuon,
  getListCa,
  getListQuai,
  getListMau,
  getListKhachHang,
} from "./helper";

const Header = () => {
  const [stateItem, dispatchItem] = useItemsContext();
  useEffect(() => {
    getListDe(dispatchItem);
    getListSuon(dispatchItem);
    getListCa(dispatchItem);
    getListQuai(dispatchItem);
    getListMau(dispatchItem);
    getListKhachHang(dispatchItem);
  }, []);
  console.log("stateItem: ", stateItem);
  return (
    <div>
      <HeThong />
      <DanhMuc />
      <NghiepVu />
      <TruyVan />
      <BaoCao />
    </div>
  );
};

export default Header;
