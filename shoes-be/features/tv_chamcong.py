from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class TVCHAMCONG(BaseClass):
    def __init__(self):
        super().__init__("CHAMCONG")


TVCC = TVCHAMCONG()


@router.get("/tv_chamcong")
def read():
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    # sql = f"SELECT distinct SOPHIEU, NGAYPHIEU, MAKH, TENKH, DIENGIAIPHIEU FROM V_GIAOHANG"
    sql = f"""
        select MAKY, MANVIEN, phieupc as SOPHIEU, NgayPhieu as NGAYPHIEU, SUM(SOLUONG) as SOLUONG, DienGiai AS DIENGIAI FROM CHAMCONG
        GROUP BY MAKY, phieupc, NgayPhieu, MANVIEN, DienGiai
    """
    # print(sql)
    return TVCC.read_custom(sql)

@router.post("/tv_chamcong")
def read(data: dict):
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    phieupc = data["SOPHIEU"]
    sql = f"""
        select CHAMCONG.MAGIAY, DMGIAY.TENGIAY, SOLUONG FROM CHAMCONG 
        left join (select MAGIAY, TENGIAY from DMGIAY) as DMGIAY ON DMGIAY.MAGIAY = CHAMCONG.MAGIAY
        where MAKY = '{maky}' AND MANVIEN = '{manv}' AND phieupc = '{phieupc}'
    """
    return TVCC.read_custom(sql)

@router.delete("/tv_chamcong")
def delete(data: dict):
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    phieupc = data["SOPHIEU"]
    sql = f"DELETE FROM CHAMCONG WHERE MAKY='{maky}' AND MANVIEN='{manv}' AND PHIEUPC='{phieupc}'"
    TVCC.execute_custom(sql)
    return {"status": "success"}