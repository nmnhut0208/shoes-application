import { DanhMuc } from "./DanhMuc"

export const Content = ({infoContent}) => {
    if (infoContent === "DanhMuc"){
        return <DanhMuc infoShow="Giay" />
    }
}