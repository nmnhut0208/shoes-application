from datetime import datetime

def get_datetime_now():
    now = datetime.now()
    return f"{now.year}-{now.month:02}-{now.day:02} 00:00:00.000"