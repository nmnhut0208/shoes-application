from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

from pydantic import BaseModel
from typing import Optional


class ITEM_KHACHHANG(BaseModel):
    MAKH: str
    TENKH: str
    DONGIA: Optional[int] = 0
    DIACHI: str
    TEL: str
    FAX: Optional[str] = None
    EMAIL: Optional[str] = None
    GHICHU: Optional[str] = None


router = APIRouter()


class KHACHHANG(BaseClass):
    def __init__(self):
        super().__init__("DMKHACHHANG")


kh = KHACHHANG()


@router.get("/khachhang")
def read() -> List[ITEM_KHACHHANG]:
    print("ITEM_KHACHHANG")
    sql = "SELECT MAKH, TENKH, COALESCE(DONGIA, 0) as DONGIA, \
                COALESCE(DIACHI, '') AS DIACHI, \
                COALESCE(TEL, '') AS TEL, \
                COALESCE(FAX, '') AS FAX, \
                COALESCE(EMAIL, '') AS EMAIL, \
                COALESCE(GHICHU, '') AS GHICHU \
            FROM DMKHACHHANG"
    # sql = "SELECT * FROM DMKHACHHANG"
    return kh.read_custom(sql)


@router.post("/khachhang")
def add(data: ITEM_KHACHHANG) -> RESPONSE:
    data = dict(data)
    col = []
    val = []
    for k, v in data.items():
        if v is not None:
            col.append(k)
            val.append(f"'{v}'")
    col = " ,".join(col)
    val = " ,".join(val)
    return kh.add(col, val)


@router.put("/khachhang")
def update(data: ITEM_KHACHHANG) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items() if value is not None])
    condition = f"MAKH = '{data['MAKH']}'"
    return kh.update(val, condition)


@router.delete("/khachhang")
def delete(data: ITEM_KHACHHANG) -> RESPONSE:
    data = dict(data)
    condition = f"MAKH = '{data['MAKH']}'"
    return kh.delete(condition)
