from fastapi import APIRouter, Request, Query
from typing_extensions import Annotated
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from features.hethong import (find_info_primary_key, 
                              save_info_primary_key)
from utils.vietnamese import convert_data_to_save_database


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
    SIZE1: int
    GIABAN: int
    THANHTIEN: int
    DIENGIAIDONG: Optional[str] = ""
    # TODO: edit type of datetime 
    NGUOITAO: Optional[str] = ""
    # NGAYTAO: Optional[str] = ""
    NGUOISUA: Optional[str] = ""
    # NGAYSUA: Optional[str] = "" # TODO: sau nay them nay vao
    MAUDE: Optional[str] = ""
    MAUGOT: Optional[str] = ""
    MAUSUON: Optional[str] = ""
    MAUCA: Optional[str] = ""
    MAUQUAI: Optional[str] = ""
    DAPHANCONG: Optional[int] = 0
    GIALE: Optional[int] = 0
    INHIEU: Optional[str] = ""
    TRANGTRI: Optional[str] = ""
    GHICHU: Optional[str] = ""

class RESPONSE_GIAYDONHANG(BaseModel):
    SODH: Optional[str] = ""
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
    DONGIAQUAI: Optional[int] = 0
    TENCA: Optional[str] = None
    TENKH: str
    # =============
    MADONG: Optional[str] = None
    SIZE5: Optional[int] = 0
    SIZE6: Optional[int] = 0
    SIZE7: Optional[int] = 0
    SIZE9: Optional[int] = 0
    SIZE8: Optional[int] = 0
    SIZE0: Optional[int] = 0
    SIZE1: Optional[int] = 0
    SOLUONG: Optional[int] = 0
    THANHTIEN: Optional[int] = 0
    NGAYDH: Optional[str] = ""
    NGAYGH: Optional[str] = ""
    DIENGIAIPHIEU: Optional[str] = None
    DIENGIAIDONG: Optional[str] = None
    INHIEU: Optional[str] = None
    # ============================
    TENMAUDE: str = ""
    TENMAUGOT: str = ""
    TENMAUSUON: str = ""
    TENMAUCA: str = ""
    TENMAUQUAI: str = ""



router = APIRouter()


class DONHANG(BaseClass):
    def __init__(self):
        super().__init__("DONHANG")


donhang = DONHANG()


class RESPONSE_BAOCAO_DONHANG:
    SODH: str 
    NGAYDH: str
    NGAYGH: str
    MAKH: str
    TENKH: str
    DIENGIAI: str
    SOLUONG: int 

@router.get("/donhang/baocao_donhang")
def baocao_donhang(YEAR: str=None) -> List[RESPONSE_BAOCAO_DONHANG]:
    condition_year = ""
    if YEAR is not None:
        condition_year = f"""where NGAYDH >= '{YEAR}-01-01'
                             and NGAYDH <= '{YEAR}-12-31'
                             """
    else:
        care_year = datetime.today().year
        condition_year = f"""where NGAYDH >= '{care_year}-01-01'
                        """

    sql = f"""SELECT SODH, DH.MAKH, KH.TENKH, NGAYDH, NGAYGH, 
                DIENGIAIPHIEU AS DIENGIAI,
                SUM(SIZE0 +SIZE5+SIZE6+SIZE7+SIZE8+SIZE9+coalesce(SIZE1, 0)) as SOLUONG
              FROM DONHANG DH
                LEFT JOIN V_GIAY ON V_GIAY.MAGIAY = DH.MAGIAY
                LEFT JOIN DMKHACHHANG KH ON KH.MAKH = DH.MAKH
             {condition_year}
              group by SODH, DH.MAKH, KH.TENKH, NGAYDH,
                NGAYGH, DIENGIAIPHIEU
              order by NGAYDH desc
            """
    result = donhang.read_custom(sql)
    return result


