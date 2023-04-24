from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware


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
    list_key = ["key", "STT", "Mã giày", "Đơn giá",
                "Tên giày", "Mã đế", "Tên đế",
                "Mã sườn", "Tên sườn", "Mã cá",
                "Tên cá", "Item 3", "Item 4"]

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
    list_key = ["STT", "Mã màu", "Tên màu", "Ghi chú"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_suon")
def read_item():
    data = []
    list_key = ["STT", "Mã sườn", "Tên sườn", "Mã gót",
                "Tên gót", "Mã mũi", "Tên mũi", "Ghi chú"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_got")
def read_item():
    data = []
    list_key = ["STT", "Mã gót", "Tên gót",
                "Ghi chú"]

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_quai")
def read_item():
    data = []
    list_key = ["STT", "Mã quai", "Tên quai",
                "Đơn giá lương", "Ghi chú"]

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
        {"key": "STT", "width": "7rem"},
        {"key": "Mã khách hàng", "width": "21rem"},
        {"key": "Tên khách hàng", "width": "10rem"},
        {"key": "Địa chỉ", "width": "40rem"},
        {"key": "Điện thoại", "width": "8rem"},
        {"key": "Fax", "width": "16rem"},
        {"key": "Email", "width": "8rem"},
        {"key": "Ghi chú", "width": "16rem"},
    ]
    list_key = [a["key"] for a in info_key]
    print("list_key")

    for i in range(250):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_donhang")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "STT", "width": 7 * rem_to_px},
        {"key": "Mã giày", "width": 21 * rem_to_px},
        {"key": "Tên giày", "width": 40 * rem_to_px},
        {"key": "Màu đế", "width": 8 * rem_to_px},
        {"key": "Màu sườn", "width": 8 * rem_to_px},
        {"key": "Màu cá", "width": 8 * rem_to_px},
        {"key": "Màu quai", "width": 8 * rem_to_px},
        {"key": "Size 5", "width": 16 * rem_to_px},
        {"key": "Size 6", "width": 16 * rem_to_px},
        {"key": "Size 7", "width": 16 * rem_to_px},
        {"key": "Size 8", "width": 16 * rem_to_px},
        {"key": "Size 9", "width": 16 * rem_to_px},
        {"key": "Size 0", "width": 8 * rem_to_px},
        {"key": "Số lượng", "width": 24 * rem_to_px},
        {"key": "Giá bán", "width": 24 * rem_to_px},
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]
    print("list_key")

    columns_have_sum_feature = [
        "Size 5",
        "Size 6",
        "Size 7",
        "Size 8",
        "Size 9",
        "Size 0",
        "Số lượng",
        "Giá bán",
    ]

    for i in range(5):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
            if key in columns_have_sum_feature:
                _data[key] = i + columns_have_sum_feature.index(key)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)
