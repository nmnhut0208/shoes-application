from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Body, FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pyodbc
import pandas as pd
from request import *
from response import *

app = FastAPI()

conn = pyodbc.connect(driver="SQL Server", server="MINH\SQLEXPRESS",
                      database="PT",
                      trusted_connection="yes")
cursor = conn.cursor()


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def read_sql(tbn: str) -> pd.DataFrame:
    sql = f"SELECT * FROM {tbn}"
    df = pd.read_sql(sql, conn)
    return df


def read_sql_custom(sql: str) -> pd.DataFrame:
    df = pd.read_sql(sql, conn)
    return df


def insert_sql(tbn: str, col: str, val: str) -> None:
    sql = f"INSERT INTO {tbn} ({col}) VALUES ({val})"
    cursor.execute(sql)
    conn.commit()


def update_sql(tbn: str, val: str, condition: str) -> None:
    sql = f"UPDATE {tbn} SET {val} WHERE {condition}"
    cursor.execute(sql)
    conn.commit()


def delete_sql(tbn: str, condition: str) -> None:
    sql = f"DELETE FROM {tbn} WHERE {condition}"
    cursor.execute(sql)
    conn.commit()


@app.get("/read_kho_hang")
def read_kho_hang() -> RESPONSE_KHOHANG:
    table_name = "DMKHO"
    df = read_sql(table_name)
    return df.to_dict(orient="records")


@app.post("/add_kho_hang")
def add_kho_hang(data: ITEM_KHOHANG) -> RESPONSE:
    table_name = "DMKHO"
    col = "MAKHO, TENKHO, GHICHU"
    val = f"'{data['MAKHO']}', '{data['TENKHO']}', '{data['GHICHU']}'"
    insert_sql(table_name, col, val)
    return {"status": "success"}


@app.post("/update_kho_hang")
def update_kho_hang(data: ITEM_KHOHANG) -> RESPONSE:
    table_name = "DMKHO"
    val = f"TENKHO = '{data['TENKHO']}', GHICHU = '{data['GHICHU']}'"
    condition = f"MAKHO = '{data['MAKHO']}'"
    update_sql(table_name, val, condition)
    return {"status": "success"}


@app.post("/delete_kho_hang")
def delete_kho_hang(data: ITEM_KHOHANG) -> RESPONSE:
    table_name = "DMKHO"
    condition = f"MAKHO = '{data['MAKHO']}'"
    delete_sql(table_name, condition)
    return {"status": "success"}


@app.get("/read_mui")
def read_mui() -> dict:
    table_name = "DMMUI"
    df = read_sql(table_name, "MAMUI, TENMUI, GHICHU")
    df = df.rename(columns={"MAMUI": "Mã Mũi",
                   "TENMUI": "Tên Mũi", "GHICHU": "Ghi chú"})
    return df.to_dict(orient="records")


@app.post("/add_mui")
def add_mui(data: ITEM_KHOHANG) -> dict:
    data["MAMUI"] = data.pop("Mã Mũi")
    data["TENMUI"] = data.pop("Tên Mũi")
    data["GHICHU"] = data.pop("Ghi chú")
    table_name = "DMMUI"
    col = "MAMUI, TENMUI, GHICHU"
    val = f"'{data['MAMUI']}', '{data['TENMUI']}', '{data['GHICHU']}'"
    insert_sql(table_name, col, val)
    return {"status": "success"}


@app.post("/update_mui")
def update_mui(data: dict) -> dict:
    data["MAMUI"] = data.pop("Mã Mũi")
    data["TENMUI"] = data.pop("Tên Mũi")
    data["GHICHU"] = data.pop("Ghi chú")
    table_name = "DMMUI"
    val = f"TENMUI = '{data['TENMUI']}', GHICHU = '{data['GHICHU']}'"
    condition = f"MAMUI = '{data['MAMUI']}'"
    update_sql(table_name, val, condition)
    return {"status": "success"}


@app.post("/delete_mui")
def delete_mui(data: dict) -> dict:
    data["MAMUI"] = data.pop("Mã Mũi")
    table_name = "DMMUI"
    condition = f"MAMUI = '{data['MAMUI']}'"
    delete_sql(table_name, condition)
    return {"status": "success"}


@app.get("/read_de")
def read_de() -> dict:
    table_name = "DMDE"
    df = read_sql(table_name, "MADE, TENDE, DONGIA, GHICHU")
    df = df.rename(columns={"MADE": "Mã Đế",
                   "TENDE": "Tên Đế", "DONGIA": "Đơn giá Đế", "GHICHU": "Ghi chú"})
    return df.to_dict(orient="records")


@app.post("/add_de")
def add_de(data: dict) -> dict:
    data["MADE"] = data.pop("Mã Đế")
    data["TENDE"] = data.pop("Tên Đế")
    data["DONGIA"] = data.pop("Đơn giá Đế")
    data["GHICHU"] = data.pop("Ghi chú")
    table_name = "DMDE"
    col = "MADE, TENDE, DONGIA, GHICHU"
    val = f"'{data['MADE']}', '{data['TENDE']}', '{data['DONGIA']}', '{data['GHICHU']}'"
    insert_sql(table_name, col, val)
    return {"status": "success"}


@app.post("/update_de")
def update_de(data: dict) -> dict:
    data["MADE"] = data.pop("Mã Đế")
    data["TENDE"] = data.pop("Tên Đế")
    data["DONGIA"] = data.pop("Đơn giá Đế")
    data["GHICHU"] = data.pop("Ghi chú")
    table_name = "DMDE"
    val = f"TENDE = '{data['TENDE']}', DONGIA = '{data['DONGIA']}', GHICHU = '{data['GHICHU']}'"
    condition = f"MADE = '{data['MADE']}'"
    update_sql(table_name, val, condition)
    return {"status": "success"}


@app.post("/delete_de")
def delete_de(data: dict) -> dict:
    data["MADE"] = data.pop("Mã Đế")
    table_name = "DMDE"
    condition = f"MADE = '{data['MADE']}'"
    delete_sql(table_name, condition)
    return {"status": "success"}
