import psycopg2
import random

import datetime
import calendar

def findDay(date):
    day, month, year = (int(i) for i in date.split(','))   
    dayNumber = calendar.weekday(year, month, day)
    return dayNumber+1
    #givenDate = datetime.datetime.strptime(date, '%d,%m,%Y').weekday()
    #return (calendar.day_name[born])

def findLoc(loc):

    locations = ["Pretoria", "Johannesburg", "Cape Town", "Bloemfontein", "Polokwane", "Durban"]

    for i in range(0, len(locations)):
        if(loc == locations[i]):
            return i+1

    return 0

def findItemType(item):

    locations = ["Pretoria", "Johannesburg", "Cape Town", "Bloemfontein", "Polokwane", "Durban"]

    for i in range(0, len(locations)):
        if(loc == locations[i]):
            return i+1

    return 0

try:
    connection = psycopg2.connect(user="seal_team",
                                  password="seal_team",
                                  host="localhost",
                                  port="5432",
                                  database="main")

    cursor = connection.cursor()

    postgres_delete_query = "SELECT org_id, dono_date, dono_loc, type FROM public.donation_item;"
    cursor.execute(postgres_delete_query)
    #connection.commit()

    row = cursor.fetchone()

    while row is not None:

        orgID = row[0] 
        date = row[1]
        location = str(findLoc(row[2]))
        item_type = row[3]

        print(orgID + " " + date + " " + location + " " + item_type)

        row = cursor.fetchone()

except (Exception, psycopg2.Error) as error:
    print("Failed", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")
 
# Driver program
date = '28,07,2022'
print(findDay(date))