from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


class ITEM_GOT(BaseModel):
    MAGOT: str
    TENGOT: str
    HINHANH: Optional[str] = None
    GHICHU: Optional[str] = None

router = APIRouter()


class GOT(BaseClass):
    def __init__(self):
        super().__init__("DMGOT")


got = GOT()


@router.get("/got")
def read() -> List[ITEM_GOT]:
    sql = """SELECT MAGOT, TENGOT, GHICHU  
        FROM DMGOT 
        """
    return got.read_custom(sql)


@router.post("/got")
def add(data: ITEM_GOT) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return got.add(col, val)


@router.put("/got")
def update(data: ITEM_GOT) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MAGOT = {data['MAGOT']}"
    return got.update(val, condition)


@router.delete("/got")
def delete(data: ITEM_GOT) -> RESPONSE:
    data = dict(data)
    condition = f"MAGOT = '{data['MAGOT']}'"
    return got.delete(condition)

@router.get("/got/get_HINHANH")
def read(MAGOT: str) -> dict:
    sql = f"""select MAGOT, coalesce(HINHANH, '') as HINHANH
            from DMGOT  
            where MAGOT='{MAGOT}'
            """
    return got.read_custom(sql)
