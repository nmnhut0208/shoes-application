from fastapi import APIRouter

from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class SUON(BaseClass):
    def __init__(self):
        super().__init__("DMSUON")


suon = SUON()


@router.get("/suon")
def read() -> List[RESPONSE_SUON]:
    sql = """SELECT MASUON, TENSUON, DMGOT.MAGOT, TENGOT, 
                DMMUI.MAMUI, TENMUI, COALESCE(GHICHU, '') AS GHICHU
             FROM DMSUON 
             left join(select MAGOT, TENGOT FROM DMGOT) AS DMGOT 
                on DMGOT.MAGOT = DMSUON.MAGOT 
             left join(select MAMUI, TENMUI FROM DMMUI) AS DMMUI 
                on DMMUI.MAMUI = DMSUON.MAMUI
            """
    
    return suon.read_custom(sql)


@router.post("/suon")
def add(data: ITEM_SUON) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return suon.add(col, val)


@router.put("/suon")
def update(data: ITEM_SUON) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MASUON = {data['MASUON']}"
    return suon.update(val, condition)


@router.delete("/suon")
def delete(data: ITEM_SUON) -> RESPONSE:
    data = dict(data)
    condition = f"MASUON = '{data['MASUON']}'"
    return suon.delete(condition)

@router.get("/suon/get_HINHANH")
def read(MASUON: str) -> dict:
    sql = f"""select MASUON, coalesce(HINHANH, '') as HINHANH
            from DMSUON  
            where MASUON='{MASUON}'
            """
    return suon.read_custom(sql)