@router.get("/donhang")
def read(SODH: str) -> List[RESPONSE_GIAYDONHANG]:
    sql = f"""SELECT DIENGIAIPHIEU,MADONG, SODH, 
                V_GIAY.MAGIAY,V_GIAY.TENGIAY,
                coalesce(MAUDE, '') as MAUDE, TENMAUDE,
                coalesce(MAUGOT, '') AS MAUGOT, TENMAUGOT, 
                coalesce(MAUSUON, '') AS MAUSUON,TENMAUSUON,
                coalesce(MAUCA, '') AS MAUCA,TENMAUCA,
                coalesce(MAUQUAI, '') AS MAUQUAI, TENMAUQUAI,
                DONHANG.MAKH, DMKHACHHANG.TENKH, 
                V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI, 
                V_GIAY.TENCA,
                SIZE5,SIZE6,SIZE7,
                SIZE9,SIZE8,SIZE0,SIZE1,
                SOLUONG,NGAYDH, NGAYGH,
                V_GIAY.DONGIA * SOLUONG AS THANHTIEN,
                DIENGIAIDONG, INHIEU
            FROM (select DIENGIAIPHIEU, MADONG, SODH, MAGIAY,MAUDE,MAUGOT, 
		        MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH,SIZE5,SIZE6,SIZE7,
                SIZE9,SIZE8,SIZE0, coalesce(SIZE1, 0) AS SIZE1, NGAYDH, NGAYGH,
                (SIZE5+SIZE6+SIZE7+SIZE8+SIZE9+SIZE0+coalesce(SIZE1, 0)) AS SOLUONG,
                DIENGIAIDONG, INHIEU
            from DONHANG 
            WHERE DONHANG.SODH='{SODH}') AS DONHANG
            inner join DMKHACHHANG on DMKHACHHANG.MAKH = DONHANG.MAKH
            left JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay  
            left join (select MAMAU, TENMAU as TENMAUDE from DMMAU) 
                AS DMMAUDE 
                ON coalesce(DMMAUDE.MAMAU, '') = coalesce(DONHANG.MAUDE, '')
			left join (select MAMAU, TENMAU as TENMAUGOT from DMMAU) 
                AS DMMAUGOT 
                ON coalesce(DMMAUGOT.MAMAU, '') = coalesce(DONHANG.MAUGOT, '')
			left join (select MAMAU, TENMAU as TENMAUSUON from DMMAU) 
                AS DMMAUSUON 
                ON coalesce(DMMAUSUON.MAMAU, '') = coalesce(DONHANG.MAUSUON, '')
			left join (select MAMAU, TENMAU as TENMAUCA from DMMAU) 
                AS DMMAUCA 
                ON coalesce(DMMAUCA.MAMAU, '') = coalesce(DONHANG.MAUCA, '')
			left join (select MAMAU, TENMAU as TENMAUQUAI from DMMAU) 
                AS DMMAUQUAI 
                ON coalesce(DMMAUQUAI.MAMAU, '') = coalesce(DONHANG.MAUQUAI, '')
          """
    result = donhang.read_custom(sql)
    return result


