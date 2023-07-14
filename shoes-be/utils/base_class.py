from utils.sql_helper import *


class BaseClass:
    def __init__(self, table_name: str):
        self.table_name = table_name

    def read(self):
        df = read_sql(self.table_name)
        print(df)
        return df.to_dict(orient="records")

    def read_custom(self, sql: str):
        df = read_sql_custom(sql)
        return df.to_dict(orient="records")
    
    def read_custom_congno(self, sql: str):
        return read_sql_custom(sql)
    
    def execute_custom(self, sql: str):
        execute_custom(sql)
        return {"status": "success"}

    def add(self, col: str, val: str):
        insert_sql(self.table_name, col, val)
        return {"status": "success"}
    
    def add_with_table_name(self, table_name: str, col: str, val: str):
        insert_sql(table_name, col, val)
        return {"status": "success"}
    
    def add_many(self, col: str, val: str):
        insert_many_records_sql(self.table_name, col, val)
        return {"status": "success"}

    def update(self, val: str, condition: str):
        update_sql(self.table_name, val, condition)
        return {"status": "success"}

    def delete(self, condition: str):
        delete_sql(self.table_name, condition)
        return {"status": "success"}
