from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class PHANQUYEN(BaseClass):
    def __init__(self):
        super().__init__("PHANQUYEN")


PQ = PHANQUYEN()


@router.get("/phanquyen")
def read() -> RESPONSE_PHANQUYEN:
    sql = f"SELECT MANVIEN, MAFORM, TENFORM, THEM, SUA, XOA, XEM, \"IN\" FROM PHANQUYEN"
    return PQ.read_custom(sql)

@router.post("/phanquyen")
def add(data: ITEM_PHANQUYEN) -> RESPONSE:
    data = dict(data)
    # col = ", ".join(data.keys())
    # except key IN
    col = ", ".join([key if key != "IN" else '\"IN\"' for key in data.keys()])
    val = ", ".join([f"'{value}'" for value in data.values()])
    return PQ.add(col, val)


@router.put("/phanquyen")
def update(data: ITEM_PHANQUYEN) -> RESPONSE:
    data = dict(data)
    # except key IN
    MANVIEN = data["MANVIEN"]
    MAFORM = data["MAFORM"]
    val = ", ".join([f"{key} = '{value}'" if key != "IN" else f"\"IN\" = '{value}'" for key, value in data.items()])
    # condition = f"MAKHO = '{data['MAKHO']}'"
    condition = f"MANVIEN = '{MANVIEN}' AND MAFORM = '{MAFORM}'"
    return PQ.update(val, condition)


@router.delete("/phanquyen")
def delete(data: ITEM_PHANQUYEN) -> RESPONSE:
    data = dict(data)
    MANVIEN = data["MANVIEN"]
    MAFORM = data["MAFORM"]
    # condition = f"MAKHO = '{data['MAKHO']}'"
    condition = f"MANVIEN = '{MANVIEN}' AND MAFORM = '{MAFORM}'"
    return PQ.delete(condition)
