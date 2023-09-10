from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from features.hethong import (find_info_primary_key,
                              save_info_primary_key)
from utils.vietnamese import convert_data_to_save_database


class ITEM_PHANCONG(BaseModel):
    SOPHIEU: str
    NGAYPHIEU: str 
    DIENGIAIPHIEU: Optional[str] = ""
    SODH: str
    MAGIAY: str
    SIZE5: int
    SIZE6: int
    SIZE7: int
    SIZE9: int
    SIZE8: int
    SIZE0: int
    SIZE1: int
    THODE: str
    THOQUAI: str 
    NGUOITAO: Optional[str] = ""
    NGUOISUA: Optional[str] = ""
    MAUDE: Optional[str] = None
    MAUGOT: Optional[str] = None
    MAUSUON: Optional[str] = None
    MAUCA: Optional[str] = None
    MAUQUAI: Optional[str] = None
    MAKY: str
    DIENGIAIDONG: Optional[str] = None
    # 
    MADONG: Optional[str] = ""
    MAPHIEU: Optional[str] = ""

class RESPONSE_PHANCONG_THO:
    MANVIEN: str
    TENNVIEN: str
    SOLUONG: int
    THANHTIEN: int


class RESPONSE_PHANCONG(BaseModel):
    SODH: str
    NGAYDH: str
    MAKH: str
    TENKH: Optional[str] = ""
    DIENDAIPHIEU: Optional[str] = ""
    SOLUONG: Optional[int] = 0

class RESPONSE_GIAYTHEOKHACHHANG(BaseModel):
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
    DONGIAQUAI: Optional[int] = None
    TENCA: Optional[str] = ""
    TENKH: str
    # =============
    SIZE5: Optional[int] = 0
    SIZE6: Optional[int] = 0
    SIZE7: Optional[int] = 0
    SIZE9: Optional[int] = 0
    SIZE8: Optional[int] = 0
    SIZE0: Optional[int] = 0
    SIZE1: Optional[int] = 0
    SOLUONG: Optional[int] = 0
    THANHTIEN: Optional[int] = 0
    NGAYDH: Optional[str] = None
    NGAYGH: Optional[str] = None

class ITEM_HEADER_PHANCONG(BaseModel):
    SOPHIEU: str
    NGAYPHIEU: str 
    DIENGIAIPHIEU: Optional[str] = ""
    MAKY: str

router = APIRouter()

class PHANCONG(BaseClass):
    def __init__(self):
        super().__init__("PHANCONG")


phancong = PHANCONG()


@router.get("/phancong/donhangchuaphancong")
def read() -> List[RESPONSE_PHANCONG]:
    sql = """select SODH, NGAYDH, MAKH, DIENGIAIPHIEU, TENKH, 
                SLDONHANG-SLPHANCONG as SOLUONG
                from (SELECT DISTINCT dh.madh as MADH,
                dh.sodh as SODH,dh.ngaydh as NGAYDH,
                dh.makh as MAKH,dh.diengiaiphieu as DIENGIAIPHIEU,kh.tenkh as TENKH,
                ISNULL(SUM(DH.SIZE5 + DH.SIZE6 + DH.SIZE7 + DH.SIZE8 +DH.SIZE9 + 
                DH.SIZE0 + coalesce(DH.SIZE1, 0)),0) 
                AS SLDONHANG,
                ISNULL((SELECT SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + 
                PC.SIZE8  + PC.SIZE9 + PC.SIZE0 + coalesce(PC.SIZE1, 0)) 
                FROM PHANCONG PC WHERE DH.SODH = PC.SODH),0) 
                AS SLPHANCONG
            FROM DONHANG DH Left Join DMkhachhang kh on kh.makh=dh.makh 
            GROUP BY dh.madh,dh.sodh,dh.ngaydh,dh.makh,kh.tenkh,dh.diengiaiphieu) 
            as DHCHUAPHANCONG
            where SLDONHANG - SLPHANCONG > 0
            order by NGAYDH desc
             """
    result = phancong.read_custom(sql)
    return result

class RESPONSE_BAOCAO_PHANCONG:
    SOPHIEU: str 
    NGAYPHIEU: str
    DIENGIAIPHIEU: str = ""
    MAKY: int


