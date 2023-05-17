import pyodbc
import pandas as pd

conn = pyodbc.connect(driver="SQL Server", server="MINH\SQLEXPRESS",
                      database="PT",
                      trusted_connection="yes")
cursor = conn.cursor()

sql = "SELECT * FROM DMKHO"

# df = pd.read_sql(sql, conn)

# for index, row in df.iterrows():
#     print(index, row['MAKHO'], row['TENKHO'], row['GHICHU'])

cursor.execute(sql)

# delete one row with index
# cursor.execute("DELETE FROM DMKHO WHERE MAKHO = 'KHO01'")