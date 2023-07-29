from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class NHANVIEN(BaseClass):
    def __init__(self):
        super().__init__("DMNHANVIEN")


NV = NHANVIEN()


@router.get("/nhanvien")
def read() -> RESPONSE_NHANVIEN:
    sql = """SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU 
             FROM DMNHANVIEN 
            """
    return NV.read_custom(sql)

@router.get("/nhanvien_null")
def read() -> RESPONSE_NHANVIEN:
    sql = """SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU 
             FROM DMNHANVIEN 
             WHERE MATKHAU IS NULL
             OR MATKHAU = ''
             """
    return NV.read_custom(sql)


@router.get("/nhanvien/get-thode")
def read() -> RESPONSE_NHANVIEN:
    sql = """SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU 
             FROM DMNHANVIEN
             where LOAINVIEN = 'TD'
            """
    return NV.read_custom(sql)


@router.get("/nhanvien/get-thoquai")
def read() -> RESPONSE_NHANVIEN:
    sql = """SELECT MANVIEN, TENNVIEN, LOAINVIEN, GHICHU 
             FROM DMNHANVIEN
             where LOAINVIEN = 'TQ'
            """
    return NV.read_custom(sql)



@router.post("/nhanvien")
def add(data: ITEM_NHANVIEN) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))
    col = ", ".join([k for k, v in data.items() if v is not None])
    val = ", ".join([v for v in data.values() if v is not None])
    return NV.add(col, val)


@router.put("/nhanvien")
def update(data: ITEM_NHANVIEN) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"MANVIEN = {data['MANVIEN']}"
    return NV.update(val, condition)


@router.delete("/nhanvien")
def delete(data: ITEM_NHANVIEN) -> RESPONSE:
    data = dict(data)
    condition = f"MANVIEN = '{data['MANVIEN']}'"
    return NV.delete(condition)
