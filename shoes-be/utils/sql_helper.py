import pyodbc
import pymssql
import pandas as pd

conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}',
                      server="MINH\SQLEXPRESS",
                      #   server="DESKTOP-GT3LP7K\SQLEXPRESS",
                      database="PT",
                      trusted_connection="yes",
                      mars_connection="yes")

cursor = conn.cursor()


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
