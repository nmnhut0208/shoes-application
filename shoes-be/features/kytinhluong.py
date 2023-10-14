from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime, timedelta

router = APIRouter()


class KYTINHLUONG(BaseClass):
    def __init__(self):
        super().__init__("DMKYTINHLUONG")


KTL = KYTINHLUONG()


@router.get("/kytinhluong")
def read() -> RESPONSE_KYTINHLUONG:
    return KTL.read()


@router.post("/kytinhluong")
def add(data: ITEM_KYTINHLUONG) -> RESPONSE:
    data = dict(data)
    data["TUNGAY"] += " 00:00:00.000"
    data["DENNGAY"] += " 00:00:00.000"
    data["TUNGAY"] = datetime.strptime(data["TUNGAY"], "%d-%m-%Y %H:%M:%S.%f")
    data["DENNGAY"] = datetime.strptime(
        data["DENNGAY"], "%d-%m-%Y %H:%M:%S.%f")
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return KTL.add(col, val)


@router.put("/kytinhluong")
def update(data: ITEM_KYTINHLUONG) -> RESPONSE:
    data = dict(data)
    data["TUNGAY"] = data["TUNGAY"].replace("T", " ")
    data["DENNGAY"] = data["DENNGAY"].replace("T", " ")
    data["TUNGAY"] = datetime.strptime(data["TUNGAY"], "%Y-%m-%d %H:%M:%S")
    data["DENNGAY"] = datetime.strptime(
        data["DENNGAY"], "%Y-%m-%d %H:%M:%S")
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAKY = '{data['MAKY']}'"
    return KTL.update(val, condition)


@router.delete("/kytinhluong")
def delete(ID: str) -> RESPONSE:
    condition = f"MAKY = '{ID}'"
    return KTL.delete(condition)

@router.get("/kytinhluong/update_tenky")
def update_tenky() -> RESPONSE:
    cur_sql = f"SELECT MAKY, TENKY FROM DMKYTINHLUONG"
    cur_ktl = KTL.read_custom(cur_sql)
    # tbn = "DMKYTINHLUONG"
    new_year = datetime.now().year
    start_date = datetime.strptime(f"{new_year}-01-01 00:00:00", "%Y-%m-%d %H:%M:%S")
    start_dates = [start_date + timedelta(weeks=i) for i in range(52)]
    end_dates = [start_date + timedelta(weeks=i+1) for i in range(52)]

    # update new year for TENKY 
    for i, item in enumerate(cur_ktl):
        tenky = item["TENKY"]
        tenky = tenky.split("/")
        new_tenky = f"{tenky[0]}/{new_year}"
        new_start_date = start_dates[i].strftime("%Y-%m-%d %H:%M:%S")
        new_end_date = end_dates[i].strftime("%Y-%m-%d %H:%M:%S")
        val = f"TENKY = '{new_tenky}', TUNGAY = '{new_start_date}', DENNGAY = '{new_end_date}'"
        condition = f"MAKY = '{item['MAKY']}'"
        KTL.update(val, condition)
    return {"status": "success"}

