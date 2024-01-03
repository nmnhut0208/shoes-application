from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime, timedelta

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
        today = datetime.today() + timedelta(days=1)
        six_month_ago = today - timedelta(days=6*30)
        condition_year = f"""where NgayPhieu <= '{today.year}-{today.month:02}-{today.day:02}'
                             and NgayPhieu >= '{six_month_ago.year}-{six_month_ago.month:02}-{six_month_ago.day:02}' 
                             """
    sql = f"""
        select DATEPART(YEAR, NgayPhieu) as YEAR, MAKY, MANVIEN, maphieu as MAPHIEU, NgayPhieu as NGAYPHIEU,
          SUM(SOLUONG) as SOLUONG, DienGiai AS DIENGIAI FROM CHAMCONG
        {condition_year}
        GROUP BY DATEPART(YEAR, NgayPhieu), MAKY, maphieu, NgayPhieu, MANVIEN, DienGiai
        order by DATEPART(YEAR, NgayPhieu) desc, MAKY desc, maphieu desc, NgayPhieu desc, MANVIEN desc
    """
    return TVCC.read_custom(sql)

@router.post("/tv_chamcong")
def read(data: dict):
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    maphieu = data["MAPHIEU"]
    sql = f"""
        select CHAMCONG.MAGIAY, DMGIAY.TENGIAY, SOLUONG FROM CHAMCONG 
        left join (select MAGIAY, TENGIAY from DMGIAY) as DMGIAY 
            ON DMGIAY.MAGIAY = CHAMCONG.MAGIAY
        where MAKY = '{maky}' AND MANVIEN = '{manv}' AND maphieu = '{maphieu}'
    """
    return TVCC.read_custom(sql)

@router.delete("/tv_chamcong")
def delete(data: dict):
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    maphieu = data["MAPHIEU"]
    sql = f"""DELETE FROM CHAMCONG WHERE MAKY='{maky}' 
              AND MANVIEN='{manv}' AND MAPHIEU='{maphieu}'
              """
    TVCC.execute_custom(sql)
    return {"status": "success"}

@router.get("/get_ky")
def read():
    sql = f"""
        select distinct MAKY FROM CHAMCONG order by MAKY
    """
    return TVCC.read_custom(sql)

@router.delete("/delete_ky")
def delete(data: dict):
    maky = data["MAKY"]
    # get year today 01-01
    care_year = datetime.today().year
    sql = f"""DELETE FROM CHAMCONG WHERE MAKY='{maky}' and NgayPhieu >= '{care_year}-01-01'"""
    TVCC.execute_custom(sql)
    return {"status": "success"}