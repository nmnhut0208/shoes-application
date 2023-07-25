from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime

router = APIRouter()


class TVCHAMCONG(BaseClass):
    def __init__(self):
        super().__init__("CHAMCONG")


TVCC = TVCHAMCONG()


@router.get("/tv_chamcong")
def read(YEAR: str=None):
    condition_year = ""
    if YEAR is not None:
        condition_year = f"""where NgayPhieu >= '{YEAR}-01-01'
                             and NgayPhieu <= '{YEAR}-12-31'
                             """
    else:
        care_year = datetime.today().year
        condition_year = f"""where NgayPhieu >= '{care_year}-01-01'
                        """
    sql = f"""
        select MAKY, MANVIEN, phieupc as SOPHIEU, NgayPhieu as NGAYPHIEU,
          SUM(SOLUONG) as SOLUONG, DienGiai AS DIENGIAI FROM CHAMCONG
        {condition_year}
        GROUP BY MAKY, phieupc, NgayPhieu, MANVIEN, DienGiai
        order by MAKY, MANVIEN, NgayPhieu 
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
        left join (select MAGIAY, TENGIAY from DMGIAY) as DMGIAY 
            ON DMGIAY.MAGIAY = CHAMCONG.MAGIAY
        where MAKY = '{maky}' AND MANVIEN = '{manv}' AND phieupc = '{phieupc}'
    """
    return TVCC.read_custom(sql)

@router.delete("/tv_chamcong")
def delete(data: dict):
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    phieupc = data["SOPHIEU"]
    sql = f"""DELETE FROM CHAMCONG WHERE MAKY='{maky}' 
              AND MANVIEN='{manv}' AND PHIEUPC='{phieupc}'
              """
    # print(sql)
    TVCC.execute_custom(sql)
    return {"status": "success"}

@router.get("/get_ky")
def read():
    sql = f"""
        select distinct MAKY FROM CHAMCONG order by MAKY
    """
    # print(sql)
    return TVCC.read_custom(sql)

@router.delete("/delete_ky")
def delete(data: dict):
    maky = data["MAKY"]
    # get year today 01-01
    care_year = datetime.today().year
    sql = f"""DELETE FROM CHAMCONG WHERE MAKY='{maky}' and NgayPhieu >= '{care_year}-01-01'"""
    # print(sql)
    TVCC.execute_custom(sql)
    return {"status": "success"}