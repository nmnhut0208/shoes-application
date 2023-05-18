from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

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
    data = dict(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return mau.add(col, val)


@router.put("/mau")
def update(data: ITEM_MAU) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAMAU = '{data['MAMAU']}'"
    return mau.update(val, condition)


@router.delete("/mau")
def delete(data: ITEM_MAU) -> RESPONSE:
    data = dict(data)
    condition = f"MAMAU = '{data['MAMAU']}'"
    return mau.delete(condition)
