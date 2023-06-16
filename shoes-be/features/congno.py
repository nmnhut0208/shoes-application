from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime
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
    print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values() 
                     if value is not None])
    congno.add(col, val)
    save_info_primary_key("CONGNO", "PT", year, SOPHIEU)
    save_info_primary_key("CONGNO", "MD", year, SODONG)
    return 1


@router.put("/congno/phieuthu")
def update(data: ITEM_PHIEUTHU) -> RESPONSE:
    data = dict(data)    
    data["NGAYSUA"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()
                      if value is not None])
    condition = f"SOPHIEU = '{data['SOPHIEU']}'"
    return congno.update(val, condition)


@router.delete("/congno/phieuthu")
def delete(SOPHIEU: str) -> RESPONSE:
    condition = f"SOPHIEU = '{SOPHIEU}'"
    return congno.delete(condition)
