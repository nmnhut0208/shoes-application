import Giay from "./HangHoa"

export const DanhMuc = ({infoShow}) => {
    if (infoShow === "giay"){
        return <Giay></Giay>
    }

    return <h1>Chưa setting!!!</h1>
}