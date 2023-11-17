from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


class ITEM_KHACHHANG(BaseModel):
    MAKH: str
    TENKH: str
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
    sql = """SELECT MAKH, TENKH,
                COALESCE(DIACHI, '') AS DIACHI, 
                COALESCE(TEL, '') AS TEL, 
                COALESCE(FAX, '') AS FAX,
                COALESCE(EMAIL, '') AS EMAIL, 
                COALESCE(GHICHU, '') AS GHICHU 
            FROM DMKHACHHANG
            """
    return kh.read_custom(sql)


@router.get("/khachhang/get_details")
def read(MAKH: str) -> List[ITEM_KHACHHANG]:
    sql = f"""SELECT MAKH, TENKH, COALESCE(DONGIA, 0) as DONGIA, 
                COALESCE(DIACHI, '') AS DIACHI, 
                COALESCE(TEL, '') AS TEL, 
                COALESCE(FAX, '') AS FAX,
                COALESCE(EMAIL, '') AS EMAIL, 
                COALESCE(GHICHU, '') AS GHICHU 
            FROM DMKHACHHANG
            where MAKH='{MAKH}'
            """
    return kh.read_custom(sql)


@router.post("/khachhang")
def add(data: ITEM_KHACHHANG) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = " ,".join([k for k, v in data.items() if v is not None])
    val = " ,".join([v for v in data.values() if v is not None]) 
    return kh.add(col, val)


@router.put("/khachhang")
def update(data: ITEM_KHACHHANG) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    val = ", ".join([f"{key} = {value}" for key, value in data.items() \
                     if value is not None])
    condition = f"MAKH = {data['MAKH']}"
    return kh.update(val, condition)


@router.delete("/khachhang")
def delete(ID: str) -> RESPONSE:
    condition = f"MAKH = '{ID}'"
    return kh.delete(condition)
