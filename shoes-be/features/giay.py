from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


from pydantic import BaseModel
from typing import Optional


class ITEM_GIAY(BaseModel):
    MAGIAY: str
    TENGIAY: str
    MADE: str
    MASUON: str
    MACA: str
    MAQUAI: str
    GHICHU: Optional[str] = ""
    DONGIA: int 
    MAMAU: Optional[str] = ""
    MAKH: str
    SortID: str
    GIATRANGTRI: Optional[int] = 0
    GIASUON: Optional[int] = 0
    GIAGOT: Optional[int] = 0
    GIATANTRANG: Optional[int] = 0
    GIANHANCONG: Optional[int] = 0
    GIAKEO: Optional[int] = 0
    TRANGTRIDE: Optional[str] = ""
    GHICHUDE: Optional[str] = ""
    TRANGTRIQUAI: Optional[str] = ""
    GHICHUQUAI: Optional[str] = ""
    HINHANH: Optional[str] = ""


class RESPONSE_GIAY(BaseModel):
    MAGIAY: str
    TENGIAY: str
    MADE: str
    TENDE: Optional[str] = ""
    MASUON: str
    TENSUON: Optional[str] = ""
    MACA: str
    TENCA: Optional[str] = ""
    MAQUAI: str
    TENQUAI: Optional[str] = ""
    GHICHU: Optional[str] = ""
    DONGIA: int
    MAMAU: Optional[str] = ""
    TENMAU: Optional[str] = ""
    MAKH: str
    TENKH: Optional[str] = ""
    SortID: str
    GIATRANGTRI: Optional[int] = 0
    GIASUON: Optional[int] = 0
    GIAGOT: Optional[int] = 0
    GIATANTRANG: Optional[int] = 0
    GIANHANCONG: Optional[int] = 0
    GIAKEO: Optional[int] = 0
    TRANGTRIDE: Optional[str] = ""
    GHICHUDE: Optional[str] = ""
    TRANGTRIQUAI: Optional[str] = ""
    GHICHUQUAI: Optional[str] = ""
    HINHANH: Optional[str] = ""


router = APIRouter()


class GIAY(BaseClass):
    def __init__(self):
        super().__init__("DMGIAY")


giay = GIAY()


@router.get("/giay")
def read() -> List[RESPONSE_GIAY]:
    sql = """select MAGIAY, TENGIAY, DMGIAY.MADE, 
                TENDE, DMGIAY.MASUON,TENSUON, DMGIAY.MACA, 
                TENCA, DMGIAY.MAQUAI, TENQUAI, GHICHU, DONGIA,
                DMGIAY.MAMAU, TENMAU, DMGIAY.MAKH, TENKH, SortID,
                GIATRANGTRI,GIASUON, GIAGOT, GIATANTRANG, 
                GIANHANCONG, GIAKEO,TRANGTRIDE, GHICHUDE, 
                TRANGTRIQUAI, GHICHUQUAI 
            from DMGIAY  
            LEFT JOIN(select MADE, TENDE FROM DMDE) AS DMDE 
                     ON DMGIAY.MADE = DMDE.MADE 
            LEFT JOIN(SELECT MASUON, TENSUON FROM DMSUON) AS DMSUON 
                    ON DMGIAY.MASUON = DMSUON.MASUON 
            LEFT JOIN(SELECT MACA, TENCA FROM DMCA) AS DMCA 
                    ON DMGIAY.MACA = DMCA.MACA 
            LEFT JOIN(SELECT MAQUAI, TENQUAI FROM DMQUAI) AS DMQUAI 
                    ON DMGIAY.MAQUAI = DMQUAI.MAQUAI 
            LEFT JOIN(SELECT MAMAU, TENMAU FROM DMMAU) AS DMMAU 
                    ON DMGIAY.MAMAU = DMMAU.MAMAU 
            LEFT JOIN(SELECT MAKH, TENKH FROM DMKHACHHANG) AS DMKHACHHANG 
                    ON DMGIAY.MAKH = DMKHACHHANG.MAKH
            """
    return giay.read_custom(sql)

@router.get("/giay/get_HINHANH")
def read(MAGIAY: str) -> dict:
    sql = f"""select MAGIAY, coalesce(HINHANH, '') as HINHANH
            from DMGIAY  
            where MAGIAY='{MAGIAY}'
            """
    return giay.read_custom(sql)

@router.post("/giay")
def add(data: ITEM_GIAY) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = " ,".join([k for k, v in data.items() if v is not None])
    val = " ,".join([v for v in data.values() if v is not None]) 

    return giay.add(col, val)


@router.put("/giay")
def update(data: ITEM_GIAY) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))

    val = ", ".join([f"{k} = {v}" for k, v in data.items() if v is not None])
    
    condition = f"MAGIAY = {data['MAGIAY']}"
    return giay.update(val, condition)


@router.delete("/giay")
def delete(data: ITEM_GIAY) -> RESPONSE:
    data = dict(data)
    condition = f"MAGIAY = '{data['MAGIAY']}'"
    return giay.delete(condition)

@router.get("/giay/check_MAGIAY_existed")
def read(MAGIAY: str) -> dict:
    sql = f"""select MAGIAY
            from DMGIAY  
            where MAGIAY='{MAGIAY}'
            """
    result = giay.read_custom(sql)
    if len(result) == 0:
        return {MAGIAY: False}
    else:
        return {MAGIAY: True}