# @router.get("/donhang/khachhang/{MAKH}/giay")
# # lấy tất cả các loại giày của khách hàng MAKH
# def read(MAKH: str) -> List[RESPONSE_GIAYDONHANG]:
#     date_care = datetime.today().year - 2
#     sql = f""" (SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
#                     coalesce(MAUDE, '') as MAUDE, TENMAUDE,        
#                     coalesce(MAUGOT, '') AS MAUGOT, TENMAUGOT,     
#                     coalesce(MAUSUON, '') AS MAUSUON,TENMAUSUON,   
#                     coalesce(MAUCA, '') AS MAUCA,TENMAUCA,
#                     coalesce(MAUQUAI, '') AS MAUQUAI,TENMAUQUAI,   
#                     coalesce (DONHANG.MAKH, V_GIAY.MAKH) as MAKH,  
#                     V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI,    
#                     V_GIAY.TENCA, V_GIAY.TENKH
#             FROM (select DISTINCT MAGIAY,MAUDE,MAUGOT,
#                         MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH        
#                 from DONHANG WHERE DONHANG.MAKH='{MAKH}'
#                 and NGAYDH >= '{date_care}-01-01') AS DONHANG
#             inner JOIN (select * from V_GIAY where DONGIAQUAI is not null)
#             As V_GIAY on V_GIAY.magiay=DONHANG.magiay
#             left join (select MAMAU, TENMAU as TENMAUDE from DMMAU)
#                     AS DMMAUDE
#                                         ON coalesce(DMMAUDE.MAMAU, 
# '') = coalesce(DONHANG.MAUDE, '')
#                         left join (select MAMAU, TENMAU as TENMAUGOT from DMMAU)
#                     AS DMMAUGOT
#                                         ON coalesce(DMMAUGOT.MAMAU, '') = coalesce(DONHANG.MAUGOT, '')
#                         left join (select MAMAU, TENMAU as TENMAUSUON from DMMAU)
#                     AS DMMAUSUON
#                                         ON coalesce(DMMAUSUON.MAMAU, '') = coalesce(DONHANG.MAUSUON, '')
#                         left join (select MAMAU, TENMAU as TENMAUCA from DMMAU)
#                     AS DMMAUCA
#                                         ON coalesce(DMMAUCA.MAMAU, 
# '') = coalesce(DONHANG.MAUCA, '')
#                         left join (select MAMAU, TENMAU as TENMAUQUAI from DMMAU)
#                     AS DMMAUQUAI
#                                         ON coalesce(DMMAUQUAI.MAMAU, '') = coalesce(DONHANG.MAUQUAI, '')
#             )UNION (select SORTID,MAGIAY,TENGIAY,
#                     '' as MAUDE, '' as TENMAUDE,
#                     '' AS MAUGOT, '' as TENMAUGOT,
#                     '' AS MAUSUON,'' as TENMAUSUON,
#                     '' AS MAUCA, '' as TENMAUCA,
#                     '' AS MAUQUAI,'' as TENMAUQUAI,
#                     MAKH,
#                     DONGIA as GIABAN, DONGIAQUAI,
#                     TENCA, TENKH from V_GIAY where MAKH='{MAKH}'
#                     and DONGIA is not null
#                     and DONGIAQUAI is not null) """
    
#     result = donhang.read_custom(sql)
#     return result

@router.get("/donhang/khachhang/{MAKH}/giay")
# lấy tất cả các loại giày của khách hàng MAKH
def read(MAKH: str) -> List[RESPONSE_GIAYDONHANG]:
    date_care = datetime.today().year - 2
    sql = f""" SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,
                    coalesce(MAUDE, '') as MAUDE, TENMAUDE,        
                    coalesce(MAUGOT, '') AS MAUGOT, TENMAUGOT,     
                    coalesce(MAUSUON, '') AS MAUSUON,TENMAUSUON,   
                    coalesce(MAUCA, '') AS MAUCA,TENMAUCA,
                    coalesce(MAUQUAI, '') AS MAUQUAI,TENMAUQUAI,   
                    coalesce (DONHANG.MAKH, V_GIAY.MAKH) as MAKH,  
                    V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI,    
                    V_GIAY.TENCA, V_GIAY.TENKH
            FROM (select DISTINCT MAGIAY,MAUDE,MAUGOT,
                        MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH        
                from DONHANG WHERE DONHANG.MAKH='{MAKH}') AS DONHANG
            inner JOIN (select * from V_GIAY where DONGIAQUAI is not null)
            As V_GIAY on V_GIAY.magiay=DONHANG.magiay
            left join (select MAMAU, TENMAU as TENMAUDE from DMMAU)
                    AS DMMAUDE
                                        ON coalesce(DMMAUDE.MAMAU, 
'') = coalesce(DONHANG.MAUDE, '')
                        left join (select MAMAU, TENMAU as TENMAUGOT from DMMAU)
                    AS DMMAUGOT
                                        ON coalesce(DMMAUGOT.MAMAU, '') = coalesce(DONHANG.MAUGOT, '')
                        left join (select MAMAU, TENMAU as TENMAUSUON from DMMAU)
                    AS DMMAUSUON
                                        ON coalesce(DMMAUSUON.MAMAU, '') = coalesce(DONHANG.MAUSUON, '')
                        left join (select MAMAU, TENMAU as TENMAUCA from DMMAU)
                    AS DMMAUCA
                                        ON coalesce(DMMAUCA.MAMAU, 
'') = coalesce(DONHANG.MAUCA, '')
                        left join (select MAMAU, TENMAU as TENMAUQUAI from DMMAU)
                    AS DMMAUQUAI
                                        ON coalesce(DMMAUQUAI.MAMAU, '') = coalesce(DONHANG.MAUQUAI, '')
    """
    
    result = donhang.read_custom(sql)
    return result


