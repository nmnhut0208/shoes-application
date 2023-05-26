import pyodbc
import pandas as pd



def execute_database(sql, action_type='read'):
    conn = pyodbc.connect(driver='{ODBC Driver 17 for SQL Server}',
                          #   server="MINH\SQLEXPRESS",
                          server="DESKTOP-GT3LP7K\SQLEXPRESS",
                          database="PT",
                          trusted_connection="yes",
                          mars_connection="yes")


    cursor = conn.cursor()
    cursor.execute(sql)
    if action_type == 'read':
        data = pd.read_sql(sql, conn)
        conn.close()
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
    print("sql: ", sql)
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
