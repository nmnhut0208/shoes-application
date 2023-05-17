from utils.sql_helper import *


class BaseClass:
    def __init__(self, table_name: str):
        self.table_name = table_name

    def read(self):
        df = read_sql(self.table_name)
        return df.to_dict(orient="records")

    def read_custom(self, sql: str):
        df = read_sql_custom(sql)
        return df.to_dict(orient="records")

    def add(self, col: str, val: str):
        insert_sql(self.table_name, col, val)
        return {"status": "success"}

    def update(self, val: str, condition: str):
        update_sql(self.table_name, val, condition)
        return {"status": "success"}

    def delete(self, condition: str):
        delete_sql(self.table_name, condition)
        return {"status": "success"}