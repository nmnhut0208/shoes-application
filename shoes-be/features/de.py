from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class DE(BaseClass):
    def __init__(self):
        super().__init__("DMDE")


D = DE()


@router.get("/de")
def read() -> RESPONSE_DE:
    # return KH.read()
    sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    return D.read_custom(sql)


@router.post("/de")
def add(data: ITEM_DE) -> RESPONSE:
    data = dict(data)
    data["DONGIA"] = int(data["DONGIA"])
    # print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return D.add(col, val)


@router.put("/de")
def update(data: ITEM_DE) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MADE = '{data['MADE']}'"
    return D.update(val, condition)


@router.delete("/de")
def delete(data: ITEM_DE) -> RESPONSE:
    data = dict(data)
    condition = f"MADE = '{data['MADE']}'"
    return D.delete(condition)
