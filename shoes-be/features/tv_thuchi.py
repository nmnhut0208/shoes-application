from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class TVTHUCHI(BaseClass):
    def __init__(self):
        super().__init__("V_CNCHITIET")


TVTC = TVTHUCHI()


@router.get("/tv_thuchi")
def read() -> RESPONSE_TVTHUCHI:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = f"SELECT SOPHIEU, NGAYPHIEU, MAKH, TENKH, SODUCUOI, DIENGIAIPHIEU FROM V_CNCHITIET"
    return TVTC.read_custom(sql)

@router.get("/tv_thu")
def read() -> RESPONSE_TVTHUCHI:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = f"""SELECT SOPHIEU, NGAYPHIEU, CONGNO.MAKH, 
                     TENKH, THANHTIEN AS SODUCUOI, DIENGIAIPHIEU 
                     FROM CONGNO 
                     inner join DMKHACHHANG on DMKHACHHANG.MAKH = CONGNO.MAKH
                     WHERE LOAIPHIEU='PT'
    """
    return TVTC.read_custom(sql)

@router.get("/tv_chi")
def read() -> RESPONSE_TVTHUCHI:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = f"SELECT SOPHIEU, NGAYPHIEU, MAKH, TENKH, SODUCUOI, DIENGIAIPHIEU FROM V_CNCHITIET WHERE LOAIPHIEU='PC'"
    return TVTC.read_custom(sql)

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
