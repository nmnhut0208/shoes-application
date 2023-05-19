from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

from pydantic import BaseModel
from typing import Optional


class ITEM_QUAI(BaseModel):
    MAQUAI: str
    TENQUAI: str
    DONGIA: int
    HINHANH: Optional[str] = ""
    GHICHU: Optional[str] = ""


router = APIRouter()


class QUAI(BaseClass):
    def __init__(self):
        super().__init__("DMQUAI")


quai = QUAI()


@router.get("/quai")
def read() -> List[ITEM_QUAI]:
    sql = "SELECT MAQUAI, TENQUAI, DONGIA, \
                COALESCE(GHICHU, '') AS GHICHU, \
                COALESCE(HINHANH, '') AS HINHANH  \
            FROM DMQUAI "
    return quai.read_custom(sql)


@router.post("/quai")
def add(data: ITEM_QUAI) -> RESPONSE:
    data = dict(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return quai.add(col, val)


@router.put("/quai")
def update(data: ITEM_QUAI) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAQUAI = '{data['MAQUAI']}'"
    return quai.update(val, condition)


@router.delete("/quai")
def delete(data: ITEM_QUAI) -> RESPONSE:
    data = dict(data)
    condition = f"MAQUAI = '{data['MAQUAI']}'"
    return quai.delete(condition)
