import psycopg2
import random

import datetime
import calendar

def findDay(date):
    day, month, year = (int(i) for i in date.split(','))   
    dayNumber = calendar.weekday(year, month, day)
    return dayNumber+1

def findLoc(loc):

    locations = ["Pretoria", "Johannesburg", "Cape Town", "Bloemfontein", "Polokwane", "Durban"]

    for i in range(0, len(locations)):
        if(loc == locations[i]):
            return i+1

    return 0

def findItemType(item):

    items = ["CLOTHING", "FOOD", "STATIONARY", "HYGIENE", "KITCHEN", "FURNITURE"]

    for i in range(0, len(items)):
        if(item == items[i]):
            return i+1

    return 0

def createFakeDonation(orgID):

    org = orgID
    dayOfWeek = random.randint(1,7)
    typeOfItem = random.randint(1,4)
    loc = random.randint(1,3)
    month = random.randint(1,12)
    Weather = random.randint(1,3)

    return org + "," + str(dayOfWeek) + "," + str(typeOfItem) + "," + str(loc) + "," + str(month) + "," + str(Weather) + ',0'

try:
    f = open("donationsData.txt","w")

    connection = psycopg2.connect(user="seal_team",
                                  password="seal_team",
                                  host="localhost",
                                  port="5432",
                                  database="main")

    cursor = connection.cursor()

    postgres_select_query = "SELECT org_id, dono_date, dono_loc, type FROM public.donation_item;"
    cursor.execute(postgres_select_query)

    row = cursor.fetchone()

    while row is not None:

        orgID = row[0] 
        dayOfWeek = str(findDay(row[1] + ",2022"))
        item_type = str(findItemType(row[3]))
        location = str(findLoc(row[2]))
        day, month = row[1].split(',')

        realDono = orgID + "," + dayOfWeek + "," + item_type + "," + location + "," + month + ",1,1"
        fakeDono = createFakeDonation(orgID)

        f.write(realDono + '\n')
        f.write(fakeDono + '\n')

        row = cursor.fetchone()

except (Exception, psycopg2.Error) as error:
    print("Failed", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")