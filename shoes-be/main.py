from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random 


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/items")
def read_item():
    data = []
    list_key = ["MAGIAY", "DONGIA", "TENGIAY", "MADE", "TENDE",
                "MASUON", "TENSUON", "MACA", "TENCA", "MAQUAI",
                "TENQUAI"]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_kho_hang")
def read_item():
    data = []
    list_key = ["key", "STT", "Mã kho hàng", "Tên kho hàng",
                "Ghi chú", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_mui")
def read_item():
    data = []
    list_key = ["key", "STT", "Mã Mũi", "Tên Mũi",
                "Ghi chú", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_de")
def read_item():
    data = []
    list_key = ["key", "STT", "Mã Đế", "Tên Đế", "Đơn giá Đế",
                "Ghi chú", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_ca")
def read_item():
    data = []
    list_key = ["key", "STT", "Mã Cá", "Tên Cá",
                "Ghi chú", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_nhan_vien")
def read_item():
    data = []
    list_key = ["key", "STT", "Mã nhân viên", "Tên nhân viên", "Loại nhân viên",
                "Ghi chú", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_giao_hang")
def read_item():
    data = []
    list_key = ["key", "SODH", "NGAYDH", "Ngày giao hàng", "Diễn giải",
                "SOLUONG còn lại", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_ky_tinh_luong")
def read_item():
    data = []
    list_key = ["key", "STT", "Mã kỳ", "Tên kỳ", "Từ ngày",
                "Đến ngày", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
            _data["Từ ngày"] = "29-04-2023"
            _data["Đến ngày"] = "30-4-2023"
        data.append(_data)
    return data


@app.get("/items_mau")
def read_item():
    data = []
    list_key = ["MAMAU", "TENMAU", "GHICHU"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_suon")
def read_item():
    data = []
    list_key = ["MASUON", "TENSUON", "MAGOT", "TENGOT",
                "MAMUI", "TENMUI", "GHICHU"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_got")
def read_item():
    data = []
    list_key = ["MAGOT", "TENGOT", "GHICHU"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_quai")
def read_item():
    data = []
    list_key = ["STT", "MAQUAI", "TENQUAI",
                "DONGIA", "GHICHU"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_khachhang")
def read_item():
    data = []
    info_key = [
        {"header": "MAKH", "key": "MAKH", "width": "15rem"},
        {"header": "TENKH", "key": "TENKH", "width": "20rem"},
        {"header": "Địa chỉ", "key": "DIACHI", "width": "30rem"},
        {"header": "Điện thoại", "key": "TEL", "width": "10rem"},
        {"header": "Fax", "key": "FAX", "width": "10rem"},
        {"header": "Email", "key": "EMAIL", "width": "10rem"},
        {"header": "Ghi chú", "key": "GHICHU", "width": "16rem"},
    ]
    list_key = [a["key"] for a in info_key]
    print("list_key")

    for i in range(250):
        _data = {}
        for key in list_key:
            if key == "STT":
                _data[key] = i
                continue
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_donhang")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "MAGIAY", "width": 21 * rem_to_px},
        {"key": "TENGIAY", "width": 40 * rem_to_px},
        {"key": "TENMAUDE", "width": 8 * rem_to_px},
        {"key": "TENMAUSUON", "width": 8 * rem_to_px},
        {"key": "TENMAUCA", "width": 8 * rem_to_px},
        {"key": "TENMAUQUAI", "width": 8 * rem_to_px},
        {"key": "SIZE5", "width": 16 * rem_to_px},
        {"key": "SIZE6", "width": 16 * rem_to_px},
        {"key": "SIZE7", "width": 16 * rem_to_px},
        {"key": "SIZE8", "width": 16 * rem_to_px},
        {"key": "SIZE9", "width": 16 * rem_to_px},
        {"key": "SIZE0", "width": 8 * rem_to_px},
        {"key": "SOLUONG", "width": 24 * rem_to_px},
        {"key": "GIABAN", "width": 24 * rem_to_px},
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]
    print("list_key")

    columns_have_sum_feature = [
        "SIZE5",
        "SIZE6",
        "SIZE7",
        "SIZE8",
        "SIZE9",
        "SIZE0",
        "SOLUONG",
        "GIABAN",
    ]

    for i in range(5):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
            if key in columns_have_sum_feature:
                _data[key] = i + columns_have_sum_feature.index(key)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_danhmuc_giay_khachhang")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "MAGIAY", "width": 21 * rem_to_px, "enableEditing": False},
        {"key": "TENGIAY", "width": 40 * rem_to_px, "enableEditing": False},
        {"key": "TENMAUDE", "width": 12 * rem_to_px, "enableEditing": True},
        {"key": "TENMAUGOT", "width": 12 * rem_to_px, "enableEditing": True},
        {"key": "TENMAUSUON", "width": 12 * rem_to_px, "enableEditing": False},
        {"key": "TENMAUCA", "width": 12 * rem_to_px, "enableEditing": False},
        {"key": "TENMAUQUAI", "width": 12 * rem_to_px, "enableEditing": False},
        {"key": "GIABAN", "width": 24 * rem_to_px, "enableEditing": False},
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]

    for i in range(15):
        _data = {}
        for key in list_key:
            _data[key] = "kh-{} - {}".format(key, i+1)
            if key == "MAGIAY":
                _data[key] = "kh-{}-{}".format(key, i//5)
            if key == "GIABAN":
                _data[key] = random.randint(100, 200)
                continue
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_donhang_page_phan_cong")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "SODH", "width": 21 * rem_to_px},
        {"key": "NGAYDH", "width": 16 * rem_to_px},
        {"key": "MAKH", "width": 16 * rem_to_px},
        {"key": "TENKH", "width": 25 * rem_to_px},
        {"key": "DIENGIAI", "width": 35 * rem_to_px},
        {"key": "SOLUONG", "width": 21 * rem_to_px}
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]
    print("list_key")

    columns_have_sum_feature = [
        "SOLUONG",
    ]

    for i in range(5):
        _data = {}
        for key in list_key:
            if key == "STT":
                _data[key] = i
                continue
            _data[key] = "{} - {}".format(key, i+1)
            if key in columns_have_sum_feature:
                _data[key] = i + columns_have_sum_feature.index(key)+20
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


class InfoDonHang (BaseModel):
    id: str
    nof: int


@app.post("/items_donhang_with_id")
def read_item(donhang: InfoDonHang):
    id_donhang = donhang.id
    nof_giay = donhang.nof
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "SODH"},
        {"key": "MAGIAY", "width": 21 * rem_to_px},
        {"key": "TENGIAY", "width": 40 * rem_to_px},
        {"key": "TENMAUDE", "width": 8 * rem_to_px},
        {"key": "TENMAUSUON", "width": 8 * rem_to_px},
        {"key": "TENMAUCA", "width": 8 * rem_to_px},
        {"key": "TENMAUQUAI", "width": 8 * rem_to_px},
        {"key": "SIZE5", "width": 16 * rem_to_px},
        {"key": "SIZE6", "width": 16 * rem_to_px},
        {"key": "SIZE7", "width": 16 * rem_to_px},
        {"key": "SIZE8", "width": 16 * rem_to_px},
        {"key": "SIZE9", "width": 16 * rem_to_px},
        {"key": "SIZE0", "width": 8 * rem_to_px},
        {"key": "SOLUONG", "width": 24 * rem_to_px},
        {"key": "GIABAN", "width": 24 * rem_to_px},
        {"key": "THANHTIEN"}
    ]
    list_key = [a["key"] for a in info_key]

    columns_have_sum_feature = [
        "SIZE5",
        "SIZE6",
        "SIZE7",
        "SIZE8",
        "SIZE9",
        "SIZE0",
    ]
    import random
    nof_loop = random.randint(3, 5)
    print("nof_loop: ", nof_loop)
    nof_da_dat = 0
    for i in range(nof_loop):
        _nof_each_loop = 0
        _data = {}
        for key in list_key:
            if key == "SODH":
                _data[key] = id_donhang
                continue
            if key == "MAGIAY":
                _data[key] = "{}-{} - {}".format(id_donhang,
                                                 key, random.randint(1, 3))
                continue
            if key == "SOLUONG":
                _nums = 0
                for _k in columns_have_sum_feature:
                    _nums += _data[_k]
                _data[key] = _nums
                continue
            if key == "GIABAN":
                _data[key] = random.randint(100, 200)
                continue
            
            if key == "THANHTIEN":
                _data[key] = _data["SOLUONG"] * _data["GIABAN"]
                continue

            _data[key] = "{} - {}".format(key, i+1)


            if "MAU" in key:
                _data[key] = "{}-{}".format(key, random.randint(1, 3))
                continue

            if key in columns_have_sum_feature:
                if nof_da_dat >= nof_giay:
                    _data[key] = 0
                else:
                    _data[key] = min(nof_giay-nof_da_dat, random.randint(
                        2, 5))

                nof_da_dat += _data[key]
                _nof_each_loop += _data[key]

        if (_nof_each_loop > 0):
            data.append(_data)

    data[-1]["SIZE0"] = nof_giay - nof_da_dat
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_donhang_truy_van")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "SODH", "width": 21 * rem_to_px},
        {"key": "NGAYDH", "width": 16 * rem_to_px},
        {"key": "Ngày giao hàng", "width": 16 * rem_to_px},
        {"key": "MAKH", "width": 16 * rem_to_px},
        {"key": "TENKH", "width": 25 * rem_to_px},
        {"key": "DIENGIAI", "width": 35 * rem_to_px},
        {"key": "SOLUONG", "width": 21 * rem_to_px},
        {"key": "Giá lẻ"}
    ]
    list_key = [a["key"] for a in info_key]

    columns_have_sum_feature = [
    ]

    for i in range(5):
        _data = {}
        for key in list_key:
            if key == "Giá lẻ":
                _data[key] = random.choice([True, False])
                continue
            if key == "STT":
                _data[key] = i
                continue
            _data[key] = "{} - {}".format(key, i+1)
            if key in columns_have_sum_feature:
                _data[key] = i + columns_have_sum_feature.index(key)+20
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_phancong_truy_van")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "SOPHIEU", "width": 21 * rem_to_px},
        {"key": "NGAYPHIEU", "width": 16 * rem_to_px},
        {"key": "SODH", "width": 16 * rem_to_px},
        {"key": "DIENGIAIPHIEU", "width": 35 * rem_to_px},
    ]
    list_key = [a["key"] for a in info_key]

    columns_have_sum_feature = [
    ]

    for i in range(5):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
            if key in columns_have_sum_feature:
                _data[key] = i + columns_have_sum_feature.index(key)+20
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_donhang_page_phan_cong_by_so_phieu")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "STT", "width": 5 * rem_to_px},
        {"key": "SODH", "width": 21 * rem_to_px},
        {"key": "NGAYDH", "width": 16 * rem_to_px},
        {"key": "MAKH", "width": 16 * rem_to_px},
        {"key": "TENKH", "width": 25 * rem_to_px},
        {"key": "DIENGIAI", "width": 35 * rem_to_px},
        {"key": "SOLUONG", "width": 21 * rem_to_px}
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]
    print("list_key")

    columns_have_sum_feature = [
        "SOLUONG",
    ]

    for i in range(2):
        _data = {}
        for key in list_key:
            if key == "STT":
                _data[key] = i
                continue
            _data[key] = "{} - {}".format(key, i+1)
            if key in columns_have_sum_feature:
                _data[key] = i + columns_have_sum_feature.index(key)+20
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)
