from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class NHANVIEN(BaseClass):
    def __init__(self):
        super().__init__("DMNHANVIEN")


NV = NHANVIEN()


@router.get("/nhanvien")
def read() -> RESPONSE_NHANVIEN:
    # return KH.read()
    sql = "SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU FROM DMNHANVIEN"
    return NV.read_custom(sql)


@router.get("/nhanvien/get-thode")
def read() -> RESPONSE_NHANVIEN:
    sql = """SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU FROM DMNHANVIEN
             where LOAINVIEN = 'TD'"""
    return NV.read_custom(sql)


@router.get("/nhanvien/get-thoquai")
def read() -> RESPONSE_NHANVIEN:
    sql = """SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU FROM DMNHANVIEN
             where LOAINVIEN = 'TQ'"""
    return NV.read_custom(sql)



@router.post("/nhanvien")
def add(data: ITEM_NHANVIEN) -> RESPONSE:
    data = dict(data)
    # print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return NV.add(col, val)


@router.put("/nhanvien")
def update(data: ITEM_NHANVIEN) -> RESPONSE:
    data = dict(data)
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items() if value != None])
    condition = f"MANVIEN = '{data['MANVIEN']}'"
    return NV.update(val, condition)


@router.delete("/nhanvien")
def delete(data: ITEM_NHANVIEN) -> RESPONSE:
    data = dict(data)
    condition = f"MANVIEN = '{data['MANVIEN']}'"
    return NV.delete(condition)
