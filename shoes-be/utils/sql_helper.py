import pyodbc
import pandas as pd
from functools import wraps
from fastapi import Request, HTTPException
from utils.vietnamese import convert_vni_to_unicode, check_need_convert
from datetime import datetime

authenticate_User = ["nhutnm123456", "thuntk123456"]


def execute_database(sql, action_type='read'):
    print("sql: ", sql)
    conn = pyodbc.connect(
                            driver="{ODBC Driver 17 for SQL Server}",
                            # server="DESKTOP-GT3LP7K\SQLEXPRESS",
                            # server="WIN10",
                            # database="PTMain",
                            server="MINH\SQLEXPRESS",
                            database="PT",
                        # driver='SQL Server Native Client 10.0',
                        # server="PC-SERVER-PC\SQLEXPRESS2008",
                        # database="PTMain",
                          trusted_connection="yes",
                          mars_connection="yes")
    cursor = conn.cursor()
    cursor.execute(sql)
    if action_type == 'read':
        data = pd.read_sql(sql, conn)
        conn.close()
        # convert vni to unicode string
        for col in data.columns:
            if check_need_convert(col):
                data[col] = data.apply(
                    lambda x: convert_vni_to_unicode(x[col]), axis=1)

        return data
    else:
        conn.commit()
        conn.close()


def read_sql(tbn: str) -> pd.DataFrame:
    sql = f"SELECT * FROM {tbn}"
    data = execute_database(sql)
    return data


def read_sql_custom(sql: str) -> pd.DataFrame:
    data = execute_database(sql)
    return data


def execute_custom(sql: str) -> pd.DataFrame:
    execute_database(sql, action_type='custom')


def insert_sql(tbn: str, col: str, val: str) -> None:
    sql = f"INSERT INTO {tbn} ({col}) VALUES ({val})"
    execute_database(sql, action_type='insert')


def insert_many_records_sql(tbn: str, col: str, val: str) -> None:
    sql = f"INSERT INTO {tbn} ({col}) VALUES {val}"
    execute_database(sql, action_type='insert')


def update_sql(tbn: str, val: str, condition: str) -> None:
    sql = f"UPDATE {tbn} SET {val} WHERE {condition}"
    execute_database(sql, action_type='update')


def delete_sql(tbn: str, condition: str) -> None:
    sql = f"DELETE FROM {tbn} WHERE {condition}"
    execute_database(sql, action_type='delete')


def user_access(f):
    @wraps(f)
    def decorator(request: Request, *args, **kwargs):
        if request.headers.get("x-access-tokens", None) not in authenticate_User:
            raise HTTPException(
                status_code=401, detail="Invalid client secret")
        return f(request=request, *args, **kwargs)

    return decorator
