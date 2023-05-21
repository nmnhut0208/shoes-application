from typing import List, Union
from pydantic import BaseModel
from typing import Optional


class RESPONSE_KHOHANG(BaseModel):
    MAKHO: str
    TENKHO: str
    GHICHU: str


class RESPONSE_MUI(BaseModel):
    MAMUI: str
    TENMUI: str
    GHICHU: str


class RESPONSE_DE(BaseModel):
    MADE: str
    TENDE: str
    DONGIA: str
    GHICHU: str


class RESPONSE_CA(BaseModel):
    MACA: str
    TENCA: str
    GHICHU: str


class RESPONSE_NHANVIEN(BaseModel):
    MANVIEN: str
    TENNVIEN: str
    LOAINVIEN: str
    GHICHU: str


class RESPONSE_KYTINHLUONG(BaseModel):
    MAKY: str
    TENKY: str
    TUNGAY: str
    DENNGAY: str


class RESPONSE_SUON(BaseModel):
    MASUON: str
    TENSUON: str
    MAGOT: Optional[str] = None
    TENGOT: Optional[str] = None
    MAMUI: Optional[str] = None
    TENMUI: Optional[str] = None
    GHICHU: Optional[str] = None
    HINHANH: Optional[str] = None

class RESPONSE_GIAOHANG(BaseModel):
    SODH: str
    NGAYDH: str
    NGAYGH: str
    DIENGIAIPHIEU: str
    SOLUONGCONLAI: str


class RESPONSE(BaseModel):
    status: str
