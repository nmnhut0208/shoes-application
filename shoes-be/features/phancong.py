from fastapi import APIRouter, Query
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from features.hethong import (find_info_primary_key,
                              save_info_primary_key)
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ITEM_PHANCONG(BaseModel):
    SOPHIEU: str
    NGAYPHIEU: str 
    DIENGIAIPHIEU: Optional[str] = None
    SODH: str
    MAGIAY: str
    SIZE5: int
    SIZE6: int
    SIZE7: int
    SIZE9: int
    SIZE8: int
    SIZE0: int
    THODE: str
    THOQUAI: str 
    NGUOITAO: Optional[str] = None
    NGUOISUA: Optional[str] = None
    MAUDE: Optional[str] = None
    MAUGOT: Optional[str] = None
    MAUSUON: Optional[str] = None
    MAUCA: Optional[str] = None
    MAUQUAI: Optional[str] = None
    MAKY: str
    DIENGIAIDONG: Optional[str] = None

class RESPONSE_PHANCONG_THO:
    MANVIEN: str
    TENNVIEN: str
    SOLUONG: int
    THANHTIEN: int


class RESPONSE_PHANCONG(BaseModel):
    SODH: str
    NGAYDH: str
    MAKH: str
    TENKH: Optional[str] = None
    DIENDAIPHIEU: Optional[str] = None
    SOLUONG: Optional[str] = None

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

class PHANCONG(BaseClass):
    def __init__(self):
        super().__init__("PHANCONG")


phancong = PHANCONG()


@router.get("/phancong/donhangchuaphancong")
def read() -> List[RESPONSE_PHANCONG]:
    sql = """select madh as MADH, sodh as SODH, ngaydh as NGAYDH, 
             makh as MAKH, diengiaiphieu as DIENDAIPHIEU, tenkh as TENKH,
             SLDONHANG-SLPHANCONG as SOLUONG 
             from V_DHPHANCONG
             where SLDONHANG - SLPHANCONG > 0
             """
    result = phancong.read_custom(sql)
    return result

# TODO: chinh sua de lam Truy Van Phan Cong 
class RESPONSE_BAOCAO_PHANCONG:
    SOPHIEU: str 
    NGAYPHIEU: str


