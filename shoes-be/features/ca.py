from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class CA(BaseClass):
    def __init__(self):
        super().__init__("DMCA")


C = CA()


@router.get("/ca")
def read() -> RESPONSE_CA:
    # return KH.read()
    sql = "SELECT MACA, TENCA, GHICHU FROM DMCA"
    return C.read_custom(sql)


@router.post("/ca")
def add(data: ITEM_CA) -> RESPONSE:
    data = dict(data)
    # print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return C.add(col, val)


@router.put("/ca")
def update(data: ITEM_CA) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MACA = '{data['MACA']}'"
    return C.update(val, condition)


@router.delete("/ca")
def delete(data: ITEM_CA) -> RESPONSE:
    data = dict(data)
    condition = f"MACA = '{data['MACA']}'"
    return C.delete(condition)
