import pyodbc
import pandas as pd


def read_sql(tbn: str) -> pd.DataFrame:
    conn = pyodbc.connect(driver="SQL Server",
                          #   server="MINH\SQLEXPRESS",
                          server="DESKTOP-GT3LP7K\SQLEXPRESS",
                          database="PT",
                          trusted_connection="yes")
    cursor = conn.cursor()
    sql = f"SELECT * FROM {tbn}"
    df = pd.read_sql(sql, conn)
    conn.close()
    return df


def read_sql_custom(sql: str) -> pd.DataFrame:
    conn = pyodbc.connect(driver="SQL Server",
                          #   server="MINH\SQLEXPRESS",
                          server="DESKTOP-GT3LP7K\SQLEXPRESS",
                          database="PT",
                          trusted_connection="yes")

    cursor = conn.cursor()
    df = pd.read_sql(sql, conn)
    conn.close()
    return df


def insert_sql(tbn: str, col: str, val: str) -> None:
    conn = pyodbc.connect(driver="SQL Server",
                          #   server="MINH\SQLEXPRESS",
                          server="DESKTOP-GT3LP7K\SQLEXPRESS",
                          database="PT",
                          trusted_connection="yes")

    cursor = conn.cursor()
    sql = f"INSERT INTO {tbn} ({col}) VALUES ({val})"
    cursor.execute(sql)
    conn.commit()
    conn.close()


def update_sql(tbn: str, val: str, condition: str) -> None:
    conn = pyodbc.connect(driver="SQL Server",
                          #   server="MINH\SQLEXPRESS",
                          server="DESKTOP-GT3LP7K\SQLEXPRESS",
                          database="PT",
                          trusted_connection="yes")

    cursor = conn.cursor()
    sql = f"UPDATE {tbn} SET {val} WHERE {condition}"
    cursor.execute(sql)
    conn.commit()
    conn.close()


def delete_sql(tbn: str, condition: str) -> None:
    conn = pyodbc.connect(driver="SQL Server",
                          #   server="MINH\SQLEXPRESS",
                          server="DESKTOP-GT3LP7K\SQLEXPRESS",
                          database="PT",
                          trusted_connection="yes")

    cursor = conn.cursor()
    sql = f"DELETE FROM {tbn} WHERE {condition}"
    cursor.execute(sql)
    conn.commit()
    conn.close()
