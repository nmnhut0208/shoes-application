from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


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
    data = convert_data_to_save_database(data)
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return D.add(col, val)


@router.put("/de")
def update(data: ITEM_DE) -> RESPONSE:
    data = dict(data)
    data["DONGIA"] = int(data["DONGIA"])
    data = convert_data_to_save_database(data)  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MADE = {data['MADE']}"
    return D.update(val, condition)


@router.delete("/de")
def delete(ID: str) -> RESPONSE:
    condition = f"MADE = '{ID}'"
    return D.delete(condition)
