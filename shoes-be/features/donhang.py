from fastapi import APIRouter, Request, Query
from typing_extensions import Annotated

from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from features.hethong import (find_info_primary_key, 
                              save_info_primary_key)

from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ITEM_DONHANG(BaseModel):
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
    SODH: Optional[str] = None
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
    # =============
    MADONG: Optional[int] = None
    SIZE5: Optional[int] = None
    SIZE6: Optional[int] = None
    SIZE7: Optional[int] = None
    SIZE9: Optional[int] = None
    SIZE8: Optional[int] = None
    SIZE0: Optional[int] = None
    SOLUONG: Optional[int] = None
    THANHTIEN: Optional[int] = None
    NGAYDH: Optional[str] = None
    NGAYGH: Optional[str] = None



router = APIRouter()


class DONHANG(BaseClass):
    def __init__(self):
        super().__init__("DONHANG")


donhang = DONHANG()


@router.get("/donhang/{SODH}")
def read(SODH: str) -> List[ITEM_DONHANG]:
    print("SODH: ", SODH)
    sql = f"""select *
             from DONHANG
             where DONHANG.SODH = '{SODH}'
          """

    result = donhang.read_custom(sql)
    return result


@router.get("/donhang")
def read(SODH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    print("SODH: ", SODH)
    sql = f"""SELECT MADONG, SODH, HINHANH, V_GIAY.MAGIAY,V_GIAY.TENGIAY,
                coalesce(MAUDE, '') as MAUDE, 
                coalesce(MAUGOT, '') AS MAUGOT, 
                coalesce(MAUSUON, '') AS MAUSUON,
                coalesce(MAUCA, '') AS MAUCA,
                coalesce(MAUQUAI, '') AS MAUQUAI ,
                coalesce (DONHANG.MAKH, V_GIAY.MAKH) as MAKH, 
                V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI, 
                V_GIAY.TENCA, V_GIAY.TENKH,
                SIZE5,SIZE6,SIZE7,
                SIZE9,SIZE8,SIZE0,
                DONHANG.MAKH,
                SOLUONG,NGAYDH, NGAYGH,
                V_GIAY.DONGIA * SOLUONG AS THANHTIEN
            FROM (select MADONG, SODH, MAGIAY,MAUDE,MAUGOT, 
		        MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH,SIZE5,SIZE6,SIZE7,
                SIZE9,SIZE8,SIZE0, NGAYDH, NGAYGH,
                (SIZE5+SIZE6+SIZE7+SIZE8+SIZE9+SIZE0) AS SOLUONG
            from DONHANG 
            WHERE DONHANG.SODH='{SODH}'
            and DAPHANCONG=0 ) AS DONHANG
            left JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay  
            left JOIN (Select MAGIAY, HINHANH from DMGIAY) as DMGIAY
            on DMGIAY.MAGIAY = DONHANG.MAGIAY
          """
    result = donhang.read_custom(sql)
    return result


@router.get("/donhang/khachhang/{MAKH}/giay")
# lấy tất cả các loại giày của khách hàng MAKH
def read(MAKH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
                    coalesce(MAUDE, '') as MAUDE, 
                    coalesce(MAUGOT, '') AS MAUGOT, 
                    coalesce(MAUSUON, '') AS MAUSUON,
                    coalesce(MAUCA, '') AS MAUCA,
                    coalesce(MAUQUAI, '') AS MAUQUAI ,
                    coalesce (DONHANG.MAKH, V_GIAY.MAKH) as MAKH, 
                    V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI, 
                    V_GIAY.TENCA, V_GIAY.TENKH
            FROM (select DISTINCT MAGIAY,MAUDE,MAUGOT, 
		        MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH 
                from DONHANG WHERE DONHANG.MAKH='{}') AS DONHANG
            FULL OUTER JOIN (select * from V_GIAY where V_GIAY.MAKH='{}') 
            As V_GIAY on V_GIAY.magiay=DONHANG.magiay
            """.format(MAKH, MAKH)
    
    start = datetime.now()
    result = donhang.read_custom(sql)
    print("khachhang: ", datetime.now()-start)
    return result


@router.post("/donhang")
def add(data: List[ITEM_DONHANG]) -> RESPONSE:
    # delete SODH cu, insert SDH moi
    # cho trường hợp chú chỉ chỉnh sửa đơn hàng thôi, chứ ko add mới
    # Không thể biết được bao nhiêu giày được add mới 
    # nên đành xóa dữ liệu cũ, add lại dữ liệu mới thôi

    sql_delete = f"""delete DONHANG
                    where SODH = '{data[0].SODH}'"""
    donhang.execute_custom(sql_delete)


    # find common information
    today = datetime.now()
    year = today.year
    MADONG = find_info_primary_key("DONHANG", "MD", today)
    DH = find_info_primary_key("DONHANG","DH", today) + 1
    MADH = f"DH{year}{str(DH).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")

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

    # lưu lại thông tin mã dòng và mã đơn hàng 
    save_info_primary_key("DONHANG", "DH", year, DH)
    save_info_primary_key("DONHANG", "MD", year, MADONG)
    return 1

@router.get("/donhang/update_status_phancong/")
def update_status_phancong(MADONG: list = Query([]), status: int=0) -> RESPONSE:
    print("MADONG: ", MADONG)
    # update status of the MADONGs
    ds_madong = ""
    for madong in MADONG:
        ds_madong += f"'{madong}'," 
    ds_madong = ds_madong[:-1]
    sql = """UPDATE donhang SET DAPHANCONG = {} 
            WHERE MADONG IN ({});
            """.format(status, ds_madong)
    print("sql: ", sql)
    donhang.execute_custom(sql)
    return 1 





