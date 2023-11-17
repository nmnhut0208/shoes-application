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
    MACA: Optional[str] = None
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
    TENDE: Optional[str] = ""
    MASUON: str
    TENSUON: Optional[str] = ""
    MACA: Optional[str] = ""
    TENCA: Optional[str] = ""
    MAQUAI: str
    TENQUAI: Optional[str] = ""
    GHICHU: Optional[str] = None
    DONGIA: int
    MAMAU: Optional[str] = None
    TENMAU: Optional[str] = ""
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
def read() -> List[RESPONSE_GIAY]:
    sql = """select MAGIAY, TENGIAY, DMGIAY.MADE, 
                DMGIAY.MASUON, DMGIAY.MACA, 
                DMGIAY.MAQUAI, GHICHU, DONGIA
            from DMGIAY  
            LEFT JOIN(SELECT MAKH, TENKH FROM DMKHACHHANG) AS DMKHACHHANG 
                    ON DMGIAY.MAKH = DMKHACHHANG.MAKH
            """
    return giay.read_custom(sql)


@router.get("/giay/all_info_giay")
def read(MAGIAY: str) -> RESPONSE_GIAY:
    sql = f"""select MAGIAY, TENGIAY, DMGIAY.MADE, 
                TENDE, DMGIAY.MASUON,TENSUON, DMGIAY.MACA, 
                TENCA, DMGIAY.MAQUAI, TENQUAI, GHICHU, DONGIA,
                DMGIAY.MAMAU, TENMAU, DMGIAY.MAKH, TENKH, SortID,
                GIATRANGTRI,GIASUON, GIAGOT, GIATANTRANG, 
                GIANHANCONG, GIAKEO,TRANGTRIDE, GHICHUDE, 
                TRANGTRIQUAI, GHICHUQUAI, coalesce(HINHANH, '') as HINHANH
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
            WHERE MAGIAY='{MAGIAY}'
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
def delete(ID: str) -> RESPONSE:
    condition = f"MAGIAY = '{ID}'"
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


@router.get("/giay/get_DONGIAQUAI")
def read(MAGIAY: str) -> dict:
    sql = f"""select MAGIAY, coalesce(DONGIAQUAI, 0) as DONGIA
            from V_GIAY  
            where MAGIAY='{MAGIAY}'
            """
    return giay.read_custom(sql)

@router.get("/giay/get_DONGIADE")
def read(MAGIAY: str) -> dict:
    sql = f"""select MAGIAY, coalesce(DONGIADE, 0) as DONGIA
            from V_GIAY  
            where MAGIAY='{MAGIAY}'
            """
    return giay.read_custom(sql)