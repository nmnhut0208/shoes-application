from fastapi import APIRouter
from datetime import datetime
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from features.hethong import (find_info_primary_key, 
                              save_info_primary_key)
from utils.vietnamese import convert_data_to_save_database



router = APIRouter()


class GIAOHANG(BaseClass):
    def __init__(self):
        super().__init__("GIAOHANG")


GH = GIAOHANG()


@router.post("/giaohang")
def read(data: dict) -> RESPONSE_GIAOHANG:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    makh = data["MAKH"]
    # sql = f"SELECT SODH, NGAYDH, NGAYGH, DIENGIAIPHIEU, SUM(SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9) as SOLUONGCONLAI \
    # FROM DONHANG \
    # where MAKH = '{makh}' \
    # GROUP BY SODH, MAKH, NGAYDH, NGAYGH, DIENGIAIPHIEU"
    sql = f"""SELECT SODH, NGAYDH, NGAYGH, DIENGIAI AS DIENGIAIDONG,
              SLDONHANG as SOLUONGCONLAI FROM V_DHGIAOHANG 
              WHERE MAKH = '{makh}' AND SLDONHANG > SLGIAOHANG
              """
    return GH.read_custom(sql)


@router.post("/giaohang/{makh}")
def read(data: dict) -> RESPONSE_GIAOHANG:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    print(data)
    sodh = "(" + ", ".join([f"'{value}'" for value in data["sodh"]]) + ")"
    print(sodh)
    makh = data["makh"]
    sql = f"""SELECT SODH, DONHANG.MAGIAY, TENGIAY, MAUDE, MAUGOT, MAUSUON, MAUCA,
              MAUQUAI, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, 
              SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 as SOLUONG, 
              GIABAN, THANHTIEN, DIENGIAIPHIEU AS DIENGIAIDONG 
              FROM DONHANG  
              left join (
                    SELECT MAGIAY, TENGIAY FROM DMGIAY) as DMGIAY 
                    ON DONHANG.MAGIAY = DMGIAY.MAGIAY 
                WHERE SODH IN {sodh} AND MAKH = '{makh}'
                """
    print(sql)
    return GH.read_custom(sql)

@router.post("/savegiaohang")
def save(data: dict) -> RESPONSE:
    items = data["data"]
    makh = data["makh"]
    sophieu = data["sophieu"]
    diengiai = data["diengiai"]
    user = data["user"].lower()
    sql_delete = f"""delete FROM CONGNO
                    where SOPHIEU = '{sophieu}'
                    and LOAIPHIEU = 'BH' 
                    and MAKH = '{makh}'"""
    GH.execute_custom(sql_delete)
    today = datetime.now()
    year = today.year
    madong = find_info_primary_key("CONGNO", "MD", today)
    gh = find_info_primary_key("CONGNO", "BH", today) + 1
    MAPHIEU = f"BH{year}{str(gh).zfill(12)}"
    day_created = today.strftime("%Y-%m-%d %H:%M:%S")
    # print(madong, MAGH, day_created)
    
    for item in items:
        _c = []
        _v = []
        madong += 1
        del item["TENGIAY"]
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
        
        GH.add_with_table_name("CONGNO", _c, _v)

    save_info_primary_key("CONGNO", "MD", year, madong)
    save_info_primary_key("CONGNO", "BH", year, gh)

    return {"status": "success"}

