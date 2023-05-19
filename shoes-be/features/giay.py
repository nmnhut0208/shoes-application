from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

from pydantic import BaseModel
from typing import Optional


class ITEM_GIAY(BaseModel):
    MAGIAY: str
    TENGIAY: str
    MADE: str
    TENDE: Optional[str] = None
    MASUON: str
    TENSUON: Optional[str] = None
    MACA: str
    TENCA: Optional[str] = None
    MAQUAI: str
    TENQUAI: Optional[str] = None
    GHICHU: Optional[str] = None
    DONGIA: int 
    MAMAU: Optional[str] = None
    TENMAU: Optional[str] = None
    MAKH: str
    TENKH: Optional[str] = None
    SortID: str
    GIATRANGTRI: Optional[int] = 0
    GIASUON: Optional[int] = 0
    GIAGOT: Optional[int] = 0
    GIATANTRANG: Optional[int] = 0
    GIANHANCONG: Optional[int] = 0
    GIAKEO: Optional[int] = 0
    TRANGTRIDE: Optional[str] = None
    GHICHUDE: Optional[str] = None
    TRANGTRIQUAI: Optional[str] = None
    GHICHUQUAI: Optional[str] = None
    HINHANH: Optional[str] = None


router = APIRouter()


class GIAY(BaseClass):
    def __init__(self):
        super().__init__("DMGIAY")


giay = GIAY()


@router.get("/giay")
def read() -> List[ITEM_GIAY]:
    sql = "select MAGIAY, TENGIAY, DMGIAY.MADE, \
                TENDE, DMGIAY.MASUON,TENSUON, DMGIAY.MACA, \
                TENCA, DMGIAY.MAQUAI, TENQUAI, GHICHU, DONGIA,\
                DMGIAY.MAMAU, TENMAU, DMGIAY.MAKH, TENKH, SortID,\
                GIATRANGTRI,GIASUON, GIAGOT, GIATANTRANG, \
                GIANHANCONG, GIAKEO,TRANGTRIDE, GHICHUDE, \
                TRANGTRIQUAI, GHICHUQUAI, HINHANH \
            from DMGIAY  \
            LEFT JOIN(select MADE, TENDE FROM DMDE) AS DMDE ON DMGIAY.MADE = DMDE.MADE \
            LEFT JOIN(SELECT MASUON, TENSUON FROM DMSUON) AS DMSUON ON DMGIAY.MASUON = DMSUON.MASUON \
            LEFT JOIN(SELECT MACA, TENCA FROM DMCA) AS DMCA ON DMGIAY.MACA = DMCA.MACA \
            LEFT JOIN(SELECT MAQUAI, TENQUAI FROM DMQUAI) AS DMQUAI ON DMGIAY.MAQUAI = DMQUAI.MAQUAI \
            LEFT JOIN(SELECT MAMAU, TENMAU FROM DMMAU) AS DMMAU ON DMGIAY.MAMAU = DMMAU.MAMAU \
            LEFT JOIN(SELECT MAKH, TENKH FROM DMKHACHHANG) AS DMKHACHHANG ON DMGIAY.MAKH = DMKHACHHANG.MAKH"
    return giay.read_custom(sql)


@router.post("/giay")
def add(data: ITEM_GIAY) -> RESPONSE:
    data = dict(data)
    col = []
    val = []
    for k, v in data.items():
        if v is not None:
            col.append(k)
            val.append(f"'{v}'")
    col = " ,".join(col)
    val = " ,".join(val)
    return giay.add(col, val)


@router.put("/giay")
def update(data: ITEM_GIAY) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key,
                    value in data.items() if value is not None])
    condition = f"MAKH = '{data['MAKH']}'"
    return giay.update(val, condition)


@router.delete("/giay")
def delete(data: ITEM_GIAY) -> RESPONSE:
    data = dict(data)
    condition = f"MAKH = '{data['MAKH']}'"
    return giay.delete(condition)
