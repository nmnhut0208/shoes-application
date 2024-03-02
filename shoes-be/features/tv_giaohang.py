from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime, timedelta
from features.hethong import (find_info_primary_key, 
                              save_info_primary_key)
from utils.vietnamese import convert_data_to_save_database

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
        today = datetime.today() + timedelta(days=1)
        six_month_ago = today - timedelta(days=6*30)
        condition_year = f"""and NGAYPHIEU <= '{today.year}-{today.month:02}-{today.day:02}'
                             and NGAYPHIEU >= '{six_month_ago.year}-{six_month_ago.month:02}-{six_month_ago.day:02}' 
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
            ORDER BY CONGNO.NGAYPHIEU desc, SOPHIEU desc
            """
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
            ORDER BY DONHANG.NGAYDH desc, CONGNO.SODH desc
            """
    return TVGH.read_custom(sql)

@router.post("/tv_giaohangsub")
def read(data: dict):
    sophieu = data["SOPHIEU"]
    makh = data["MAKH"]
    # sodh = "(" + ", ".join([f"'{value}'" for value in data["SODH"]]) + ")"
    sql = f"""SELECT SODH, CONGNO.MAGIAY, TENGIAY, MAUDE, MAUGOT, MAUSUON, MAUCA,
                     MAUQUAI, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, coalesce(SIZE1,0) AS SIZE1, 
                     SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 + coalesce(SIZE1,0) as SOLUONG, 
                    GIABAN, THANHTIEN, DIENGIAIPHIEU AS DIENGIAIDONG, coalesce(DMGOT.TENGOT, '') as TENGOT
              FROM CONGNO  
              LEFT JOIN 
                (SELECT MAGIAY, TENGIAY, MASUON FROM DMGIAY) AS DMGIAY ON CONGNO.MAGIAY = DMGIAY.MAGIAY
                LEFT JOIN 
                DMSUON ON DMGIAY.MASUON = DMSUON.MASUON
                LEFT JOIN 
                DMGOT ON DMSUON.MAGOT = DMGOT.MAGOT
              WHERE MAKH = '{makh}' 
              AND SOPHIEU = '{sophieu}'
              """
    # print("abc: ", sql)
    # return TVGH.read_custom(sql)
    results = TVGH.read_custom(sql)
    # group with SODH
    results_group = {}
    for result in results:
        if result["SODH"] not in results_group:
            results_group[result["SODH"]] = []
        results_group[result["SODH"]].append(result)
    return results_group

@router.post("/tv_savegiaohang")
def save(data: dict) -> RESPONSE:
    items = data["data"]
    makh = data["makh"]
    sophieu = data["sophieu"]
    diengiai = data["diengiai"]
    date = data["date"]
    user = data["user"].lower()
    # get 
    sql_delete = f"""delete FROM CONGNO
                    where SOPHIEU = '{sophieu}'
                    and LOAIPHIEU = 'BH' 
                    and MAKH = '{makh}'"""
    TVGH.execute_custom(sql_delete)
    # today = datetime.now()
    today = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
    year = today.year
    madong = find_info_primary_key("CONGNO", "MD", today)
    gh = find_info_primary_key("CONGNO", "BH", today) + 1
    MAPHIEU = f"BH{year}{str(gh).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")
    
    for item in items:
        _c = []
        _v = []
        madong += 1
        del item["TENGIAY"]
        del item["TENGOT"]
        item["MADONG"] = f"MD{year}{str(madong).zfill(12)}"
        item["MAPHIEU"] = MAPHIEU
        item["SOPHIEU"] = sophieu
        item["DIENGIAIPHIEU"] = diengiai
        item["LOAIPHIEU"] = "BH"
        item["MAKH"] = makh
        item["NGAYPHIEU"] = day_created
        item["NGUOITAO"] = user
        item["NGAYTAO"] = day_created
        item["NGUOISUA"] = user
        item["NGAYSUA"] = day_created

        _data_save = convert_data_to_save_database(item)
        _c = ",".join([k for k, v in _data_save.items() if v is not None])
        _v = ",".join([v for v in _data_save.values() if v is not None])
        
        TVGH.add_with_table_name("CONGNO", _c, _v)

    save_info_primary_key("CONGNO", "MD", year, madong)
    save_info_primary_key("CONGNO", "BH", year, gh)

    return {"status": "success"}

@router.delete("/tv_giaohang")
def delete(data: dict):
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

