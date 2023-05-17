from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *
from datetime import datetime

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
    # print(data)
    col = ", ".join(data.keys())
    val = ", ".join([f"'{value}'" for value in data.values()])
    return KTL.add(col, val)


@router.put("/kytinhluong")
def update(data: ITEM_KYTINHLUONG) -> RESPONSE:
    data = dict(data)
    print(data)
    data["TUNGAY"] = data["TUNGAY"].replace("T", " ")
    data["DENNGAY"] = data["DENNGAY"].replace("T", " ")
    data["TUNGAY"] = datetime.strptime(data["TUNGAY"], "%Y-%m-%d %H:%M:%S")
    data["DENNGAY"] = datetime.strptime(
        data["DENNGAY"], "%Y-%m-%d %H:%M:%S")
    val = ", ".join([f"{key} = '{value}'" for key, value in data.items()])
    condition = f"MAKY = '{data['MAKY']}'"
    return KTL.update(val, condition)


@router.delete("/kytinhluong")
def delete(data: ITEM_KYTINHLUONG) -> RESPONSE:
    data = dict(data)
    condition = f"MAKY = '{data['MAKY']}'"
    return KTL.delete(condition)