@router.get("/phancong/baocao_phancong")
def baocao_phancong(YEAR: str=None) -> List[RESPONSE_BAOCAO_PHANCONG]:
    condition_year = ""
    if YEAR is not None:
        condition_year = f"""where NGAYPHIEU >= '{YEAR}-01-01'
                             and NGAYPHIEU <= '{YEAR}-12-31'
                             """
    else:
        care_year = datetime.today().year
        condition_year = f"""where NGAYPHIEU >= '{care_year}-01-01'
                        """
        
    sql = f"""select SOPHIEU, NGAYPHIEU,
                DIENGIAIPHIEU, MAKY
                from PHANCONG
                {condition_year}
                group by  SOPHIEU, NGAYPHIEU,
                DIENGIAIPHIEU, MAKY
                order by NGAYPHIEU desc
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong/get_info_donhang")
def baocao_phancong(SOPHIEU: str) -> List[dict]:
    sql = f"""select DONHANG.SODH, NGAYDH,DONHANG.MAKH, DMKHACHHANG.TENKH, 
                     DIENGIAIPHIEU, SOLUONG
            from
            (select SODH, SUM(SIZE0+coalesce(SIZE1, 0)+SIZE5
            +SIZE6+SIZE7+SIZE8+SIZE9) as SOLUONG
            from PHANCONG
            where SOPHIEU = '{SOPHIEU}'
            group by SODH
            ) as PHANCONG
            inner join (select distinct SODH, NGAYDH, MAKH, 
                    DIENGIAIPHIEU from DONHANG) 
                    as DONHANG on DONHANG.SODH = PHANCONG.SODH
            inner join DMKHACHHANG on DONHANG.MAKH = DMKHACHHANG.MAKH
            order by NGAYDH desc
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong/get_chitietdonhang_dephancong")
def read(SODH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    sql = f"""select KIEMTRAPHANCONG.magiay as MAGIAY, TENGIAY, 
              madh as MADH, sodh as SODH, 
              ngaydh as NGAYDH, makh as MAKH, diengiaiphieu as DIENGIAIDONG, 
              tenkh as TENKH, 
              coalesce(MAUDE, '') as MAUDE, TENMAUDE, 
              coalesce(MAUGOT, '') as MAUGOT, TENMAUGOT,
              coalesce(MAUSUON, '') as MAUSUON, TENMAUSUON,
              coalesce(MAUCA, '') as MAUCA, TENMAUCA, 
              coalesce(MAUQUAI, '') as MAUQUAI, TENMAUQUAI,
              SIZE5-DaphancongSize5 as SIZE5, SIZE0-DaphancongSIZE0 as SIZE0,
              coalesce(SIZE1, 0)-DaphancongSIZE1 as SIZE1,
              SIZE6-DaphancongSize6 as SIZE6,SIZE7-DaphancongSize7 as SIZE7,
              SIZE8-DaphancongSize8 as SIZE8,SIZE9-DaphancongSize9 as SIZE9,
              SIZE0 as dhSIZE0, DaphancongSIZE0, coalesce(SIZE1, 0) as dhSIZE1, 
              DaphancongSIZE1,SIZE5 as dhSize5, DaphancongSize5, 
              SIZE6 as dhSize6, DaphancongSize6, SIZE7 as dhSize7, DaphancongSize7, 
              SIZE8 as dhSize8, DaphancongSize8, SIZE9 as dhSize9, DaphancongSize9
              from (
              SELECT DISTINCT dh.magiay, dh.madh,dh.sodh,dh.ngaydh,dh.makh,
                    kh.tenkh,dh.diengiaiphieu,
                    DH.MAUDE, DH.MAUGOT,DH.MAUSUON, 
                    DH.MAUCA, DH.MAUQUAI,
                        coalesce(DH.SIZE5, 0) AS SIZE5,
                        coalesce(DH.SIZE6, 0) AS SIZE6,
                        coalesce(DH.SIZE7, 0) AS SIZE7,
                        coalesce(DH.SIZE8, 0) AS SIZE8,
                        coalesce(DH.SIZE9, 0) AS SIZE9,
                        coalesce(DH.SIZE0, 0) AS SIZE0,
                        coalesce(DH.SIZE1, 0) AS SIZE1,
                        SUM(coalesce(PC.SIZE5, 0)) AS DaphancongSize5,
                        SUM(coalesce(PC.SIZE6, 0)) AS DaphancongSize6,
                        SUM(coalesce(PC.SIZE7, 0)) AS DaphancongSize7,
                        SUM(coalesce(PC.SIZE8, 0)) AS DaphancongSize8,
                        SUM(coalesce(PC.SIZE9, 0)) AS DaphancongSize9,
                        SUM(coalesce(PC.SIZE0, 0)) AS DaphancongSIZE0,
                        SUM(coalesce(PC.SIZE1, 0)) AS DaphancongSIZE1
                    FROM DONHANG DH 
                    left join PHANCONG as PC 
                            on DH.SODH = PC.SODH 
                            AND DH.MAGIAY = PC.MAGIAY 
                            AND coalesce(DH.MAUDE, '') = coalesce(PC.MAUDE, '')
                            AND coalesce(DH.MAUSUON, '') = coalesce(PC.MAUSUON, '') 
                            AND coalesce(DH.MAUCA, '') = coalesce(PC.MAUCA, '') 
                            AND coalesce(DH.MAUQUAI, '') = coalesce(PC.MAUQUAI, '')
                    Left Join DMkhachhang kh on kh.makh=dh.makh 
                    GROUP BY dh.magiay,dh.madh,dh.sodh,dh.ngaydh,dh.makh,
                    kh.tenkh,dh.diengiaiphieu,DH.MAUDE, DH.MAUGOT,DH.MAUSUON, 
                    DH.MAUCA, DH.MAUQUAI, DH.SIZE5, DH.SIZE6, DH.SIZE7, DH.SIZE8, 
                    DH.SIZE9, DH.SIZE0, coalesce(DH.SIZE1, 0)
              ) as KIEMTRAPHANCONG
              left join (select MAGIAY, TENGIAY from DMGIAY) 
              as DMGIAY on DMGIAY.MAGIAY = KIEMTRAPHANCONG.magiay
              left join (select MAMAU, TENMAU as TENMAUDE from DMMAU) 
                    as DMMAUDE on MAUDE = DMMAUDE.MAMAU
              left join (select MAMAU, TENMAU as TENMAUGOT from DMMAU) 
                    as DMMAUGOT on MAUGOT = DMMAUGOT.MAMAU
              left join (select MAMAU, TENMAU as TENMAUSUON from DMMAU) 
                    as DMMAUSUON on MAUSUON = DMMAUSUON.MAMAU
              left join (select MAMAU, TENMAU as TENMAUCA from DMMAU) 
                    as DMMAUCA on MAUCA = DMMAUCA.MAMAU
              left join (select MAMAU, TENMAU as TENMAUQUAI from DMMAU) 
                    as DMMAUQUAI on MAUQUAI = DMMAUQUAI.MAMAU
              where SODH = '{SODH}'
              and SIZE5 + SIZE6+ SIZE7+SIZE8+SIZE9+SIZE0 +coalesce(SIZE1, 0)> 
              DaphancongSize5 +DaphancongSize6+DaphancongSize7+
              DaphancongSize8+DaphancongSize9+DaphancongSIZE0+DaphancongSIZE1
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong")
def read(SOPHIEU: str) -> List[RESPONSE_PHANCONG]:
    sql = f"""select MADONG, MAPHIEU, SOPHIEU, NGAYPHIEU,
                    DIENGIAIPHIEU, SODH, MAGIAY,
                    SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, THODE,
                    THOQUAI, DAIN, DIENGIAIDONG, NGAYTAO, NGUOITAO,
                    NGUOISUA, NGAYSUA, MAUDE, MAUGOT, MAUSUON, MAUCA,
                    MAUQUAI, Size0 AS SIZE0, coalesce(SIZE1, 0) AS SIZE1, 
                    MAKY, TENGIAY, TENKH,
                    TENMAUDE, TENMAUGOT, TENMAUSUON, TENMAUCA, TENMAUQUAI,
                    TENTHODE, TENTHOQUAI
                from PHANCONG
                INNER join (select MAGIAY AS IDGIAY, TENGIAY, TENKH from V_GIAY) 
                    as DMGIAY on DMGIAY.IDGIAY = PHANCONG.MAGIAY
                inner join (select MANVIEN, TENNVIEN as TENTHODE from DMNHANVIEN 
                    where LOAINVIEN='TD') as DMTHODE on DMTHODE.MANVIEN = THODE
                inner join (select MANVIEN, TENNVIEN AS TENTHOQUAI from DMNHANVIEN 
                    WHERE LOAINVIEN='TQ') AS DMTHOQUAI ON DMTHOQUAI.MANVIEN = THOQUAI
                LEFT JOIN (SELECT MAMAU, TENMAU AS TENMAUDE FROM DMMAU)
                     AS DMMAUDE ON DMMAUDE.MAMAU = MAUDE
                LEFT JOIN (SELECT MAMAU, TENMAU AS TENMAUGOT FROM DMMAU)
                    AS DMMAUGOT ON DMMAUGOT.MAMAU = MAUGOT
                LEFT JOIN (SELECT MAMAU, TENMAU AS TENMAUSUON FROM DMMAU) 
                    AS DMMAUSUON ON DMMAUSUON.MAMAU = MAUSUON
                LEFT JOIN (SELECT MAMAU, TENMAU AS TENMAUCA FROM DMMAU) 
                    AS DMMAUCA ON DMMAUCA.MAMAU = MAUCA
                LEFT JOIN (SELECT MAMAU, TENMAU AS TENMAUQUAI FROM DMMAU) 
                    AS DMMAUQUAI ON DMMAUQUAI.MAMAU = MAUQUAI
                where SOPHIEU = '{SOPHIEU}'
            """
    result = phancong.read_custom(sql)
    return result


# @router.post("/phancong")
# def add(data: List[ITEM_PHANCONG]) -> RESPONSE:
#     # delete SOPHIEU cu, insert SDH moi
#     # cho trường hợp chú chỉ chỉnh sửa đơn hàng thôi, chứ ko add mới
#     # Không thể biết được bao nhiêu giày được add mới
#     # nên đành xóa dữ liệu cũ, add lại dữ liệu mới thôi

#     sql_delete = f"""delete PHANCONG
#                     where SOPHIEU = '{data[0].SOPHIEU}'"""
#     phancong.execute_custom(sql_delete)

#     # find common information
#     today = datetime.now()
#     year = today.year
#     MADONG = find_info_primary_key("PHANCONG","MD", today)
#     PHIEU = find_info_primary_key("PHANCONG", "PHIEU", today) + 1
#     MAPHIEU = f"PC{year}{str(PHIEU).zfill(12)}"
#     day_created = today.strftime("%Y-%m-%d %H:%M:%S")

#     for i in range(len(data)):
#         _data = dict(data[i])
#         MADONG += 1
#         _data["NGAYTAO"] = day_created
#         _data["NGAYSUA"] = day_created
#         _data["MAPHIEU"] = MAPHIEU
#         _data["MADONG"] = f"MD{year}{str(MADONG).zfill(12)}"
        
#         _data = convert_data_to_save_database(_data)
#         _c = ",".join([k for k, v in _data.items() if v is not None])
#         _v = ",".join([v for v in _data.values() if v is not None])
#         # phòng trường hợp những record khác nhau có số lượng
#         # cột insert khác nhau nên phải insert từng dòng như thế này
#         phancong.add(_c, _v)

#     # lưu lại thông tin mã dòng và mã đơn hàng
#     save_info_primary_key("PHANCONG","PC", year, PHIEU)
#     save_info_primary_key("PHANCONG","MD", year, MADONG)
#     return 1


@router.post("/phancong/add_phancong")
def add(data: ITEM_PHANCONG) -> RESPONSE:
    # find common information
    today = datetime.now()
    year = today.year
    MADONG = find_info_primary_key("PHANCONG","MD", today)
    PHIEU = find_info_primary_key("PHANCONG", "PHIEU", today) + 1
    MAPHIEU = f"PC{year}{str(PHIEU).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")

    _data = dict(data)
    MADONG += 1
    _data["NGAYTAO"] = day_created
    _data["NGAYSUA"] = day_created
    _data["MAPHIEU"] = MAPHIEU
    _data["MADONG"] = f"MD{year}{str(MADONG).zfill(12)}"
    
    _data_save = convert_data_to_save_database(_data)
    _c = ",".join([k for k, v in _data_save.items() if v is not None])
    _v = ",".join([v for v in _data_save.values() if v is not None])
    phancong.add(_c, _v)

    # lưu lại thông tin mã dòng và mã đơn hàng
    save_info_primary_key("PHANCONG","PC", year, PHIEU)
    save_info_primary_key("PHANCONG","MD", year, MADONG)
    return {"MADONG": _data["MADONG"], "MAPHIEU": _data["MAPHIEU"]}


