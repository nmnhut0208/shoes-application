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
    sql = f"""SELECT SODH, NGAYDH, NGAYGH, DIENGIAI AS DIENGIAIDONG, SLDONHANG - SLGIAOHANG as SOLUONGCONLAI
            from 
            (SELECT DISTINCT dh.sodh,dh.ngaydh,dh.ngaygh,dh.makh,kh.tenkh,dh.diengiaiphieu AS DIENGIAI,dh.madh, dh.tmpfield as dagh,
                ISNULL(SUM(DH.SIZE5 + DH.SIZE6 + DH.SIZE7 + DH.SIZE8  +DH.SIZE9  +DH.SIZE0 + coalesce(DH.SIZE1,0)),0) AS SLDONHANG,
                ISNULL((SELECT SUM(CN.SIZE5 + CN.SIZE6 + CN.SIZE7 + CN.SIZE8  +CN.SIZE9 +CN.SIZE0 +coalesce(CN.SIZE1,0)) FROM CONGNO CN WHERE DH.SODH = CN.SODH),0) AS SLGIAOHANG
            FROM DONHANG DH Left Join DMkhachhang kh on kh.makh=dh.makh 
            GROUP BY dh.sodh,dh.makh,kh.tenkh,dh.diengiaiphieu,madh,dh.ngaydh,dh.ngaygh,dh.tmpfield) as view_gh
            WHERE MAKH = '{makh}' AND SLDONHANG > SLGIAOHANG
              """
    return GH.read_custom(sql)


@router.post("/giaohang/{makh}")
def read(data: dict) -> RESPONSE_GIAOHANG:
    sodh = "(" + ", ".join([f"'{value}'" for value in data["sodh"]]) + ")"
    makh = data["makh"]
    sql = f"""SELECT SODH, THONGKE.MAGIAY, DMGIAY.TENGIAY, SIZE5, SIZE6, SIZE7, SIZE8, SIZE9, SIZE0, coalesce(SIZE1,0) AS SIZE1, MAUDE, MAUGOT, MAUSUON, MAUCA, MAUQUAI,
                SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 + coalesce(SIZE1,0) as SOLUONG, DMGIAY.DONGIA AS GIABAN, (SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 + coalesce(SIZE1,0)) * THONGKE.GIABAN AS THANHTIEN,
                THONGKE.DIENGIAIPHIEU AS DIENGIAIDONG
                FROM 
                (
                select DONHANG.SODH, DONHANG.MAGIAY, coalesce(DONHANG.SIZE5, 0) - SUM(coalesce(CONGNO.SIZE5, 0)) AS SIZE5, 
                coalesce(DONHANG.SIZE6, 0) - SUM(coalesce(CONGNO.SIZE6, 0)) AS SIZE6, coalesce(DONHANG.SIZE7, 0) - SUM(coalesce(CONGNO.SIZE7, 0)) AS SIZE7, 
                coalesce(DONHANG.SIZE8, 0) - SUM(coalesce(CONGNO.SIZE8, 0)) AS SIZE8, coalesce(DONHANG.SIZE9, 0) - SUM(coalesce(CONGNO.SIZE9, 0)) AS SIZE9, 
                coalesce(DONHANG.SIZE0, 0) - SUM(coalesce(CONGNO.SIZE0, 0)) AS SIZE0, coalesce(DONHANG.SIZE1, 0) - SUM(coalesce(CONGNO.SIZE1, 0)) AS SIZE1, 
                DONHANG.MAUDE, DONHANG.MAUGOT, DONHANG.MAUSUON, DONHANG.MAUCA, DONHANG.MAUQUAI,
                DONHANG.GIABAN, DONHANG.THANHTIEN, DONHANG.DIENGIAIPHIEU
                from DONHANG
                LEFT JOIN CONGNO ON DONHANG.SODH = CONGNO.SODH 
                AND DONHANG.MAGIAY = CONGNO.MAGIAY 
                AND coalesce(DONHANG.MAUDE, '') = coalesce(CONGNO.MAUDE, '')
                AND coalesce(DONHANG.MAUSUON, '') = coalesce(CONGNO.MAUSUON, '') 
                AND coalesce(DONHANG.MAUCA, '') = coalesce(CONGNO.MAUCA, '') 
                AND coalesce(DONHANG.MAUQUAI, '') = coalesce(CONGNO.MAUQUAI, '')
                AND coalesce(DONHANG.MAUGOT, '') = coalesce(CONGNO.MAUGOT, '')
                WHERE DONHANG.SODH IN {sodh}
                GROUP BY DONHANG.SODH, DONHANG.MAGIAY, DONHANG.MAUDE, DONHANG.MAUGOT, DONHANG.MAUSUON, DONHANG.MAUCA, DONHANG.MAUQUAI,
                DONHANG.SIZE5, DONHANG.SIZE6, DONHANG.SIZE7, DONHANG.SIZE8, DONHANG.SIZE9, DONHANG.SIZE0, DONHANG.SIZE1,
                DONHANG.GIABAN, DONHANG.THANHTIEN, DONHANG.DIENGIAIPHIEU
                ) AS THONGKE
                left join (SELECT MAGIAY, TENGIAY, DONGIA FROM DMGIAY) as DMGIAY ON THONGKE.MAGIAY = DMGIAY.MAGIAY
                WHERE SIZE5 + SIZE6 + SIZE7 + SIZE8 + SIZE9 + SIZE0 + coalesce(SIZE1,0) > 0
                """
    # return GH.read_custom(sql)
    results = GH.read_custom(sql)
    # group with SODH
    results_group = {}
    for result in results:
        if result["SODH"] not in results_group:
            results_group[result["SODH"]] = []
        results_group[result["SODH"]].append(result)
    # print(results_group)
    return results_group


@router.post("/savegiaohang")
def save(data: dict) -> RESPONSE:
    items = data["data"]
    makh = data["makh"]
    sophieu = data["sophieu"]
    diengiai = data["diengiai"]
    date = data["date"]
    user = data["user"].lower()
    sql_delete = f"""delete FROM CONGNO
                    where SOPHIEU = '{sophieu}'
                    and LOAIPHIEU = 'BH' 
                    and MAKH = '{makh}'"""
    GH.execute_custom(sql_delete)
    # today = datetime.now()
    # convert date to datetime
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

