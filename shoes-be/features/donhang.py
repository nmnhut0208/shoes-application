from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from features.hethong import find_info_primary_key, save_info_primary_key

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ITEM_DONHANG(BaseModel):
    # MADONG: str
    # MADH: str
    SODH: str
    MAKH: str
    NGAYDH: Optional[str] = None
    NGAYGH: Optional[str] = None
    DIENGIAIPHIEU: Optional[str] = None
    MAGIAY: str
    SIZE5: int
    SIZE6: int
    SIZE7: int
    SIZE9: int
    SIZE8: int
    SIZE0: int
    GIABAN: int
    THANHTIEN: int
    DIENGIAIDONG: Optional[str] = None
    # TODO: edit type of datetime 
    NGUOITAO: Optional[str] = None
    # NGAYTAO: Optional[str] = None
    NGUOISUA: Optional[str] = None
    # NGAYSUA: Optional[str] = None # TODO: sau nay them nay vao
    MAUDE: Optional[str] = None
    MAUGOT: Optional[str] = None
    MAUSUON: Optional[str] = None
    MAUCA: Optional[str] = None
    MAUQUAI: Optional[str] = None
    DAPHANCONG: int
    GIALE: Optional[int] = 0
    INHIEU: Optional[str] = None
    TRANGTRI: Optional[str] = None
    GHICHU: Optional[str] = None

class RESPONSE_GIAYTHEOKHACHHANG(BaseModel):
    SORTID: str
    MAGIAY: str
    TENGIAY: str
    MAUDE: Optional[str] = None
    MAUGOT: Optional[str] = None
    MAUSUON: Optional[str] = None
    MAUCA: Optional[str] = None
    MAUQUAI: Optional[str] = None
    MAKH: str
    DONGIA: int
    DONGIAQUAI: Optional[int] = None
    TENCA: Optional[str] = None
    TENKH: str


router = APIRouter()


class DONHANG(BaseClass):
    def __init__(self):
        super().__init__("DONHANG")


donhang = DONHANG()


@router.get("/donhang/khachhang/{MAKH}/giay")
def read(MAKH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
            MAUDE,MAUGOT, 
			MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH, 
			V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI, V_GIAY.TENCA, V_GIAY.TENKH
            FROM DONHANG 
            LEFT JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay
            WHERE DONHANG.MAKH='{}'
            """.format(MAKH)
    
    start = datetime.now()
    result = donhang.read_custom(sql)
    print("khachhang: ", datetime.now()-start)
    return result


@router.get("/donhang/khachhangnhanh/{MAKH}/giay")
def read_quickly(MAKH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
                    MAUDE,MAUGOT, 
                    MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH, 
                    V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI, 
                    V_GIAY.TENCA, V_GIAY.TENKH
            FROM (select DISTINCT MAGIAY,MAUDE,MAUGOT, 
		        MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH 
                from DONHANG WHERE DONHANG.MAKH='{}') AS DONHANG
            LEFT JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay
            """.format(MAKH)
    
    start = datetime.now()
    result = donhang.read_custom(sql)
    print("khachhangnhanh: ", datetime.now()-start)
    return result


# def find_info_primary_key(key, today):
#     year = today.year
#     sql = f"""select *
#             from V1T4444
#             Where TABLENAME='DONHANG'
#             and KEYSTRING = '{key}{year}'"""
#     data = donhang.read_custom(sql)
#     lastnumber = 1
#     if len(data) == 0:
#         sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
#                         VALUES ('DONHANG', '{key}{year}', {lastnumber})"""
#         donhang.execute_custom(sql_insert)
#     else:
#         lastnumber = data[0]['LASTKEY']
#     return lastnumber

# def save_info_primary_key(key, year, value):
#     sql_insert = f"""UPDATE V1T4444 
#                     SET LASTKEY = {value}
#                     WHERE TABLENAME = 'DONHANG'
#                     AND KEYSTRING = '{key}{year}'"""
#     donhang.execute_custom(sql_insert)


# @router.get("/donhang/SODH")
# def find_info_SODH():
#     today = datetime.now()
#     year = str(today.year)[1:]
#     print("year: ", year)
#     month = str(today.month).zfill(2)
#     sql = f"""select *
#             from V1T4444
#             Where TABLENAME='DONHANG'
#             and KEYSTRING = 'DH--{month}/{year}'"""
#     data = donhang.read_custom(sql)
#     lastnumber = 1
#     if len(data) == 0:
#         sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
#                     VALUES ('DONHANG', 'DH--{month}/{year}', {lastnumber})"""
#         donhang.execute_custom(sql_insert)
#     else:
#         lastnumber = data[0]['LASTKEY']
    
#     number_string = str(lastnumber).zfill(4)
#     SODH = f"DH-{number_string}-{month}/{year}"
#     return {"SODH": SODH}


# @router.post("/donhang")
# def add(data: ITEM_DONHANG) -> RESPONSE:
#     today = datetime.now()
#     year = today.year
#     MADONG = find_info_primary_key("MD", today) + 1
#     DH = find_info_primary_key("DH", today) + 1
#     MADH = f"DH{year}{str(DH).zfill(12)}"
#     data = dict(data)
#     data["NGAYTAO"] = today.strftime("%Y-%m-%d %H:%M:%S")
#     data["NGAYSUA"] = today.strftime("%Y-%m-%d %H:%M:%S")
#     data["MADH"] = MADH
#     data["MADONG"] = f"MD{year}{str(MADONG).zfill(12)}"
#     col = []
#     val = []
#     for k, v in data.items():
#         if v is not None:
#             col.append(k)
#             val.append(f"'{v}'")
#     col = " ,".join(col)
#     val = " ,".join(val)
#     #  update lại mã dòng, mã đơn hàng, số đơn hàng 
#     return donhang.add(col, val)


@router.post("/donhang")
def add(data: List[ITEM_DONHANG]) -> RESPONSE:
    print("ITEM_DONHANG: ", ITEM_DONHANG)
    print("data: ", data)
    data_0 = dict(data[0])
    col = []
    vals = []

    # find common information
    today = datetime.now()
    year = today.year
    MADONG = find_info_primary_key("MD", today)
    DH = find_info_primary_key("DH", today) + 1
    MADH = f"DH{year}{str(DH).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")

    # for k, v in data_0.items():
    #     col.append(k)

    for i in range(len(data)):
        _v = []
        _c = []
        _data = dict(data[i])
        MADONG += 1
        _data["NGAYTAO"] = day_created
        _data["NGAYSUA"] = day_created
        _data["MADH"] = MADH
        _data["MADONG"] = f"MD{year}{str(MADONG).zfill(12)}"
        for k, v in _data.items():
            if v is not None:
                _c.append(k)
                if type(v) is str:
                    _v.append(f"'{v}'")
                else:
                    _v.append(f"{v}")
           
        _c = ",".join(_c)
        _v = ",".join(_v)
        # phòng trường hợp những record khác nhau có số lượng
        # cột insert khác nhau nên phải insert từng dòng như thế này 
        donhang.add(_c, _v) 
        # vals.append(f"({_v})")

    col = " ,".join(col)
    vals = " ,".join(vals)
    print("vals: ", vals)
    # lưu lại thông tin mã dòng và mã đơn hàng 
    save_info_primary_key("DH", year, DH)
    save_info_primary_key("MD", year, MADONG)
    return 1




