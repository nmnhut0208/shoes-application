from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime, timedelta
from utils.vietnamese import convert_data_to_save_database
from features.hethong import (find_info_primary_key, 
                              save_info_primary_key)

router = APIRouter()

class ITEM_PHIEUTHU(BaseModel):
    SOPHIEU: str
    DIENGIAIPHIEU: str = None
    MAKH: str 
    NGAYPHIEU: str 
    THANHTIEN: int 
    NGUOITAO: str 
    NGUOISUA: str


class CONGNO(BaseClass):
    def __init__(self):
        super().__init__("CONGNO")


congno = CONGNO()


# @router.get("/congno/get_all_phieuthu")
# def read() -> List[ITEM_PHIEUTHU]:
#     sql = """select SOPHIEU, 
#             COALESCE(DIENGIAIPHIEU, '') as DIENGIAIPHIEU,
#             MAKH, THANHTIEN
#             from CONGNO
#             where LOAIPHIEU='PT'
#             """
#     return congno.read_custom(sql)

@router.post("/congno/phieuthu")
def add(data: ITEM_PHIEUTHU) -> RESPONSE:
    today = datetime.now()
    year = today.year
    data = dict(data)
    data["NGAYTAO"] = today.strftime("%Y-%m-%d %H:%M:%S")
    data["NGAYSUA"] = today.strftime("%Y-%m-%d %H:%M:%S")
    data["LOAIPHIEU"] = "PT"
    SODONG = find_info_primary_key("CONGNO", "MD", today) + 1
    data["MADONG"] = f"MD{year}{str(SODONG).zfill(12)}"
    SOPHIEU = find_info_primary_key("CONGNO","PT", today) + 1
    data["MAPHIEU"] = f"PT{year}{str(SOPHIEU).zfill(12)}"
    data = convert_data_to_save_database(data)
    col = ", ".join(k for k, v in data.items() if v is not None)
    val = ", ".join([v for v in data.values() if v is not None])
    congno.add(col, val)
    save_info_primary_key("CONGNO", "PT", year, SOPHIEU)
    save_info_primary_key("CONGNO", "MD", year, SODONG)
    return 1


