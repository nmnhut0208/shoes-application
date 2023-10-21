from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class MUI(BaseClass):
    def __init__(self):
        super().__init__("DMMUI")


M = MUI()


@router.get("/mui")
def read() -> RESPONSE_MUI:
    return M.read()


@router.post("/mui")
def add(data: ITEM_MUI) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return M.add(col, val)


@router.put("/mui")
def update(data: ITEM_MUI) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MAMUI = {data['MAMUI']}"
    return M.update(val, condition)


@router.delete("/mui")
def delete(ID: str) -> RESPONSE:
    condition = f"MAMUI = '{ID}'"
    return M.delete(condition)
