export const getHandleHeThong = (e) => {
    const detailTask = { "infoContent": "HeThong" }
    switch (e.key) {
        case "Đăng nhập":
            {
                detailTask["infoDetail"] = "DangNhap"
                break
            }
        case "Kết nối dữ liệu":
            {
                detailTask["infoDetail"] = "KetNoiDuLieu"
                break
            }
        case "Đổi mật khẩu":
            {
                detailTask["infoDetail"] = "DoiMatKhau"
                break
            }
        default:
            break
    }
    return detailTask
}

export const getHandleDanhMuc = (e) => {
    const detailTask = { "infoContent": "DanhMuc" }
    switch (e.key) {
        case "Giày":
            {
                detailTask["infoDetail"] = "HangHoa-Giay"
                break
            }
        case "Kho hàng":
            {
                detailTask["infoDetail"] = "HangHoa-Khohang"
                break
            }
        default:
            break
    }

    return detailTask
}