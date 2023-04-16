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
