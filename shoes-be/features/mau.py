from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class MAU(BaseClass):
    def __init__(self):
        super().__init__("DMMAU")


mau = MAU()


@router.get("/mau")
def read() -> List[ITEM_MAU]:
    sql = "SELECT MAMAU, TENMAU, COALESCE(GHICHU, '') as GHICHU \
        FROM DMMAU"
    return mau.read_custom(sql)

@router.post("/mau")
def add(data: ITEM_MAU) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return mau.add(col, val)


@router.put("/mau")
def update(data: ITEM_MAU) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MAMAU = {data['MAMAU']}"
    return mau.update(val, condition)


@router.delete("/mau")
def delete(ID: str) -> RESPONSE:
    condition = f"MAMAU = '{ID}'"
    return mau.delete(condition)
