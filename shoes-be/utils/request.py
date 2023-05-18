from typing import List, Union
from pydantic import BaseModel
from typing import Optional


class ITEM_KHOHANG(BaseModel):
    MAKHO: str
    TENKHO: str
    GHICHU: str


class ITEM_MUI(BaseModel):
    MAMUI: str
    TENMUI: str
    GHICHU: str


class ITEM_DE(BaseModel):
    MADE: str
    TENDE: str
    DONGIA: str
    GHICHU: str


class ITEM_CA(BaseModel):
    MACA: str
    TENCA: str
    GHICHU: str


class ITEM_NHANVIEN(BaseModel):
    MANVIEN: str
    TENNVIEN: str
    LOAINVIEN: str
    GHICHU: str


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
    HANH: Optional[str] = ""
    GHICHU: Optional[str] = ""
