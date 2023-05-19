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
    MASUON: str
    MACA: str
    MAQUAI: str
    GHICHU: Optional[str] = None
    DONGIA: int 
    MAMAU: Optional[str] = None
    MAKH: str
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


class RESPONSE_GIAY(BaseModel):
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


class RESPONSE_GIAYTHEOKHACHHANG(BaseModel):
    SORTID: str
    MAGIAY: str
    TENGIAY: str
    MAUDE: str
    MAUGOT: str
    MAUSUON: str
    MAUCA: str
    MAUQUAI: str
    MAKH: str
    DONGIA: int
    DONGIAQUAI: int
    TENCA: str
    TENKH: str


router = APIRouter()


class GIAY(BaseClass):
    def __init__(self):
        super().__init__("DMGIAY")


giay = GIAY()


@router.get("/giay")
def read() -> List[RESPONSE_GIAY]:
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


@router.get("/giay/{MAKH}")
def read(MAKH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,MAUDE,MAUGOT, 
			MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH, 
			V_GIAY.DONGIA, V_GIAY.DONGIAQUAI, V_GIAY.TENCA, V_GIAY.TENKH
            FROM DONHANG 
            LEFT JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay
            WHERE DONHANG.MAKH='{}'
            """.format(MAKH)
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
    
    condition = f"MAGIAY = '{data['MAGIAY']}'"
    return giay.update(val, condition)


@router.delete("/giay")
def delete(data: ITEM_GIAY) -> RESPONSE:
    data = dict(data)
    condition = f"MAGIAY = '{data['MAGIAY']}'"
    return giay.delete(condition)
