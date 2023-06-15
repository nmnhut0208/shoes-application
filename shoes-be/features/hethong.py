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
    if len(data) == 0:
        sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                        VALUES ('{table}', '{key}{year}', {lastnumber})"""
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


@router.get("/hethong/donhang/SODH")
def find_info_SODH():
    today = datetime.now()
    year = str(today.year)[2:]
    print("year: ", year)
    month = str(today.month).zfill(2)
    sql = f"""select *
            from V1T4444
            Where TABLENAME='DONHANG'
            and KEYSTRING = 'DH--{month}/{year}'"""
    data = hethong.read_custom(sql)
    lastnumber = 1
    if len(data) == 0:
        sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                    VALUES ('DONHANG', 'DH--{month}/{year}', {lastnumber})"""
        hethong.execute_custom(sql_insert)
    else:
        lastnumber = data[0]['LASTKEY'] + 1

    number_string = str(lastnumber).zfill(4)
    SODH = f"DH-{number_string}-{month}/{year}"
    return {"SODH": SODH, "LastestDH": lastnumber}

@router.get("/hethong/giaohang/SOPHIEU")
def find_info_SOPHIEU():
    today = datetime.now()
    year = str(today.year)[2:]
    print("year: ", year)
    month = str(today.month).zfill(2)
    sql = f"""select *
            from V1T4444
            Where TABLENAME='CONGNO'
            and KEYSTRING = 'GH--{month}/{year}'"""
    data = hethong.read_custom(sql)
    lastnumber = 0
    if len(data) == 0:
        sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                    VALUES ('CONGNO', 'GH--{month}/{year}', {lastnumber})"""
        hethong.execute_custom(sql_insert)
        lastnumber += 1
    else:
        lastnumber = data[0]['LASTKEY'] + 1

    number_string = str(lastnumber).zfill(4)
    SOPHIEU = f"GH-{number_string}-{month}/{year}"
    return {"SOPHIEU": SOPHIEU, "LastestGH": lastnumber}


@router.put("/hethong/donhang/SODH")
def update_info_SODH(data: ITEM_HETHONG) -> RESPONSE:
    sodh = data.LASTNUMBER
    today = datetime.now()
    month = str(today.month).zfill(2)
    year = str(today.year)[2:]
    sql_insert = f"""UPDATE V1T4444 
                     SET LASTKEY = {sodh}
                     WHERE TABLENAME = 'DONHANG'
                     AND KEYSTRING = 'DH--{month}/{year}'"""
    return hethong.execute_custom(sql_insert)

@router.put("/hethong/giaohang/SOPHIEU")
def update_info_SOPHIEU(data: ITEM_HETHONG) -> RESPONSE:
    sophieu = data.LASTNUMBER
    today = datetime.now()
    month = str(today.month).zfill(2)
    year = str(today.year)[2:]
    sql_insert = f"""UPDATE V1T4444 
                     SET LASTKEY = {sophieu}
                     WHERE TABLENAME = 'CONGNO'
                     AND KEYSTRING = 'GH--{month}/{year}'"""
    return hethong.execute_custom(sql_insert)

@router.get("/hethong/phancong/SOPC")
def find_info_SOPC():
    today = datetime.now()
    year = str(today.year)[2:]
    print("year: ", year)
    month = str(today.month).zfill(2)
    sql = f"""select *
            from V1T4444
            Where TABLENAME='PHANCONG'
            and KEYSTRING = 'PC--{month}/{year}'"""
    data = hethong.read_custom(sql)
    lastnumber = 1
    if len(data) == 0:
        sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                    VALUES ('PHANCONG', 'PC--{month}/{year}', {lastnumber})"""
        hethong.execute_custom(sql_insert)
    else:
        lastnumber = data[0]['LASTKEY'] + 1

    number_string = str(lastnumber).zfill(4)
    SOPC = f"PC-{number_string}-{month}/{year}"
    return {"SOPC": SOPC, "LastestPC": lastnumber}


@router.put("/hethong/phancong/SOPC")
def update_info_SOPC(data: ITEM_HETHONG) -> RESPONSE:
    SOPC = data.LASTNUMBER
    today = datetime.now()
    month = str(today.month).zfill(2)
    year = str(today.year)[2:]
    sql_insert = f"""UPDATE V1T4444 
                     SET LASTKEY = {SOPC}
                     WHERE TABLENAME = 'DONHANG'
                     AND KEYSTRING = 'PC--{month}/{year}'"""
    return hethong.execute_custom(sql_insert)
