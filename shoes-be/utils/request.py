from typing import List, Union
from pydantic import BaseModel
from typing import Optional


class ITEM_KHOHANG(BaseModel):
    MAKHO: str
    TENKHO: str
    GHICHU: str = None


class ITEM_MUI(BaseModel):
    MAMUI: str
    TENMUI: str
    GHICHU: str = None


class ITEM_DE(BaseModel):
    MADE: str
    TENDE: str
    DONGIA: str
    GHICHU: str


class ITEM_CA(BaseModel):
    MACA: str
    TENCA: str
    GHICHU: str = None


class ITEM_NHANVIEN(BaseModel):
    MANVIEN: str
    TENNVIEN: str
    LOAINVIEN: str
    GHICHU: str = None


class ITEM_KYTINHLUONG(BaseModel):
    MAKY: str
    TENKY: str
    TUNGAY: str
    DENNGAY: str


class ITEM_MAU(BaseModel):
    MAMAU: str
    TENMAU: str
    GHICHU: str


class ITEM_SUON(BaseModel):
    MASUON: str
    TENSUON: str
    MAGOT: str
    MAMUI: str
    HINHANH: Optional[str] = ""
    GHICHU: Optional[str] = ""

class ITEM_PHANQUYEN(BaseModel):
    MANVIEN: str
    MAFORM: str
    TENFORM: str
    THEM: Optional[int] = 0
    SUA: Optional[int] = 0
    XOA: Optional[int] = 0
    XEM: Optional[int] = 0
    IN: Optional[int] = 0