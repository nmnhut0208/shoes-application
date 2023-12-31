from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class CA(BaseClass):
    def __init__(self):
        super().__init__("DMCA")


C = CA()


@router.get("/ca")
def read() -> RESPONSE_CA:
    sql = "SELECT MACA, TENCA, GHICHU FROM DMCA"
    return C.read_custom(sql)


@router.post("/ca")
def add(data: ITEM_CA) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return C.add(col, val)


@router.put("/ca")
def update(data: ITEM_CA) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MACA = {data['MACA']}"
    return C.update(val, condition)


@router.delete("/ca")
def delete(ID: str) -> RESPONSE:
    condition = f"MACA = '{ID}'"
    return C.delete(condition)
