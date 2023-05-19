# from DONHANG
# from fastapi import APIRouter
# from utils.base_class import BaseClass
# from utils.request import *
# from utils.response import *

# from pydantic import BaseModel
# from typing import Optional


# class ITEM_DONHANG(BaseModel):
#     MADONG: str
#     MADH: str
#     SODH: str
#     MAKH: str
#     NGAYDH: str
#     NGAYGH: str
#     DIENGIAIPHIEU: str
#     MAGIAY: str
#     SIZE5: int
#     SIZE6: int
#     SIZE7: int
#     SIZE9: int
#     SIZE8: int
#     Size0: int
#     GIABAN: int
#     THANHTIEN: int
#     DIENGIAIDONG: str
#     # NGUOITAO: str
#     # NGAYTAO: str
#     # NGUOISUA: str
#     # NGAYSUA: str
#     MAUDE: str
#     MAUGOT: str
#     MAUSUON: str
#     MAUCA: str
#     MAUQUAI: str
#     DAPHANCONG: int
#     GIALE: int
#     INHIEU: Optional[str] = None
#     TRANGTRI: Optional[str] = None
#     GHICHU: Optional[str] = None


# class RESPONSE_GIAYTHEOKHACHHANG(BaseModel):
#     MADONG: str
#     MADH: str
#     SODH: str
#     MAKH: str
#     NGAYDH: str
#     NGAYGH: str
#     DIENGIAIPHIEU: str
#     MAGIAY: str
#     SIZE5: int
#     SIZE6: int
#     SIZE7: int
#     SIZE9: int
#     SIZE8: int
#     Size0: int
#     GIABAN: int
#     THANHTIEN: int
#     DIENGIAIDONG: str
#     # NGUOITAO: str
#     # NGAYTAO: str
#     # NGUOISUA: str
#     # NGAYSUA: str
#     MAUDE: str
#     MAUGOT: str
#     MAUSUON: str
#     MAUCA: str
#     MAUQUAI: str
#     DAPHANCONG: int
#     GIALE: int
#     INHIEU: Optional[str] = None
#     TRANGTRI: Optional[str] = None
#     GHICHU: Optional[str] = None


# router = APIRouter()


# class GIAY(BaseClass):
#     def __init__(self):
#         super().__init__("DMGIAY")


# giay = GIAY()


# @router.get("/giay")
# def read() -> List[RESPONSE_GIAYTHEOKHACHHANG]:
#     sql = """SELECT DISTINCT SORTID,V_GIAY.MAGIAY,V_GIAY.TENGIAY,MAUDE,MAUGOT, 
# 			MAUSUON,MAUCA,MAUQUAI ,DONHANG.MAKH, 
# 			V_GIAY.DONGIA, V_GIAY.DONGIAQUAI, V_GIAY.TENCA, V_GIAY.TENKH
#             FROM DONHANG 
#             LEFT JOIN V_GIAY on V_GIAY.magiay=DONHANG.magiay
#             """
#     return giay.read_custom(sql)


# # @router.post("/giay")
# # def add(data: ITEM_GIAY) -> RESPONSE:
# #     data = dict(data)
# #     col = []
# #     val = []
# #     for k, v in data.items():
# #         if v is not None:
# #             col.append(k)
# #             val.append(f"'{v}'")
# #     col = " ,".join(col)
# #     val = " ,".join(val)
# #     return giay.add(col, val)


# # @router.put("/giay")
# # def update(data: ITEM_GIAY) -> RESPONSE:
# #     data = dict(data)
# #     val = ", ".join([f"{key} = '{value}'" for key,
# #                     value in data.items() if value is not None])

# #     condition = f"MAGIAY = '{data['MAGIAY']}'"
# #     return giay.update(val, condition)


# # @router.delete("/giay")
# # def delete(data: ITEM_GIAY) -> RESPONSE:
# #     data = dict(data)
# #     condition = f"MAGIAY = '{data['MAGIAY']}'"
# #     return giay.delete(condition)
