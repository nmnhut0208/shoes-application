from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from features.khohang import router as router_khohang
from features.mui import router as router_mui
from features.de import router as router_de
from features.ca import router as router_ca
from features.nhanvien import router as router_nhanvien
from features.kytinhluong import router as router_kytinhluong
from features.giay import router as router_giay
from features.mau import router as router_mau
from features.suon import router as router_suon
from features.got import router as router_got
from features.quai import router as router_quai
from features.khachhang import router as router_khachhang
from features.giaohang import router as router_giaohang
from features.donhang import router as router_donhang
from features.chamcong import router as router_chamcong
from features.hethong import router as router_hethong
from features.phancong import router as router_phancong
from features.congno import router as router_congno
from features.tv_giaohang import router as router_tv_giaohang
from features.tv_thuchi import router as router_tv_thuchi
from features.login import router as router_login
from features.phanquyen import router as router_phanquyen
from features.tv_chamcong import router as router_tv_chamcong

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    router_khohang, tags=["Kho Hàng"])

app.include_router(
    router_mui, tags=["Mũi"])

app.include_router(
    router_de, tags=["Đế"])

app.include_router(
    router_ca, tags=["Cá"])

app.include_router(
    router_nhanvien, tags=["Nhân Viên"])

app.include_router(
    router_kytinhluong, tags=["Kỳ Tính Lương"])

app.include_router(
    router_giay, tags=["Giày"])

app.include_router(
    router_mau, tags=["Màu"])

app.include_router(
    router_suon, tags=["Sườn"])

app.include_router(
    router_got, tags=["Gót"])

app.include_router(
    router_quai, tags=["Quai"])

app.include_router(
    router_khachhang, tags=["Khách Hàng"])

app.include_router(
    router_giaohang, tags=["Giao Hàng"])

app.include_router(
    router_donhang, tags=["Đơn Hàng"])

app.include_router(
    router_chamcong, tags=["Chấm Công"])

app.include_router(
    router_phancong, tags=["Thông Tin Phân Công"])

app.include_router(
    router_hethong, tags=["Thông Tin Hệ Thống"])

app.include_router(
    router_tv_giaohang, tags=["TV Giao Hàng"])

app.include_router(
    router_tv_thuchi, tags=["TV Thu Chi"])

app.include_router(
    router_login, tags=["Login"])

app.include_router(
    router_phanquyen, tags=["Phân Quyền"])

app.include_router(
    router_tv_chamcong, tags=["TV Chấm Công"])

app.include_router(
    router_congno, tags=["Công nợ"])
