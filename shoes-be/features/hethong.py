from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

from pydantic import BaseModel
from typing import Optional
from datetime import datetime

router = APIRouter()


class HETHONG(BaseClass):
    def __init__(self):
        super().__init__("V1T4444")

class ITEM_HETHONG(BaseModel):
    LASTNUMBER: int


hethong = HETHONG()

# =================================================================
def find_info_primary_key(table, key, today):
    year = today.year
    sql = f"""select *
            from V1T4444
            Where TABLENAME='{table}'
            and KEYSTRING = '{key}{year}'"""
    data = hethong.read_custom(sql)
    lastnumber = 1
    if data is None or len(data) == 0:
        sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                        VALUES ('{table}', '{key}{year}', 0)"""
        hethong.execute_custom(sql_insert)
    else:
        lastnumber = data[0]['LASTKEY']
    return lastnumber


def save_info_primary_key(table, key, year, value):
    sql_insert = f"""UPDATE V1T4444 
                    SET LASTKEY = {value}
                    WHERE TABLENAME = '{table}'
                    AND KEYSTRING = '{key}{year}'"""
    hethong.execute_custom(sql_insert)

#==============================================================
def find_info_UI(table_nam, keystring):
    today = datetime.now()
    year = str(today.year)[2:]
    month = str(today.month).zfill(2)
    sql = f"""select *
            from V1T4444
            Where TABLENAME='{table_nam}'
            and KEYSTRING = '{keystring}--{month}/{year}'"""
    data = hethong.read_custom(sql)
    lastnumber = 1
    if data is None or len(data) == 0:
        sql_insert = f"""INSERT INTO 
                         V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                         VALUES ('{table_nam}', 
                         '{keystring}--{month}/{year}', 0)"""
        hethong.execute_custom(sql_insert)
    else:
        lastnumber = data[0]['LASTKEY'] + 1

    number_string = str(lastnumber).zfill(4)
    showUI = f"{keystring}-{number_string}-{month}/{year}"
    return lastnumber, showUI


def save_info_UI(table_name, keystring, value):
    today = datetime.now()
    month = str(today.month).zfill(2)
    year = str(today.year)[2:]
    sql_insert = f"""UPDATE V1T4444 
                     SET LASTKEY = {value}
                     WHERE TABLENAME = '{table_name}'
                     AND KEYSTRING = '{keystring}--{month}/{year}'"""
    return hethong.execute_custom(sql_insert)
#==============================================================


@router.get("/hethong/donhang/SODH")
def find_info_SODH():
    lastnumber, showUI = find_info_UI("DONHANG", "DH")
    return {"SODH": showUI, "LastestDH": lastnumber}


@router.put("/hethong/donhang/SODH")
def update_info_SODH(data: ITEM_HETHONG) -> RESPONSE:
    sodh = data.LASTNUMBER
    return save_info_UI("DONHANG", "DH", sodh)

#==============================================================

@router.get("/hethong/giaohang/SOPHIEU")
def find_info_SOPHIEU():
    lastnumber, showUI = find_info_UI("CONGNO", "GH")
    return {"SOPHIEU": showUI, "LastestGH": lastnumber}


@router.put("/hethong/giaohang/SOPHIEU")
def update_info_SOPHIEU(data: ITEM_HETHONG) -> RESPONSE:
    sophieu = data.LASTNUMBER
    return save_info_UI("CONGNO", "GH", sophieu)

#==============================================================

@router.get("/hethong/phancong/SOPC")
def find_info_SOPC():
    lastnumber, showUI = find_info_UI("PHANCONG", "PC")
    return {"SOPC": showUI, "LastestPC": lastnumber}


@router.put("/hethong/phancong/SOPC")
def update_info_SOPC(data: ITEM_HETHONG) -> RESPONSE:
    SOPC = data.LASTNUMBER
    return save_info_UI("PHANCONG", "PC", SOPC)

#==============================================================

@router.get("/hethong/phieuthu/SOPHIEU")
def find_info_SOPC():
    lastnumber, showUI = find_info_UI("CONGNO", "PT")
    return {"SOPHIEU": showUI, "LastestSOPHIEU": lastnumber}


@router.put("/hethong/phieuthu/SOPHIEU")
def update_info_SOPC(data: ITEM_HETHONG) -> RESPONSE:
    SOPHIEU = data.LASTNUMBER
    return save_info_UI("CONGNO", "PT", SOPHIEU)

