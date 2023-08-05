from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime
from features.hethong import (find_info_primary_key, 
                              save_info_primary_key)
from utils.vietnamese import convert_data_to_save_database


router = APIRouter()


class CHAMCONG(BaseClass):
    def __init__(self):
        super().__init__("CHAMCONG")


CC = CHAMCONG()

def get_type_nvien(manvien):
    sql = f"SELECT LOAINVIEN FROM DMNHANVIEN WHERE MANVIEN='{manvien}'"
    df = CC.read_custom(sql)
    return df[0]["LOAINVIEN"]

@router.post("/chamcong")
def read(data: dict) -> RESPONSE_CHAMCONG:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    maky = data["MAKY"]
    manv = data["MANVIEN"]
    loainv = get_type_nvien(manv)
    # loainv TD : THODE, TQ : THOQUAI
    typenv = None
    if loainv == "TD":
        typenv = "THODE"
    elif loainv == "TQ":
        typenv = "THOQUAI"
    
    if typenv is not None:
        sql = f"""
        select distinct abc.SOPHIEU as SOPHIEU, abc.NGAYPHIEU as NGAYPHIEU, abc.DIENGIAIPHIEU as DIENGIAI
from
(select info_chamcong.SOPHIEU, info_chamcong.NGAYPHIEU, info_chamcong.DIENGIAIPHIEU, SLCHAMCONG, SLCONLAI
 from (SELECT 
	dmgiay.tengiay,PC.SOPHIEU, PC.NGAYPHIEU, PC.DIENGIAIPHIEU, PC.MAGIAY,  
	pc.maude,PC.MAUGOT, PC.MAUSUON, PC.MAUCA, PC.MAUQUAI,pc.{typenv},
	SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + PC.SIZE8  +PC.SIZE9 +PC.SIZE0 + coalesce(PC.SIZE1,0)) AS SLPHANCONG, 
	ISNULL((SELECT SUM(ISNULL(CC.SOLUONG,0))  FROM CHAMCONG CC  WHERE PC.SOPHIEU = CC.PHIEUPC AND 
								PC.MAGIAY = CC.MAGIAY AND 
								coalesce(PC.MAUGOT,'') = coalesce(CC.MAUGOT,'') AND 
								coalesce(PC.MAUSUON,'') = coalesce(CC.MAUSUON,'') AND 
								coalesce(PC.MAUCA,'') = coalesce(CC.MAUCA,'') AND 
								coalesce(PC.mauquai,'') = coalesce(CC.mauquai,'') and 
								coalesce(pc.maude,'') = coalesce(cc.maude,'') and 
								pc.{typenv}=cc.manvien),0) AS SLCHAMCONG, 
	
	(SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + PC.SIZE8  +PC.SIZE9 +PC.SIZE0 +coalesce(PC.SIZE1,0)) - 
	
	ISNULL((SELECT SUM(ISNULL(CC.SOLUONG,0))  FROM CHAMCONG CC  WHERE PC.SOPHIEU = CC.PHIEUPC AND 
								PC.MAGIAY = CC.MAGIAY AND 
								coalesce(PC.MAUGOT,'') = coalesce(CC.MAUGOT,'') AND 
								coalesce(PC.MAUSUON,'') = coalesce(CC.MAUSUON,'') AND 
								coalesce(PC.MAUCA,'') = coalesce(CC.MAUCA,'') AND 
								coalesce(PC.mauquai,'') = coalesce(CC.mauquai,'') and 
								coalesce(pc.maude,'') = coalesce(cc.maude,'') and 
								pc.{typenv}=cc.manvien),0)) AS SLCONLAI 
FROM PHANCONG PC 
			left join dmgiay on dmgiay.magiay=pc.magiay 
where PC.MAKY = '{maky}'
and PC.{typenv} = '{manv}'
GROUP BY tengiay,PC.SOPHIEU, PC.NGAYPHIEU, PC.DIENGIAIPHIEU, PC.MAGIAY,  
pc.maude,PC.MAUGOT, PC.MAUSUON, PC.MAUCA, PC.MAUQUAI ,pc.{typenv}) as info_chamcong) as abc
where abc.SLCONLAI > 0
        """
        return CC.read_custom(sql)


    # sql = f"SELECT DISTINCT phieupc, NgayPhieu, DienGiai from CHAMCONG where MAKY='{maky}' AND MANVIEN='{manv}'"

    # return CC.read_custom(sql)


