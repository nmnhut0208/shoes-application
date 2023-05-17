from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pyodbc
import pandas as pd

conn = pyodbc.connect(driver="SQL Server", server="MINH\SQLEXPRESS",
                      database="PT",
                      trusted_connection="yes")
cursor = conn.cursor()


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


# @app.get("/items_kho_hang")
# def read_item():
#     data = []
#     list_key = ["key", "STT", "Mã kho hàng", "Tên kho hàng",
#                 "Ghi chú", ]

#     for i in range(100):
#         _data = {}
#         for key in list_key:
#             _data[key] = "{} - {}".format(key, i+1)
#         data.append(_data)
#     return data

@app.get("/items_kho_hang")
def read_item():
    data = []
    list_key = ["Mã kho hàng", "Tên kho hàng",
                "Ghi chú", ]

    # cursor = conn.cursor()
    sql = "SELECT * FROM DMKHO"
    cursor.execute(sql)
    for index, row in enumerate(cursor):
        _data = {}
        # _data[list_key[0]] = index
        for i in range(len(list_key)):
            _data[list_key[i]] = row[i]
        data.append(_data)
    return data


@app.post("/items_kho_hang_insert")
def items_kho_hang_insert(item: dict):
    item['MAKHO'] = item.pop('Mã kho hàng')
    item['TENKHO'] = item.pop('Tên kho hàng')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'INSERT INTO DMKHO (MAKHO, TENKHO, GHICHU) VALUES (?, ?, ?)'
    cursor.execute(sql, item['MAKHO'], item['TENKHO'], item['GHICHU'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_kho_hang_update")
def items_kho_hang_update(item: dict):
    # print(item)
    item['MAKHO'] = item.pop('Mã kho hàng')
    item['TENKHO'] = item.pop('Tên kho hàng')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'UPDATE DMKHO SET TENKHO = ?, GHICHU = ? WHERE MAKHO = ?'
    cursor.execute(sql, item['TENKHO'], item['GHICHU'], item['MAKHO'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_kho_hang_delete")
def items_kho_hang_delete(item: dict):
    # print(item)
    item['MAKHO'] = item.pop('Mã kho hàng')

    sql = 'DELETE FROM DMKHO WHERE MAKHO = ?'
    cursor.execute(sql, item['MAKHO'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


# @app.get("/items_mui")
# def read_item():
#     data = []
#     list_key = ["key", "STT", "Mã Mũi", "Tên Mũi",
#                 "Ghi chú", ]

#     for i in range(100):
#         _data = {}
#         for key in list_key:
#             _data[key] = "{} - {}".format(key, i+1)
#         data.append(_data)
#     return data

@app.get("/items_mui")
def read_item():
    data = []
    list_key = ["Mã Mũi", "Tên Mũi",
                "Ghi chú", ]

    # cursor = conn.cursor()
    sql = "SELECT MAMUI, TENMUI, GHICHU FROM DMMUI"
    cursor.execute(sql)
    for index, row in enumerate(cursor):
        _data = {}
        # _data[list_key[0]] = index
        for i in range(len(list_key)):
            _data[list_key[i]] = row[i]
            # print(_data)
        data.append(_data)
    return data


@app.post("/items_mui_insert")
def items_mui_insert(item: dict):
    item['MAMUI'] = item.pop('Mã Mũi')
    item['TENMUI'] = item.pop('Tên Mũi')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'INSERT INTO DMMUI (MAMUI, TENMUI, GHICHU) VALUES (?, ?, ?)'
    cursor.execute(sql, item['MAMUI'], item['TENMUI'], item['GHICHU'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_mui_update")
def items_mui_update(item: dict):
    # print(item)
    item['MAMUI'] = item.pop('Mã Mũi')
    item['TENMUI'] = item.pop('Tên Mũi')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'UPDATE DMMUI SET TENMUI = ?, GHICHU = ? WHERE MAMUI = ?'
    cursor.execute(sql, item['TENMUI'], item['GHICHU'], item['MAMUI'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_mui_delete")
def items_mui_delete(item: dict):
    # print(item)
    item['MAMUI'] = item.pop('Mã Mũi')

    sql = 'DELETE FROM DMMUI WHERE MAMUI = ?'
    cursor.execute(sql, item['MAMUI'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})

# @app.get("/items_de")
# def read_item():
#     data = []
#     list_key = ["key", "STT", "Mã Đế", "Tên Đế", "Đơn giá Đế",
#                 "Ghi chú", ]

#     for i in range(100):
#         _data = {}
#         for key in list_key:
#             _data[key] = "{} - {}".format(key, i+1)
#         data.append(_data)
#     return data


@app.get("/items_de")
def read_item():
    data = []
    list_key = ["Mã Đế", "Tên Đế", "Đơn giá Đế",
                "Ghi chú", ]

    # cursor = conn.cursor()
    sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    cursor.execute(sql)
    for index, row in enumerate(cursor):
        _data = {}
        # _data[list_key[0]] = index
        for i in range(len(list_key)):
            _data[list_key[i]] = row[i]
        data.append(_data)
    return data


@app.post("/items_de_insert")
def items_de_insert(item: dict):
    item['MADE'] = item.pop('Mã Đế')
    item['TENDE'] = item.pop('Tên Đế')
    item['DONGIA'] = item.pop('Đơn giá Đế')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'INSERT INTO DMDE (MADE, TENDE, DONGIA, GHICHU) VALUES (?, ?, ?, ?)'
    cursor.execute(sql, item['MADE'], item['TENDE'],
                   item['DONGIA'], item['GHICHU'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_de_update")
def items_de_update(item: dict):
    # print(item)
    item['MADE'] = item.pop('Mã Đế')
    item['TENDE'] = item.pop('Tên Đế')
    item['DONGIA'] = item.pop('Đơn giá Đế')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'UPDATE DMDE SET TENDE = ?, DONGIA = ?, GHICHU = ? WHERE MADE = ?'
    cursor.execute(sql, item['TENDE'], item['DONGIA'],
                   item['GHICHU'], item['MADE'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_de_delete")
def items_de_delete(item: dict):
    # print(item)
    item['MADE'] = item.pop('Mã Đế')

    sql = 'DELETE FROM DMDE WHERE MADE = ?'
    cursor.execute(sql, item['MADE'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})

# @app.get("/items_ca")
# def read_item():
#     data = []
#     list_key = ["key", "STT", "Mã Cá", "Tên Cá",
#                 "Ghi chú", ]

#     for i in range(100):
#         _data = {}
#         for key in list_key:
#             _data[key] = "{} - {}".format(key, i+1)
#         data.append(_data)
#     return data


@app.get("/items_ca")
def read_item():
    data = []
    list_key = ["Mã Cá", "Tên Cá",
                "Ghi chú", ]

    # cursor = conn.cursor()
    sql = "SELECT * FROM DMCA"
    cursor.execute(sql)
    for index, row in enumerate(cursor):
        _data = {}
        # _data[list_key[0]] = index
        for i in range(len(list_key)):
            _data[list_key[i]] = row[i]
        data.append(_data)
    return data


@app.post("/items_ca_insert")
def items_ca_insert(item: dict):
    item['MACA'] = item.pop('Mã Cá')
    item['TENCA'] = item.pop('Tên Cá')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'INSERT INTO DMCA (MACA, TENCA, GHICHU) VALUES (?, ?, ?)'
    cursor.execute(sql, item['MACA'], item['TENCA'], item['GHICHU'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_ca_update")
def items_ca_update(item: dict):
    # print(item)
    item['MACA'] = item.pop('Mã Cá')
    item['TENCA'] = item.pop('Tên Cá')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'UPDATE DMCA SET TENCA = ?, GHICHU = ? WHERE MACA = ?'
    cursor.execute(sql, item['TENCA'], item['GHICHU'], item['MACA'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_ca_delete")
def items_ca_delete(item: dict):
    # print(item)
    item['MACA'] = item.pop('Mã Cá')

    sql = 'DELETE FROM DMCA WHERE MACA = ?'
    cursor.execute(sql, item['MACA'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})

# @app.get("/items_nhan_vien")
# def read_item():
#     data = []
#     list_key = ["key", "STT", "Mã nhân viên", "Tên nhân viên", "Loại nhân viên",
#                 "Ghi chú", ]

#     for i in range(100):
#         _data = {}
#         for key in list_key:
#             _data[key] = "{} - {}".format(key, i+1)
#         data.append(_data)
#     return data


@app.get("/items_nhan_vien")
def read_item():
    data = []
    list_key = ["Mã nhân viên", "Tên nhân viên", "Loại nhân viên",
                "Ghi chú", ]

    # cursor = conn.cursor()
    sql = "SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU FROM DMNHANVIEN"
    cursor.execute(sql)
    for index, row in enumerate(cursor):
        _data = {}
        # _data[list_key[0]] = index
        for i in range(len(list_key)):
            _data[list_key[i]] = row[i]
        data.append(_data)
    return data


@app.post("/items_nhan_vien_insert")
def items_nhan_vien_insert(item: dict):
    item['MANVIEN'] = item.pop('Mã nhân viên')
    item['TENNVIEN'] = item.pop('Tên nhân viên')
    item['LOAINVIEN'] = item.pop('Loại nhân viên')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'INSERT INTO DMNHANVIEN (MANVIEN, TENNVIEN, LOAINVIEN, GHICHU) VALUES (?, ?, ?, ?)'
    cursor.execute(sql, item['MANVIEN'], item['TENNVIEN'],
                   item['LOAINVIEN'], item['GHICHU'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_nhan_vien_update")
def items_nhan_vien_update(item: dict):
    # print(item)
    item['MANVIEN'] = item.pop('Mã nhân viên')
    item['TENNVIEN'] = item.pop('Tên nhân viên')
    item['LOAINVIEN'] = item.pop('Loại nhân viên')
    item['GHICHU'] = item.pop('Ghi chú')

    sql = 'UPDATE DMNHANVIEN SET TENNVIEN = ?, LOAINVIEN = ?, GHICHU = ? WHERE MANVIEN = ?'
    cursor.execute(sql, item['TENNVIEN'],
                   item['LOAINVIEN'], item['GHICHU'], item['MANVIEN'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_nhan_vien_delete")
def items_nhan_vien_delete(item: dict):
    # print(item)
    item['MANVIEN'] = item.pop('Mã nhân viên')

    sql = 'DELETE FROM DMNHANVIEN WHERE MANVIEN = ?'
    cursor.execute(sql, item['MANVIEN'])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.get("/items_giao_hang")
def read_item():
    data = []
    list_key = ["key", "Số đơn hàng", "Ngày đơn hàng", "Ngày giao hàng", "Diễn giải",
                "Số lượng còn lại", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_tv_giao_hang")
def read_item():
    data = []
    list_key = ["key", "Số phiếu", "Ngày phiếu", "Số đơn hàng", "Khách hàng",
                "Tên khách hàng", "Diễn giải", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_tv_thu")
def read_item():
    data = []
    list_key = ["key", "Số phiếu", "Ngày phiếu", "Khách hàng",
                "Tên khách hàng", "Số tiền", "Diễn giải", ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


@app.get("/items_cham_cong")
def read_item():
    data = []
    list_key = ["key", "STT", "Số phiếu", "Ngày phiếu", "Diễn giải",
                ]

    for i in range(100):
        _data = {}
        for key in list_key:
            _data[key] = "{} - {}".format(key, i+1)
        data.append(_data)
    return data


# @app.get("/items_ky_tinh_luong")
# def read_item():
#     data = []
#     list_key = ["key", "STT", "Mã kỳ", "Tên kỳ", "Từ ngày",
#                 "Đến ngày", ]

#     for i in range(100):
#         _data = {}
#         for key in list_key:
#             _data[key] = "{} - {}".format(key, i+1)
#             _data["Từ ngày"] = "29-04-2023"
#             _data["Đến ngày"] = "30-4-2023"
#         data.append(_data)
#     return data

@app.get("/items_ky_tinh_luong")
def read_item():
    data = []
    list_key = ["Mã kỳ", "Tên kỳ", "Từ ngày",
                "Đến ngày", ]

    cursor = conn.cursor()
    sql = "SELECT * FROM DMKYTINHLUONG"
    cursor.execute(sql)
    for index, row in enumerate(cursor):
        _data = {}
        # _data[list_key[0]] = index
        for i in range(len(list_key)):
            _data[list_key[i]] = row[i]
        data.append(_data)
    return data


@app.post("/items_ky_tinh_luong_insert")
def items_ky_tinh_luong_insert(item: dict):
    item["MAKY"] = item.pop("Mã kỳ")
    item["TENKY"] = item.pop("Tên kỳ")
    item["TUNGAY"] = item.pop("Từ ngày")
    item["DENNGAY"] = item.pop("Đến ngày")

    sql = "INSERT INTO DMKYTINHLUONG VALUES (?, ?, ?, ?)"
    cursor.execute(sql, item["MAKY"], item["TENKY"],
                   item["TUNGAY"], item["DENNGAY"])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_ky_tinh_luong_update")
def items_ky_tinh_luong_update(item: dict):
    item["MAKY"] = item.pop("Mã kỳ")
    item["TENKY"] = item.pop("Tên kỳ")
    item["TUNGAY"] = item.pop("Từ ngày")
    item["DENNGAY"] = item.pop("Đến ngày")

    sql = "UPDATE DMKYTINHLUONG SET TENKY = ?, TUNGAY = ?, DENNGAY = ? WHERE MAKY = ?"
    cursor.execute(sql, item["TENKY"], item["TUNGAY"],
                   item["DENNGAY"], item["MAKY"])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


@app.post("/items_ky_tinh_luong_delete")
def items_ky_tinh_luong_delete(item: dict):
    item["MAKY"] = item.pop("Mã kỳ")
    item["TENKY"] = item.pop("Tên kỳ")
    item["TUNGAY"] = item.pop("Từ ngày")
    item["DENNGAY"] = item.pop("Đến ngày")

    sql = "DELETE FROM DMKYTINHLUONG WHERE MAKY = ?"
    cursor.execute(sql, item["MAKY"])
    conn.commit()
    return JSONResponse(status_code=status.HTTP_200_OK, content={"message": "success"})


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
            if key == "STT":
                _data[key] = i
                continue
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
        {"key": "STT", "width": 7 * rem_to_px, "enableEditing": False},
        {"key": "Mã giày", "width": 21 * rem_to_px, "enableEditing": False},
        {"key": "Tên giày", "width": 40 * rem_to_px, "enableEditing": False},
        {"key": "Màu đế", "width": 12 * rem_to_px, "enableEditing": True},
        {"key": "Màu gót", "width": 12 * rem_to_px, "enableEditing": True},
        {"key": "Màu sườn", "width": 12 * rem_to_px, "enableEditing": False},
        {"key": "Màu cá", "width": 12 * rem_to_px, "enableEditing": False},
        {"key": "Màu quai", "width": 12 * rem_to_px, "enableEditing": False},
        {"key": "Giá bán", "width": 24 * rem_to_px, "enableEditing": False},
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]

    for i in range(15):
        _data = {}
        for key in list_key:
            if key == "STT":
                _data[key] = i
                continue
            _data[key] = "kh-{} - {}".format(key, i+1)
            if key == "Mã giày":
                _data[key] = "kh-{}-{}".format(key, i//5)
        data.append(_data)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)


@app.get("/items_donhang_page_phan_cong")
def read_item():
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "STT", "width": 5 * rem_to_px},
        {"key": "Số đơn hàng", "width": 21 * rem_to_px},
        {"key": "Ngày đơn hàng", "width": 16 * rem_to_px},
        {"key": "Mã khách hàng", "width": 16 * rem_to_px},
        {"key": "Tên khách hàng", "width": 25 * rem_to_px},
        {"key": "Diễn dãi", "width": 35 * rem_to_px},
        {"key": "Tổng số lượng đặt hàng", "width": 21 * rem_to_px}
    ]
    print("info_key: ", info_key)
    list_key = [a["key"] for a in info_key]
    print("list_key")

    columns_have_sum_feature = [
        "Tổng số lượng đặt hàng",
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
    print("donhang: ", donhang)
    id_donhang = donhang.id
    nof_giay = donhang.nof
    data = []
    rem_to_px = 1
    info_key = [
        {"key": "Số đơn hàng"},
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
    list_key = [a["key"] for a in info_key]

    columns_have_sum_feature = [
        "Size 5",
        "Size 6",
        "Size 7",
        "Size 8",
        "Size 9",
        "Size 0",
    ]
    import random
    nof_loop = random.randint(3, 5)
    print("nof_loop: ", nof_loop)
    nof_da_dat = 0
    for i in range(nof_loop):
        _nof_each_loop = 0
        _data = {}
        for key in list_key:
            if key == "Số đơn hàng":
                _data[key] = id_donhang
            if key == "STT":
                _data[key] = i
                continue
            if key == "Mã giày":
                _data[key] = "{}-{} - {}".format(id_donhang, key, i+1)
                continue
            if key == "Số lượng":
                _data[key] = nof_giay
            _data[key] = "{} - {}".format(key, i+1)
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

    data[-1]["Size 0"] = nof_giay - nof_da_dat
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=data)
