from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class SUON(BaseClass):
    def __init__(self):
        super().__init__("DMSUON")


suon = SUON()


@router.get("/suon")
def read() -> List[RESPONSE_SUON]:
    sql = "SELECT MASUON, TENSUON, DMGOT.MAGOT, TENGOT, \
                DMMUI.MAMUI, TENMUI, COALESCE(GHICHU, '') AS GHICHU, \
                COALESCE(HANH, '') AS HANH \
            FROM DMSUON \
            left join(select MAGOT, TENGOT FROM DMGOT) AS DMGOT \
                on DMGOT.MAGOT = DMSUON.MAGOT \
            left join(select MAMUI, TENMUI FROM DMMUI) AS DMMUI \
                on DMMUI.MAMUI = DMSUON.MAMUI"
    
    sql = "SELECT MASUON, TENSUON, DMGOT.MAGOT, TENGOT, \
                DMMUI.MAMUI, TENMUI, GHICHU, HANH \
            FROM DMSUON \
            left join(select MAGOT, TENGOT FROM DMGOT) AS DMGOT \
                on DMGOT.MAGOT = DMSUON.MAGOT \
            left join(select MAMUI, TENMUI FROM DMMUI) AS DMMUI \
                on DMMUI.MAMUI = DMSUON.MAMUI"
    return suon.read_custom(sql)


@router.post("/suon")
def add(data: ITEM_SUON) -> RESPONSE:
    data = dict(data)
    print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return suon.add(col, val)


@router.put("/suon")
def update(data: ITEM_SUON) -> RESPONSE:
    data = dict(data)    
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MASUON = '{data['MASUON']}'"
    return suon.update(val, condition)


@router.delete("/suon")
def delete(data: ITEM_SUON) -> RESPONSE:
    data = dict(data)
    condition = f"MASUON = '{data['MASUON']}'"
    return suon.delete(condition)