@router.get("/chamcong/nhanvien")
def read_nhanvien():
    # params = ("MANVIEN", "TENNVIEN", "DMNHANVIEN")
    col1 = "MANVIEN"
    col2 = "TENNVIEN"
    tbn = "DMNHANVIEN"
    sql = f"SELECT {col1}, {col2} FROM {tbn} WHERE LOAINVIEN IN ('TD', 'TQ')"
    return CC.read_custom(sql)


@router.get("/chamcong/ky")
def read_ky():
    col1 = "MAKY"
    col2 = "TENKY"
    tbn = "DMKYTINHLUONG"
    sql = f"SELECT {col1}, {col2} FROM {tbn}"
    return CC.read_custom(sql)


@router.post("/chamcong/{manvien}")
def read(data: dict):
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    phieupc = "(" + \
        ", ".join([f"'{value}'" for value in data["PHIEUPC"]]) + ")"
    maky = data["MAKY"]
    manvien = data["MANVIEN"]
    loainv = get_type_nvien(manvien)
    typenv = None
    if loainv == "TD":
        typenv = "THODE"
        sql = f"""SELECT * FROM 
                (SELECT 
                    dmgiay.tengiay,PC.SOPHIEU, PC.MAGIAY,  pc.maude,PC.MAUGOT, PC.MAUSUON, PC.MAUCA, PC.MAUQUAI,pc.THODE,
                    SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + PC.SIZE8  +PC.SIZE9 +PC.SIZE0 +coalesce(PC.SIZE1,0)) AS SLPHANCONG, 
                    ISNULL((SELECT SUM(ISNULL(CC.SOLUONG,0))  FROM CHAMCONG CC  WHERE PC.SOPHIEU = CC.PHIEUPC AND 
                                                PC.MAGIAY = CC.MAGIAY AND 
                                                PC.MAUGOT = CC.MAUGOT AND 
                                                PC.MAUSUON = CC.MAUSUON AND 
                                                PC.MAUCA = CC.MAUCA AND 
                                                PC.mauquai = CC.mauquai and 
                                                pc.maude=cc.maude and 
                                                pc.THODE=cc.manvien),0) AS SLCHAMCONG, 
                    
                    (SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + PC.SIZE8  +PC.SIZE9 +PC.SIZE0 +coalesce(PC.SIZE1,0)) - 
                    
                    ISNULL((SELECT SUM(ISNULL(CC.SOLUONG,0))  FROM CHAMCONG CC  WHERE PC.SOPHIEU = CC.PHIEUPC AND 
                                                PC.MAGIAY = CC.MAGIAY AND 
                                                PC.MAUGOT = CC.MAUGOT AND 
                                                PC.MAUSUON = CC.MAUSUON AND 
                                                PC.MAUCA = CC.MAUCA AND 
                                                PC.mauquai = CC.mauquai and 
                                                pc.maude=cc.maude and 
                                                pc.THODE=cc.manvien),0)) AS SLCONLAI 
                FROM PHANCONG PC 
                            left join dmgiay on dmgiay.magiay=pc.magiay 
                GROUP BY tengiay,PC.SOPHIEU, PC.MAGIAY,  pc.maude,PC.MAUGOT, PC.MAUSUON, PC.MAUCA, PC.MAUQUAI ,pc.THODE) AS CHAMCONGTHODE
                  where CHAMCONGTHODE.{typenv}='{manvien}' 
                  and SOPHIEU IN {phieupc}"""
        return CC.read_custom(sql)
    elif loainv == "TQ":
        typenv = "THOQUAI"
        sql = f"""SELECT * FROM 
                (SELECT 
                dmgiay.tengiay,PC.SOPHIEU, PC.MAGIAY,  pc.maude,PC.MAUGOT, PC.MAUSUON, PC.MAUCA, PC.MAUQUAI,pc.THOQUAI,
                SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + PC.SIZE8  +PC.SIZE9 +PC.SIZE0 +coalesce(PC.SIZE1,0)) AS SLPHANCONG, 
                ISNULL((SELECT SUM(ISNULL(CC.SOLUONG,0))  FROM CHAMCONG CC  WHERE PC.SOPHIEU = CC.PHIEUPC AND 
                                            PC.MAGIAY = CC.MAGIAY AND 
                                            PC.MAUGOT = CC.MAUGOT AND 
                                            PC.MAUSUON = CC.MAUSUON AND 
                                            PC.MAUCA = CC.MAUCA AND 
                                            PC.mauquai = CC.mauquai and 
                                            pc.maude=cc.maude and 
                                            pc.THOQUAI=cc.manvien),0) AS SLCHAMCONG, 
                
                (SUM(PC.SIZE5 + PC.SIZE6 + PC.SIZE7 + PC.SIZE8  +PC.SIZE9+PC.SIZE0 +coalesce(PC.SIZE1,0)) - 
                
                ISNULL((SELECT SUM(ISNULL(CC.SOLUONG,0))  FROM CHAMCONG CC  WHERE PC.SOPHIEU = CC.PHIEUPC AND 
                                            PC.MAGIAY = CC.MAGIAY AND 
                                            PC.MAUGOT = CC.MAUGOT AND 
                                            PC.MAUSUON = CC.MAUSUON AND 
                                            PC.MAUCA = CC.MAUCA AND 
                                            PC.mauquai = CC.mauquai and 
                                            pc.maude=cc.maude and 
                                            pc.THOQUAI=cc.manvien),0)) AS SLCONLAI 
            FROM PHANCONG PC 
                        left join dmgiay on dmgiay.magiay=pc.magiay 
            GROUP BY tengiay,PC.SOPHIEU, PC.MAGIAY,  pc.maude,PC.MAUGOT, PC.MAUSUON, PC.MAUCA, PC.MAUQUAI ,pc.THOQUAI) AS CHAMCONGTHOQUAI
                  where CHAMCONGTHOQUAI.{typenv}='{manvien}' 
                  and SOPHIEU IN {phieupc}"""
        return CC.read_custom(sql)
    

