from fastapi import APIRouter
from utils.base_class import BaseClass
from utils.request import *
from utils.response import *

router = APIRouter()


class TVTHUCHI(BaseClass):
    def __init__(self):
        super().__init__("V_CNCHITIET")


TVTC = TVTHUCHI()


@router.get("/tv_thuchi")
def read() -> RESPONSE_TVTHUCHI:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = """SELECT SOPHIEU, NGAYPHIEU, MAKH, TENKH, SODUCUOI, DIENGIAIPHIEU 
              FROM V_CNCHITIET"""
    return TVTC.read_custom(sql)

@router.get("/tv_thu")
def read() -> RESPONSE_TVTHUCHI:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = f"""SELECT SOPHIEU, NGAYPHIEU, CONGNO.MAKH, 
                     TENKH, THANHTIEN AS SODUCUOI, DIENGIAIPHIEU 
                     FROM CONGNO 
                     inner join DMKHACHHANG on DMKHACHHANG.MAKH = CONGNO.MAKH
                     WHERE LOAIPHIEU='PT'
    """
    return TVTC.read_custom(sql)

@router.get("/tv_chi")
def read() -> RESPONSE_TVTHUCHI:
    # return KH.read()
    # sql = "SELECT MADE, TENDE, DONGIA, GHICHU FROM DMDE"
    sql = """SELECT SOPHIEU, NGAYPHIEU, MAKH, TENKH, SODUCUOI, DIENGIAIPHIEU 
              FROM V_CNCHITIET WHERE LOAIPHIEU='PC'
              """
    return TVTC.read_custom(sql)