@router.get("/donhang/giay_unique/{MAKH}")
# lấy tất cả các loại giày unique của khách hàng MAKH
def read(MAKH: str) -> List[RESPONSE_GIAYDONHANG]:
    date_care = datetime.today().year - 2
    sql = f""" (SELECT DISTINCT V_GIAY.MAGIAY,V_GIAY.TENGIAY,  
                    coalesce (DONHANG.MAKH, V_GIAY.MAKH) as MAKH,  
                    V_GIAY.DONGIA as GIABAN, V_GIAY.DONGIAQUAI,    
                    V_GIAY.TENCA, V_GIAY.TENKH
            FROM (select DISTINCT MAGIAY, DONHANG.MAKH        
                from DONHANG WHERE DONHANG.MAKH='{MAKH}') AS DONHANG
            inner JOIN (select * from V_GIAY where DONGIAQUAI is not null)
            As V_GIAY on V_GIAY.magiay=DONHANG.magiay
            )UNION (select DISTINCT MAGIAY,TENGIAY,
                    MAKH,
                    DONGIA as GIABAN, DONGIAQUAI,
                    TENCA, TENKH from V_GIAY where MAKH='{MAKH}'
                    and DONGIA is not null
                    and DONGIAQUAI is not null) 
            """
    
    result = donhang.read_custom(sql)
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
        _data = dict(data[i])
        MADONG += 1
        _data["NGAYTAO"] = day_created
        _data["NGAYSUA"] = day_created
        _data["MADH"] = MADH
        _data["MADONG"] = f"MD{year}{str(MADONG).zfill(12)}"

        _data_save = convert_data_to_save_database(_data)
        _c = ",".join([k for k, v in _data_save.items() if v is not None])
        _v = ",".join([v for v in _data_save.values() if v is not None])
        # phòng trường hợp những record khác nhau có số lượng
        # cột insert khác nhau nên phải insert từng dòng như thế này 
        donhang.add(_c, _v) 

    # lưu lại thông tin mã dòng và mã đơn hàng 
    save_info_primary_key("DONHANG", "DH", year, DH)
    save_info_primary_key("DONHANG", "MD", year, MADONG)
    return 1

@router.get("/donhang/update_status_phancong/")
def update_status_phancong(MADONG: list = Query([]), status: int=0) -> RESPONSE:
    # update status of the MADONGs
    ds_madong = ""
    for madong in MADONG:
        ds_madong += f"'{madong}'," 
    ds_madong = ds_madong[:-1]
    sql = """UPDATE donhang SET DAPHANCONG = {} 
            WHERE MADONG IN ({});
            """.format(status, ds_madong)
    donhang.execute_custom(sql)
    return 1 

@router.delete("/donhang")
def delete(SODH: str) -> RESPONSE:
    condition = f"SODH = '{SODH}'"
    return donhang.delete(condition)

@router.post("/donhang/get_all_info_donhang")
# should I change post method to get method??? 
def read(info_query: dict) -> List[RESPONSE_GIAYDONHANG]:
    sql = f"""
            select SODH, NGAYDH, DONHANG.MAKH, TENKH, MAGIAY, TENGIAY, 
            coalesce(SIZE1, 0) as SIZE1, 
            Size0 as SIZE0, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9,
            (Size0+coalesce(SIZE1, 0)+SIZE5+SIZE6+SIZE7+SIZE8+SIZE9) AS SOLUONG,
            GIABAN, THANHTIEN
            from DONHANG
            INNER JOIN (SELECT MAGIAY AS MA, TENGIAY FROM DMGIAY) AS DMGIAY
                ON DMGIAY.MA = DONHANG.MAGIAY
            INNER JOIN DMKHACHHANG ON DMKHACHHANG.MAKH = DONHANG.MAKH
            WHERE NGAYDH >= '{info_query["DATE_FROM"]}'
            AND NGAYDH <= '{info_query["DATE_TO"]}'
            AND DONHANG.MAKH >= '{info_query["KhachHangFrom"]}'
            AND DONHANG.MAKH <= '{info_query["KhachHangTo"]}'
            ORDER BY SODH, NGAYDH, MAKH
    """
    result = donhang.read_custom(sql)
    return result