@router.post("/savechamcong")
def save(data: dict) -> RESPONSE:
    items = data["data"]
    manv = data["MANVIEN"]
    maky = data["MAKY"]
    phieupc = data["SOPHIEU"]
    ngaypc = data["NGAYPHIEU"]
    diengiai = data["DIENGIAI"]
    sql_delete = f"""DELETE FROM CHAMCONG 
                     WHERE MAKY='{maky}' AND MANVIEN='{manv}' 
                     AND PHIEUPC='{phieupc}'"""
    CC.execute_custom(sql_delete)
    today = datetime.now()
    year = today.year
    madong = find_info_primary_key("CHAMCONG", "MD", today)
    cc = find_info_primary_key("CHAMCONG", "CC", today) + 1
    MAPHIEU = f"CC{year}{str(cc).zfill(12)}"
    # day_created = today.strftime("%Y-%m-%d %H:%M:%S")
    for item in items:
        _c = []
        _v = []
        d_item = {}
        madong += 1
        d_item["MAKY"] = maky
        d_item["MANVIEN"] = manv
        d_item["MAGIAY"] = item["MAGIAY"]
        d_item["SOLUONG"] = item["SLPHANCONG"]
        d_item["madong"] = f"MD{year}{str(madong).zfill(12)}"
        d_item["maphieu"] = MAPHIEU
        d_item["phieupc"] = phieupc
        d_item["maude"] = item["maude"]
        d_item["maugot"] = item["MAUGOT"]
        d_item["mausuon"] = item["MAUSUON"]
        d_item["mauca"] = item["MAUCA"]
        d_item["mauquai"] = item["MAUQUAI"]
        d_item["NgayPhieu"] = ngaypc
        d_item["DienGiai"] = diengiai

        _data_save = convert_data_to_save_database(d_item)
        _c = ",".join([k for k, v in _data_save.items() if v is not None])
        _v = ",".join([v for v in _data_save.values() if v is not None])
        CC.add_with_table_name("CHAMCONG", _c, _v)

    save_info_primary_key("CHAMCONG", "MD", year, madong)
    save_info_primary_key("CHAMCONG", "CC", year, cc)
    return {"status": "success"}


@router.get("/chamcong/salary_compute")
def reasalary_computed(MAKY: str, TYPE: str) -> List[dict]:
    LOAINVIEN = ""
    if TYPE == "TQ":
        LOAINVIEN = "and MALOAINV='TQ'"
    elif TYPE == "TD":
        LOAINVIEN = "and MALOAINV='TD'"
    else:
        pass
    sql = f"""
        select MANVIEN, TENNVIEN, MaGiay as MAGIAY, SOLUONG,
        DONGIA, SOLUONG * DONGIA as THANHTIEN,
        PHIEUPC, DIENGIAIPHIEU, MADE, MAQUAI
        from V_CHAMCONG
        where MaKy = '{MAKY}'
        -- and MANVIEN='LINH' -- delete this line
        {LOAINVIEN}
        order by MANVIEN, PHIEUPC, MAGIAY
    """
    result = CC.read_custom(sql)
    return result


