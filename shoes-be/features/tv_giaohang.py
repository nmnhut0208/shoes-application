from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class TVGIAOHANG(BaseClass):
    def __init__(self):
        super().__init__("V_GIAOHANG")


TVGH = TVGIAOHANG()


@router.get("/tv_giaohang")
def read() -> RESPONSE_TVGIAOHANG:
    print("nhut")
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    # sql = f"SELECT distinct SOPHIEU, NGAYPHIEU, MAKH, TENKH, DIENGIAIPHIEU FROM V_GIAOHANG"
    sql = f"""
    SELECT distinct SOPHIEU, NGAYPHIEU, CONGNO.MAKH, DMKHACHHANG.TENKH, DMKHACHHANG.DIACHI, DIENGIAIPHIEU FROM CONGNO LEFT JOIN (SELECT MAKH, TENKH, DIACHI FROM DMKHACHHANG) AS DMKHACHHANG ON CONGNO.MAKH = DMKHACHHANG.MAKH
    """
    return TVGH.read_custom(sql)

@router.post("/tv_giaohang")
def read(data: dict):
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    sql = f"""
    SELECT CONGNO.SODH, DONHANG.NGAYDH, DONHANG.NGAYGH, DIENGIAIDONG, SUM(SOLUONG) AS SOLUONG
    FROM CONGNO
    LEFT JOIN (SELECT distinct SODH, NGAYDH, NGAYGH FROM DONHANG) AS DONHANG ON CONGNO.SODH = DONHANG.SODH
    WHERE SOPHIEU = '{sophieu}' AND MAKH = '{makh}' 
    GROUP BY CONGNO.SODH, DONHANG.NGAYDH, DONHANG.NGAYGH,DIENGIAIDONG
    """
    return TVGH.read_custom(sql)

@router.post("/tv_giaohangsub")
def read(data: dict):
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    sodh = "(" + ", ".join([f"'{value}'" for value in data["SODH"]]) + ")"
    sql = f"""SELECT SODH, CONGNO.MAGIAY, TENGIAY, MAUDE, MAUGOT, MAUSUON, MAUCA,
      MAUQUAI, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 as SOLUONG, 
       GIABAN, THANHTIEN, DIENGIAIPHIEU AS DIENGIAIDONG FROM CONGNO  left join (
        SELECT MAGIAY, TENGIAY FROM DMGIAY
    ) as DMGIAY ON CONGNO.MAGIAY = DMGIAY.MAGIAY 
    WHERE SODH IN {sodh} AND MAKH = '{makh}' AND SOPHIEU = '{sophieu}'"""
    return TVGH.read_custom(sql)

@router.delete("/tv_giaohang")
def delete(data: dict):
    print(data)
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    loaiphieu = "BH"
    sql = f"""DELETE FROM CONGNO WHERE SOPHIEU = '{sophieu}' AND MAKH = '{makh}' AND LOAIPHIEU = '{loaiphieu}'"""
    TVGH.execute_custom(sql)
    return {"status": "success"}


    # sodh = "(" + ", ".join([f"'{value}'" for value in data["SODH"]]) + ")"
    # sql = f"""SELECT SODH, CONGNO.MAGIAY, TENGIAY, MAUDE, MAUGOT, MAUSUON, MAUCA,
    #   MAUQUAI, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 as SOLUONG, 
    #    GIABAN, THANHTIEN, DIENGIAIPHIEU AS DIENGIAIDONG FROM CONGNO  left join (
    #     SELECT MAGIAY, TENGIAY FROM DMGIAY
    # ) as DMGIAY ON CONGNO.MAGIAY = DMGIAY.MAGIAY 
    # WHERE SODH IN {sodh} AND MAKH = '{makh}' AND SOPHIEU = '{sophieu}'"""
    # return TVGH.read_custom(sql)

# @router.post("/giaohang/{makh}")
# def read(data: dict) -> RESPONSE_GIAOHANG:
#     # return KH.read()
#     # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
#     print(data)
#     sodh = "(" + ", ".join([f"'{value}'" for value in data["sodh"]]) + ")"
#     print(sodh)
#     makh = data["makh"]
#     sql = f"SELECT * FROM DONHANG WHERE SODH IN {sodh} AND MAKH = '{makh}'"
#     print(sql)
#     return GH.read_custom(sql)

# @router.post("/de")
# def add(data: ITEM_DE) -> RESPONSE:
#     data = dict(data)
#     data["DONGIA"] = int(data["DONGIA"])
#     # print(data)
#     col = ", ".join(data.keys())
#     val = ", ".join([f"'{value}'" for value in data.values()])
#     return D.add(col, val)


# @router.put("/de")
# def update(data: ITEM_DE) -> RESPONSE:
#     data = dict(data)
#     val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
#     condition = f"MADE = '{data['MADE']}'"
#     return D.update(val, condition)


# @router.delete("/de")
# def delete(data: ITEM_DE) -> RESPONSE:
#     data = dict(data)
#     condition = f"MADE = '{data['MADE']}'"
#     return D.delete(condition)
