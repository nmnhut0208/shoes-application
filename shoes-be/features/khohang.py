from fastapi import APIRouter, Request
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.sql_helper import *
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class KHOHANG(BaseClass):
    def __init__(self):
        super().__init__("DMKHO")


KH = KHOHANG()


@router.get("/khohang")
# @user_access
def read() -> RESPONSE_KHOHANG:
    sql = """select MAKHO, TENKHO, coalesce(GHICHU, '') as GHICHU 
            from DMKHO
            """
    return KH.read_custom(sql)


@router.post("/khohang")
def add(data: ITEM_KHOHANG) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return KH.add(col, val)


@router.put("/khohang")
def update(data: ITEM_KHOHANG) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MAKHO = {data['MAKHO']}"
    return KH.update(val, condition)


@router.delete("/khohang")
def delete(ID: str) -> RESPONSE:
    condition = f"MAKHO = '{ID}'"
    return KH.delete(condition)
