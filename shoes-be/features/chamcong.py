from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class CHAMCONG(BaseClass):
    def __init__(self):
        super().__init__("CHAMCONG")


CC = CHAMCONG()


@router.post("/chamcong")
def read(data: dict) -> RESPONSE_CHAMCONG:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    sql = f"SELECT DISTINCT phieupc, NgayPhieu, DienGiai from CHAMCONG where MAKY='{maky}' AND MANVIEN='{manv}'"
    return CC.read_custom(sql)


@router.get("/chamcong/nhanvien")
def read_nhanvien():
    sql = f"SELECT MANVIEN, TENNVIEN FROM DMNHANVIEN"
    return CC.read_custom(sql)


@router.get("/chamcong/ky")
def read_ky():
    sql = f"SELECT MAKY, TENKY FROM DMKYTINHLUONG"
    return CC.read_custom(sql)


@router.post("/chamcong/{manvien}")
def read(data: dict):
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    print(data)
    phieupc = "(" + \
        ", ".join([f"'{value}'" for value in data["PHIEUPC"]]) + ")"
    # print(sodh)
    maky = data["MAKY"]
    manvien = data["MANVIEN"]
    sql = f"SELECT MAGIAY, SOLUONG FROM CHAMCONG where MAKY='{maky}' AND MANVIEN='{manvien}' and phieupc IN {phieupc}"
    print(sql)
    return CC.read_custom(sql)