from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class GIAOHANG(BaseClass):
    def __init__(self):
        super().__init__("GIAOHANG")


GH = GIAOHANG()


@router.get("/giaohang")
def read() -> RESPONSE_GIAOHANG:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = "SELECT SODH, NGAYDH, NGAYGH, DIENGIAIPHIEU, SUM(SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9) as SOLUONGCONLAI \
    FROM DONHANG \
    where MAKH = 'THU' \
    GROUP BY SODH, MAKH, NGAYDH, NGAYGH, DIENGIAIPHIEU"
    return GH.read_custom(sql)


@router.post("/giaohang/{makh}")
def read(data: dict) -> RESPONSE_GIAOHANG:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    print(data)
    sodh = "(" + ", ".join([f"'{value}'" for value in data["sodh"]]) + ")"
    print(sodh)
    makh = data["makh"]
    sql = f"SELECT * FROM DONHANG WHERE SODH IN {sodh} AND MAKH = '{makh}'"
    print(sql)
    return GH.read_custom(sql)

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
