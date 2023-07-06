from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


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
    sql = """SELECT MAQUAI, TENQUAI, DONGIA, 
                COALESCE(GHICHU, '') AS GHICHU 
            FROM DMQUAI
            """
    
    return quai.read_custom(sql)


@router.post("/quai")
def add(data: ITEM_QUAI) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return quai.add(col, val)


@router.put("/quai")
def update(data: ITEM_QUAI) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MAQUAI = {data['MAQUAI']}"
    return quai.update(val, condition)


@router.delete("/quai")
def delete(data: ITEM_QUAI) -> RESPONSE:
    data = dict(data)
    condition = f"MAQUAI = '{data['MAQUAI']}'"
    return quai.delete(condition)

@router.get("/quai/get_HINHANH")
def read(MAQUAI: str) -> dict:
    sql = f"""select MAQUAI, coalesce(HINHANH, '') as HINHANH
            from DMQUAI  
            where MAQUAI='{MAQUAI}'
            """
    return quai.read_custom(sql)

