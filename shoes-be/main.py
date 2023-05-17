from fastapi import FastAPI, Depends
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pyodbc
import pandas as pd
from features.khohang import router as router_khohang
from features.mui import router as router_mui
from features.de import router as router_de
from features.ca import router as router_ca
from features.nhanvien import router as router_nhanvien
from features.kytinhluong import router as router_kytinhluong

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
