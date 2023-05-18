from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

from pydantic import BaseModel
from typing import Optional


class ITEM_GOT(BaseModel):
    MAGOT: str
    TENGOT: str
    HANH: Optional[str] = ""
    GHICHU: Optional[str] = ""

router = APIRouter()


class GOT(BaseClass):
    def __init__(self):
        super().__init__("DMGOT")


got = GOT()


@router.get("/got")
def read() -> List[ITEM_GOT]:
    sql = "SELECT * \
        FROM DMGOT "
    return got.read_custom(sql)


@router.post("/got")
def add(data: ITEM_GOT) -> RESPONSE:
    data = dict(data)
    print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return got.add(col, val)


@router.put("/got")
def update(data: ITEM_GOT) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAGOT = '{data['MAGOT']}'"
    return got.update(val, condition)


@router.delete("/got")
def delete(data: ITEM_GOT) -> RESPONSE:
    data = dict(data)
    condition = f"MAGOT = '{data['MAGOT']}'"
    return got.delete(condition)
