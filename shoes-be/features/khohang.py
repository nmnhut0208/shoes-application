from fastapi import APIRouter, Request
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.sql_helper import *

router = APIRouter()


class KHOHANG(BaseClass):
    def __init__(self):
        super().__init__("DMKHO")


KH = KHOHANG()


@router.get("/khohang")
@user_access
def read(request: Request) -> RESPONSE_KHOHANG:
    return KH.read()


@router.post("/khohang")
def add(data: ITEM_KHOHANG) -> RESPONSE:
    data = dict(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return KH.add(col, val)


@router.put("/khohang")
def update(data: ITEM_KHOHANG) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAKHO = '{data['MAKHO']}'"
    return KH.update(val, condition)


@router.delete("/khohang")
def delete(data: ITEM_KHOHANG) -> RESPONSE:
    data = dict(data)
    condition = f"MAKHO = '{data['MAKHO']}'"
    return KH.delete(condition)