@router.put("/congno/phieuthu")
def update(data: ITEM_PHIEUTHU) -> RESPONSE:
    data = dict(data)
    data["NGAYSUA"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    data = convert_data_to_save_database(data)
    val = ", ".join([f"{key} = {value}" for key, value in data.items()
                      if value is not None])
    condition = f"SOPHIEU = {data['SOPHIEU']}"
    return congno.update(val, condition)


@router.delete("/congno/phieuthu")
def delete(SOPHIEU: str) -> RESPONSE:
    condition = f"SOPHIEU = '{SOPHIEU}'"
    return congno.delete(condition)

@router.get("/congno/get_congno_manykhachhang")
def read(MAKH_FROM: str, MAKH_TO: str, DATE_TO: str, DATE_FROM: str) -> RESPONSE:
    sql = f"""
            select MAKH, SUM(THANHTIENQD) as TONGNO
            from V_TONGHOP
            where MAKH <= '{MAKH_TO}'
            and MAKH >= '{MAKH_FROM}'
            and NGAYPHIEU <= '{DATE_TO}'
            and NGAYPHIEU >= '{DATE_FROM}'
            group by MAKH
        """
    print("sql: ", sql)
    return congno.read_custom(sql)

@router.get("/congno/get_congno_khachhang")
def read(SOPHIEU: str, MAKH: str, DATE_TO: str, DATE_FROM: str=None) -> RESPONSE:
    sql = f"""
            select coalesce(SUM(THANHTIENQD), 0) as TONGNO
            from V_TONGHOP
            where MAKH = '{MAKH}'
            and SOPHIEU != '{SOPHIEU}'
            and NGAYPHIEU <= '{DATE_TO}'
        """
    if DATE_FROM is not None:
        sql += f""" and NGAYPHIEU >= '{DATE_FROM}'
                """
    print("sql: ", sql)
    return congno.read_custom(sql)


@router.get("/congno/truyvan_thu")
def read(YEAR: str=None) -> RESPONSE_TVTHUCHI:
    condition_year = ""
    if YEAR is not None:
        condition_year = f"""and NGAYPHIEU >= '{YEAR}-01-01'
                             and NGAYPHIEU <= '{YEAR}-12-31'
                             """
    else:
        care_year = datetime.today().year
        condition_year = f"""and NGAYPHIEU >= '{care_year}-01-01'
                        """
    sql = f"""SELECT SOPHIEU, NGAYPHIEU, CONGNO.MAKH, 
                     TENKH, THANHTIEN AS SODUCUOI, DIENGIAIPHIEU 
                     FROM CONGNO 
                     inner join DMKHACHHANG on DMKHACHHANG.MAKH = CONGNO.MAKH
                     WHERE LOAIPHIEU='PT'
                     {condition_year}
                    order by NGAYPHIEU desc
                    """
    return congno.read_custom(sql)

@router.post("/congno_tonghop")
def add(data: dict):
    makh_from = data["KhachHangFrom"]
    makh_to = data["KhachHangTo"]
    # convert date_from to DD-MM-YYYY 00:00:00
    date_from = data["DATE_FROM"]
    date_from = datetime.strptime(date_from, "%Y-%m-%d %H:%M:%S")
    date_from = date_from.strftime("%Y-%m-%d 00:00:00")
    date_to = data["DATE_TO"]
    # print("testt: ", date_from, date_to)

    sql_tongno = f"""
                select V_TONGHOP.MAKH, DMKHACHHANG.TENKH, SUM(THANHTIENQD) as TONGNO
                from V_TONGHOP
                LEFT JOIN DMKHACHHANG ON V_TONGHOP.MAKH = DMKHACHHANG.MAKH
                where V_TONGHOP.MAKH <= '{makh_to}'
                and V_TONGHOP.MAKH >= '{makh_from}'
                and NGAYPHIEU < '{date_from}'
                group by V_TONGHOP.MAKH, DMKHACHHANG.TENKH
                """
    df_tongno = congno.read_custom_congno(sql_tongno)
    
    sql_tongmua = f"""
                select V_TONGHOP.MAKH, DMKHACHHANG.TENKH, SUM(THANHTIENQD) AS TONGMUA
                from V_TONGHOP
                LEFT JOIN DMKHACHHANG ON V_TONGHOP.MAKH = DMKHACHHANG.MAKH
                where LOAIPHIEU='BH'
                and V_TONGHOP.MAKH <= '{makh_to}'
                and V_TONGHOP.MAKH >= '{makh_from}'
                and NGAYPHIEU <= '{date_to}'
                and NGAYPHIEU >= '{date_from}'
                group by V_TONGHOP.MAKH, DMKHACHHANG.TENKH
                """
    df_tongmua = congno.read_custom_congno(sql_tongmua)

    sql_tongtra = f"""
                select V_TONGHOP.MAKH, DMKHACHHANG.TENKH, SUM(THANHTIENQD) * -1 AS TONGTRA
                from V_TONGHOP
                LEFT JOIN DMKHACHHANG ON V_TONGHOP.MAKH = DMKHACHHANG.MAKH
                where LOAIPHIEU='PT'
                and V_TONGHOP.MAKH <= '{makh_to}'
                and V_TONGHOP.MAKH >= '{makh_from}'
                and NGAYPHIEU <= '{date_to}'
                and NGAYPHIEU >= '{date_from}'
                group by V_TONGHOP.MAKH, DMKHACHHANG.TENKH
                """
    df_tongtra = congno.read_custom_congno(sql_tongtra)

    df_tongno = df_tongno.merge(df_tongmua, how="outer", on=["MAKH", "TENKH"])
    df_tongno = df_tongno.merge(df_tongtra, how="outer", on=["MAKH", "TENKH"])
    df_tongno = df_tongno.fillna(0)
    df_tongno["CONGNO"] = df_tongno["TONGNO"] + df_tongno["TONGMUA"] - df_tongno["TONGTRA"]
    print(df_tongno)
    return df_tongno.to_dict(orient="records")

