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


def find_info_primary_key(key, today):
    year = today.year
    sql = f"""select *
            from V1T4444
            Where TABLENAME='DONHANG'
            and KEYSTRING = '{key}{year}'"""
    data = hethong.read_custom(sql)
    lastnumber = 1
    if len(data) == 0:
        sql_insert = f"""INSERT INTO V1T4444 (TABLENAME, KEYSTRING, LASTKEY)
                        VALUES ('DONHANG', '{key}{year}', {lastnumber})"""
        hethong.execute_custom(sql_insert)
    else:
        lastnumber = data[0]['LASTKEY']
    return lastnumber


def save_info_primary_key(key, year, value):
    sql_insert = f"""UPDATE V1T4444 
                    SET LASTKEY = {value}
                    WHERE TABLENAME = 'DONHANG'
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
        lastnumber = data[0]['LASTKEY']

    number_string = str(lastnumber).zfill(4)
    SODH = f"DH-{number_string}-{month}/{year}"
    return {"SODH": SODH}


@router.put("/hethong/donhang/SODH")
def update_info_SODH(data: ITEM_HETHONG):
    print("sodh: ", data)
    sodh = data.LASTNUMBER + 1
    today = datetime.now()
    month = str(today.month).zfill(2)
    year = str(today.year)[2:]
    sql_insert = f"""UPDATE V1T4444 
                     SET LASTKEY = {sodh}
                     WHERE TABLENAME = 'DONHANG'
                     AND KEYSTRING = 'DH--{month}/{year}'"""
    hethong.execute_custom(sql_insert)
    return {"status": 200}