@router.get("/phancong/baocao_phancong")
def baocao_phancong() -> List[RESPONSE_BAOCAO_PHANCONG]:
    sql = f"""select SOPHIEU, NGAYPHIEU, TENKH, NGAYDH, NGAYGH, 
                DIENGIAIPHIEU AS DIENGIAI,
                SUM(SIZE0 +SIZE5+SIZE6+SIZE7+SIZE8+SIZE9) as SOLUONG
                from V_BCDONHANG
                group by SODH, MAKH, TENKH, NGAYDH, NGAYGH, DIENGIAIPHIEU
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong/get_chitietdonhang_dephancong")
def read(SODH: str) -> List[RESPONSE_GIAYTHEOKHACHHANG]:
    print("SODH: ", SODH)
    sql = f"""select V_KIEMTRAPHANCONG.magiay as MAGIAY, TENGIAY, 
              HINHANH, madh as MADH, sodh as SODH, 
              ngaydh as NGAYDH, makh as MAKH, diengiaiphieu as DIENGIAIDONG, 
              tenkh as TENKH, coalesce(MAUDE, '') as MAUDE, 
              coalesce(MAUGOT, '') as MAUGOT, 
              coalesce(MAUSUON, '') as MAUSUON,
              coalesce(MAUCA, '') as MAUCA, 
              coalesce(MAUQUAI, '') as MAUQUAI, 
              SIZE5-DaphancongSize5 as SIZE5, SIZE0-DaphancongSize0 as SIZE0,
              SIZE6-DaphancongSize6 as SIZE6,SIZE7-DaphancongSize7 as SIZE7,
              SIZE8-DaphancongSize8 as SIZE8,SIZE9-DaphancongSize9 as SIZE9,
              SIZE0 as dhSize0, DaphancongSize0, SIZE5 as dhSize5, DaphancongSize5, 
              SIZE6 as dhSize6, DaphancongSize6, SIZE7 as dhSize7, DaphancongSize7, 
              SIZE8 as dhSize8, DaphancongSize8, SIZE9 as dhSize9, DaphancongSize9
              from V_KIEMTRAPHANCONG
              left join (select MAGIAY, TENGIAY, HINHANH from DMGIAY) 
              as DMGIAY on DMGIAY.MAGIAY = V_KIEMTRAPHANCONG.magiay
              where SODH = '{SODH}'
              and SIZE5 + SIZE6+ SIZE7+SIZE8+SIZE9+SIZE0 > 
              DaphancongSize5 +DaphancongSize6+DaphancongSize7+
              DaphancongSize8+DaphancongSize9+DaphancongSize0
          """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong")
def read(SOPC: str) -> List[RESPONSE_PHANCONG]:
    sql = f"""select SOPHIEU, PHANCONG.SODH, NGAYDH, 
                    DONHANG.MAKH, DMKHACHHANG.TENKH, 
                    PHANCONG.DIENGIAIPHIEU, 
                    SUM(PHANCONG.SIZE5 + PHANCONG.SIZE6 + PHANCONG.SIZE7 + 
                    PHANCONG.SIZE8+ PHANCONG.SIZE9+PHANCONG.SIZE0) AS SOLUONG
              from PHANCONG
              left join DONHANG on DONHANG.SODH = PHANCONG.SODH
              left join DMKHACHHANG on DMKHACHHANG.MAKH = DONHANG.MAKH
              where SOPHIEU = '{SOPC}'
              group by SOPHIEU, PHANCONG.SODH, NGAYDH, DONHANG.MAKH, 
              DMKHACHHANG.TENKH, PHANCONG.DIENGIAIPHIEU
            """
    result = phancong.read_custom(sql)
    return result


@router.post("/phancong")
def add(data: List[ITEM_PHANCONG]) -> RESPONSE:
    # delete SOPHIEU cu, insert SDH moi
    # cho trường hợp chú chỉ chỉnh sửa đơn hàng thôi, chứ ko add mới
    # Không thể biết được bao nhiêu giày được add mới
    # nên đành xóa dữ liệu cũ, add lại dữ liệu mới thôi

    sql_delete = f"""delete PHANCONG
                    where SOPHIEU = '{data[0].SOPHIEU}'"""
    phancong.execute_custom(sql_delete)

    # find common information
    today = datetime.now()
    year = today.year
    MADONG = find_info_primary_key("PHANCONG","MD", today)
    PHIEU = find_info_primary_key("PHANCONG", "PHIEU", today) + 1
    MAPHIEU = f"PC{year}{str(PHIEU).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")

    for i in range(len(data)):
        _v = []
        _c = []
        _data = dict(data[i])
        MADONG += 1
        _data["NGAYTAO"] = day_created
        _data["NGAYSUA"] = day_created
        _data["MAPHIEU"] = MAPHIEU
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
        phancong.add(_c, _v)

    # lưu lại thông tin mã dòng và mã đơn hàng
    save_info_primary_key("PHANCONG","PC", year, PHIEU)
    save_info_primary_key("PHANCONG","MD", year, MADONG)
    return 1

@router.post("/phancong/add_phancong")
def add(data: ITEM_PHANCONG) -> RESPONSE:
    # find common information
    today = datetime.now()
    year = today.year
    MADONG = find_info_primary_key("PHANCONG","MD", today)
    PHIEU = find_info_primary_key("PHANCONG", "PHIEU", today) + 1
    MAPHIEU = f"PC{year}{str(PHIEU).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")

    _v = []
    _c = []
    _data = dict(data)
    MADONG += 1
    _data["NGAYTAO"] = day_created
    _data["NGAYSUA"] = day_created
    _data["MAPHIEU"] = MAPHIEU
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
    phancong.add(_c, _v)

    # lưu lại thông tin mã dòng và mã đơn hàng
    save_info_primary_key("PHANCONG","PC", year, PHIEU)
    save_info_primary_key("PHANCONG","MD", year, MADONG)
    return {"MADONG": _data["MADONG"]}



@router.delete("/phancong")
def delete(data: ITEM_PHANCONG) -> RESPONSE:
    data = dict(data)
    print(data)
    condition = []
    for key, value in data.items():
        if value is not None or key in ["NGAYPHIEU"]:
            if type(value) is str:
                condition.append(f"{key}='{value}'")
            else:
                condition.append(f"{key}={value}")
    return phancong.delete(" and ".join(condition))


@router.get("/phancong/get_thongtin_thode")
def read(SOPC: str) -> List[RESPONSE_PHANCONG_THO]:
    sql = f"""select THODE as MANVIEN, TENTHODE as TENNVIEN, 
                SUM(TONGSL) as SOLUONG, SUM(LUONGDE) as THANHTIEN
                from V_KQPHANCONG
                where SOPHIEU = '{SOPC}'
                group by THODE, TENTHODE
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong/get_thongtin_thoquai")
def get_thongtin_thoquai(SOPC: str) -> List[RESPONSE_PHANCONG_THO]:
    sql = f"""select THOQUAI as MANVIEN, TENTHOQUAI as TENNVIEN, 
                SUM(TONGSL) as SOLUONG, SUM(LUONGQUAI) as THANHTIEN
                from V_KQPHANCONG
                where SOPHIEU = '{SOPC}'
                group by THOQUAI, TENTHOQUAI
            """
    result = phancong.read_custom(sql)
    return result


@router.delete("/phancong/by_list_MADONG/")
def delete(MADONG: list = Query([])) -> RESPONSE:
    print("MADONG: ", MADONG)
    # update status of the MADONGs
    ds_madong = ""
    for madong in MADONG:
        ds_madong += f"'{madong}'," 
    ds_madong = ds_madong[:-1]
    condition = f"MADONG in ({ds_madong})"
    return phancong.delete(condition)
