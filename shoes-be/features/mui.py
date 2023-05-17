from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

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
    data = dict(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return M.add(col, val)


@router.put("/mui")
def update(data: ITEM_MUI) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAMUI = '{data['MAMUI']}'"
    return M.update(val, condition)


@router.delete("/mui")
def delete(data: ITEM_MUI) -> RESPONSE:
    data = dict(data)
    condition = f"MAMUI = '{data['MAMUI']}'"
    return M.delete(condition)
