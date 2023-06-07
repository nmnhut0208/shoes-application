from fastapi import APIRouter
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


class RESPONSE_PHANCONG(BaseModel):
    SODH: str
    NGAYDH: str
    MAKH: str
    TENKH: Optional[str] = None
    DIENDAIPHIEU: Optional[str] = None
    SOLUONG: Optional[str] = None


router = APIRouter()


class PHANCONG(BaseClass):
    def __init__(self):
        super().__init__("PHANCONG")


phancong = PHANCONG()


@router.get("/phancong/donhangchuaphancong")
def read() -> List[RESPONSE_PHANCONG]:
    sql = f"""select DONHANG.SODH, NGAYDH, DONHANG.MAKH, DMKHACHHANG.TENKH, 
                DONHANG.DIENGIAIPHIEU, 
                SUM(DONHANG.SIZE5 + DONHANG.SIZE6 + DONHANG.SIZE7 + DONHANG.SIZE8 
                + DONHANG.SIZE9+DONHANG.SIZE0) AS SOLUONG
                from DONHANG
                left join DMKHACHHANG on DMKHACHHANG.MAKH = DONHANG.MAKH
                where DAPHANCONG = 0
                group by DONHANG.SODH, NGAYDH, DONHANG.MAKH, DMKHACHHANG.TENKH, 
                DONHANG.DIENGIAIPHIEU
            """
    result = phancong.read_custom(sql)
    return result


@router.get("/phancong/{SOPC}")
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


