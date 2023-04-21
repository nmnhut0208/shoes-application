import DanhMuc from "./DanhMuc/";
import HeThong from "./HeThong/";
import NghiepVu from "./NghiepVu";
import TruyVan from "./TruyVan";
import BaoCao from "./BaoCao";

const Header = () => {
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
