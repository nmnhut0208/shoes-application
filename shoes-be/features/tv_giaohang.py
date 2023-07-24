from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime

router = APIRouter()


class TVGIAOHANG(BaseClass):
    def __init__(self):
        super().__init__("V_GIAOHANG")


TVGH = TVGIAOHANG()


@router.get("/tv_giaohang")
def read(YEAR: str=None) -> RESPONSE_TVGIAOHANG:
    condition_year = ""
    if YEAR is not None:
        condition_year = f"""and NGAYPHIEU >= '{YEAR}-01-01'
                             and NGAYPHIEU <= '{YEAR}-12-31'
                             """
    else:
        care_year = datetime.today().year
        condition_year = f"""and NGAYPHIEU >= '{care_year}-01-01'
                        """
    sql = f"""
            SELECT distinct SOPHIEU, NGAYPHIEU, CONGNO.MAKH, 
                DMKHACHHANG.TENKH, DMKHACHHANG.DIACHI, DIENGIAIPHIEU 
            FROM CONGNO 
            LEFT JOIN (SELECT MAKH, TENKH, DIACHI FROM DMKHACHHANG) 
                AS DMKHACHHANG 
                ON CONGNO.MAKH = DMKHACHHANG.MAKH
            WHERE CONGNO.LOAIPHIEU = 'BH'
            {condition_year}
            ORDER BY CONGNO.NGAYPHIEU DESC
            """
    print(sql)
    return TVGH.read_custom(sql)

@router.post("/tv_giaohang")
def read(data: dict):
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    sql = f"""
            SELECT CONGNO.SODH, DONHANG.NGAYDH, DONHANG.NGAYGH, 
                DIENGIAIDONG, SUM(SOLUONG) AS SOLUONG
            FROM CONGNO
            LEFT JOIN (SELECT distinct SODH, NGAYDH, NGAYGH FROM DONHANG)
                 AS DONHANG ON CONGNO.SODH = DONHANG.SODH
            WHERE SOPHIEU = '{sophieu}' AND MAKH = '{makh}' 
            GROUP BY CONGNO.SODH, DONHANG.NGAYDH, DONHANG.NGAYGH,DIENGIAIDONG
            """
    return TVGH.read_custom(sql)

@router.post("/tv_giaohangsub")
def read(data: dict):
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    sodh = "(" + ", ".join([f"'{value}'" for value in data["SODH"]]) + ")"
    sql = f"""SELECT SODH, CONGNO.MAGIAY, TENGIAY, MAUDE, MAUGOT, MAUSUON, MAUCA,
                     MAUQUAI, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, coalesce(SIZE1,0) AS SIZE1, 
                     SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 + coalesce(SIZE1,0) as SOLUONG, 
                    GIABAN, THANHTIEN, DIENGIAIPHIEU AS DIENGIAIDONG 
              FROM CONGNO  
              left join (SELECT MAGIAY, TENGIAY FROM DMGIAY) as DMGIAY 
                    ON CONGNO.MAGIAY = DMGIAY.MAGIAY 
              WHERE SODH IN {sodh} 
              AND MAKH = '{makh}' 
              AND SOPHIEU = '{sophieu}'
              """
    return TVGH.read_custom(sql)

@router.delete("/tv_giaohang")
def delete(data: dict):
    print(data)
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    loaiphieu = "BH"
    sql = f"""DELETE FROM CONGNO 
              WHERE SOPHIEU = '{sophieu}' 
              AND MAKH = '{makh}' 
              AND LOAIPHIEU = '{loaiphieu}'
              """
    TVGH.execute_custom(sql)
    return {"status": "success"}


    # sodh = "(" + ", ".join([f"'{value}'" for value in data["SODH"]]) + ")"
    # sql = f"""SELECT SODH, CONGNO.MAGIAY, TENGIAY, MAUDE, MAUGOT, MAUSUON, MAUCA,
    #   MAUQUAI, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 as SOLUONG, 
    #    GIABAN, THANHTIEN, DIENGIAIPHIEU AS DIENGIAIDONG FROM CONGNO  left join (
    #     SELECT MAGIAY, TENGIAY FROM DMGIAY
    # ) as DMGIAY ON CONGNO.MAGIAY = DMGIAY.MAGIAY 
    # WHERE SODH IN {sodh} AND MAKH = '{makh}' AND SOPHIEU = '{sophieu}'"""
    # return TVGH.read_custom(sql)