@router.post("/phancong/rollback_delete")
def add(data: List[ITEM_PHANCONG]) -> RESPONSE:
    # find common information
    today = datetime.now()
    year = today.year
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")

    for i in range(len(data)):
        _data = dict(data[i])

        _data["NGAYTAO"] = day_created
        _data["NGAYSUA"] = day_created
        
        _data = convert_data_to_save_database(_data)
        _c = ",".join([k for k, v in _data.items() if v is not None])
        _v = ",".join([v for v in _data.values() if v is not None])
        # phòng trường hợp những record khác nhau có số lượng
        # cột insert khác nhau nên phải insert từng dòng như thế này
        phancong.add(_c, _v)

    # lưu lại thông tin mã dòng và mã đơn hàng
    return 1


@router.delete("/phancong")
def delete(SOPHIEU: str) -> RESPONSE:
    condition = f"SOPHIEU = '{SOPHIEU}'"
    return phancong.delete(condition)


@router.get("/phancong/get_thongtin_thode")
def read(SOPC: str) -> List[RESPONSE_PHANCONG_THO]:
    sql = f"""select THODE as MANVIEN, TENTHODE as TENNVIEN, 
                SUM(TONGSL) as SOLUONG, SUM(TONGSL *DONGIADE) as THANHTIEN
                from (SELECT PHANCONG.*,
                NV01.TENNVIEN TENTHODE,
                (size5 + size6 + size7 + size8 + size9+ size0 +coalesce(SIZE1, 0)) as TONGSL,
                DONGIAQUAI, DONGIADE
                FROM PHANCONG 
                    LEFT JOIN V_GIAY ON PHANCONG.MAGIAY = V_GIAY.MAGIAY
                        LEFT JOIN DMNHANVIEN NV01 ON PHANCONG.THODE = NV01.MANVIEN) 
                AS KQPHANCONG
                where SOPHIEU = '{SOPC}'
                group by THODE, TENTHODE
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong/get_thongtin_thoquai")
def get_thongtin_thoquai(SOPC: str) -> List[RESPONSE_PHANCONG_THO]:
    sql = f"""select THOQUAI as MANVIEN, TENTHOQUAI as TENNVIEN, 
                SUM(TONGSL) as SOLUONG, SUM(TONGSL *DONGIAQUAI) as THANHTIEN
                from (SELECT PHANCONG.*,
                NV01.TENNVIEN TENTHOQUAI,
                (size5 + size6 + size7 + size8 + size9+ size0 +coalesce(SIZE1, 0)) as TONGSL,
                DONGIAQUAI
                FROM PHANCONG 
                    LEFT JOIN V_GIAY ON PHANCONG.MAGIAY = V_GIAY.MAGIAY
		            LEFT JOIN DMNHANVIEN NV01 ON PHANCONG.THOQUAI = NV01.MANVIEN) 
                AS KQPHANCONG
                where SOPHIEU = '{SOPC}'
                group by THOQUAI, TENTHOQUAI
            """
    result = phancong.read_custom(sql)
    return result


@router.delete("/phancong/by_list_MADONG/")
def delete(MADONG: list = Query([])) -> RESPONSE:
    # update status of the MADONGs
    ds_madong = ""
    for madong in MADONG:
        ds_madong += f"'{madong}'," 
    ds_madong = ds_madong[:-1]
    condition = f"MADONG in ({ds_madong})"
    return phancong.delete(condition)


@router.post("/phancong/update_header")
def add(data: ITEM_HEADER_PHANCONG) -> RESPONSE:
    data = convert_data_to_save_database(dict(data))  
    val = ", ".join([f"{k} = {v}" for k, v in data.items() \
                     if v is not None])
    condition = f"SOPHIEU = {data['SOPHIEU']}"
    phancong.update(val, condition)
    return 1

