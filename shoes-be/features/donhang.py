from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ITEM_DONHANG(BaseModel):
    MADONG: str
    MADH: str
    SODH: str
    MAKH: str
    NGAYDH: str
    NGAYGH: str
    DIENGIAIPHIEU: str
    MAGIAY: str
    SIZE5: int
    SIZE6: int
    SIZE7: int
    SIZE9: int
    SIZE8: int
    Size0: int
    GIABAN: int
    THANHTIEN: int
    DIENGIAIDONG: str
    # NGUOITAO: str
    # NGAYTAO: str
    # NGUOISUA: str
    # NGAYSUA: str
    MAUDE: str
    MAUGOT: str
    MAUSUON: str
    MAUCA: str
    MAUQUAI: str
    DAPHANCONG: int
    GIALE: int
    INHIEU: Optional[str] = None
    TRANGTRI: Optional[str] = None
    GHICHU: Optional[str] = None


class RESPONSE_GIAYTHEOKHACHHANG(BaseModel):
    SORTID: str
    MAGIAY: str
    TENGIAY: str
    MAUDE: Optional[str] = None
    MAUGOT: Optional[str] = None
    MAUSUON: Optional[str] = None
    MAUCA: Optional[str] = None
    MAUQUAI: Optional[str] = None
    MAKH: str
    DONGIA: int
    DONGIAQUAI: Optional[int] = None
    TENCA: Optional[str] = None
    TENKH: str


router = APIRouter()


class DONHANG(BaseClass):
    def __init__(self):
        super().__init__("DONHANG")


donhang = DONHANG()


@router.get("/donhang/khachhang/{MAKH}/giay")
def read(MAKH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
            MAUDE,MAUGOT, 
			MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH, 
			V_GIAY.DONGIA, V_GIAY.DONGIAQUAI, V_GIAY.TENCA, V_GIAY.TENKH
            FROM DONHANG 
            LEFT JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay
            WHERE DONHANG.MAKH='{}'
            """.format(MAKH)
    
    start = datetime.now()
    result = donhang.read_custom(sql)
    print("khachhang: ", datetime.now()-start)
    return result


@router.get("/donhang/khachhangnhanh/{MAKH}/giay")
def read_quickly(MAKH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
                    MAUDE,MAUGOT, 
                    MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH, 
                    V_GIAY.DONGIA, V_GIAY.DONGIAQUAI, 
                    V_GIAY.TENCA, V_GIAY.TENKH
            FROM (select DISTINCT MAGIAY,MAUDE,MAUGOT, 
		        MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH 
                from DONHANG WHERE DONHANG.MAKH='{}') AS DONHANG
            LEFT JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay
            """.format(MAKH)
    
    start = datetime.now()
    result = donhang.read_custom(sql)
    print("khachhangnhanh: ", datetime.now()-start)
    return result

