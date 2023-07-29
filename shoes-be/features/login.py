from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class LOGIN(BaseClass):
    def __init__(self):
        super().__init__("DMNHANVIEN")


LG = LOGIN()


@router.post("/login")
def read(data: dict) -> RESPONSE_LOGIN:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    print(data)
    user = data["username"]
    pwd = data["password"]
    sql = f"SELECT MANVIEN, MATKHAU FROM DMNHANVIEN where MANVIEN COLLATE SQL_Latin1_General_CP1_CS_AS ='{user}' AND MATKHAU COLLATE SQL_Latin1_General_CP1_CS_AS ='{pwd}'"
    data =  LG.read_custom(sql)
    if len(data) > 0:
        return {"exist": True}
    else:
        return {"exist": False}
    
@router.post("/access")
def read(data: dict) -> RESPONSE_ACCESS:
    print(data)
    user = data["username"]
    sql = f"SELECT MAFORM, TENFORM, THEM, SUA, XOA, XEM, \"IN\" FROM PHANQUYEN where MANVIEN COLLATE SQL_Latin1_General_CP1_CS_AS ='{user}'"
    return LG.read_custom(sql)


@router.put("/changepassword")
def update(data: dict) -> RESPONSE:
    data = dict(data)
    val = f"MATKHAU = '{data['newpassword']}'"
    condition = f"MANVIEN COLLATE SQL_Latin1_General_CP1_CS_AS = '{data['username']}'"
    return LG.update(val, condition)

@router.post("/existuser")
def read(data: dict) -> RESPONSE_EXISTUSER:
    data = dict(data)
    sql = f"SELECT MANVIEN FROM DMNHANVIEN where MANVIEN COLLATE SQL_Latin1_General_CP1_CS_AS ='{data['username']}'"
    data = LG.read_custom(sql)
    if len(data) > 0:
        return {"exist": True}
    else:
        return {"exist": False}

@router.post("/register")
def update(data: dict) -> RESPONSE:
    data = dict(data)
    val = f"MATKHAU = '{data['password']}'"
    condition = f"MANVIEN COLLATE SQL_Latin1_General_CP1_CS_AS = '{data['username']}'"
    return LG.update(val, condition)