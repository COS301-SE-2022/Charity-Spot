import psycopg2
import random

import datetime
import calendar

from sklearn import preprocessing
import numpy as np

x_array = np.array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
normalized_arr = preprocessing.normalize([x_array])

fi = open("normalizedVal.txt","w")

for i in range(1,21):
    fi.write(str(i) + "," + str(normalized_arr[0][i-1]) + '\n')

def getNormalizedVal(val):
    return normalized_arr[0][int(val)-1]

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

def createFakeDonation(orgID, day_of_week, item_type, location, month):

    org = str(getNormalizedVal(orgID))

    #dayOfWeek = random.randint(1,7)
    #if dayOfWeek == int(day_of_week):
     #   if(dayOfWeek == 7):
      #      dayOfWeek -= 1
       # else:
        #    dayOfWeek += 1
    dayOfWeek = str(getNormalizedVal(1))

    typeOfItem = random.randint(1,6)
    if typeOfItem == int(item_type):
        if(typeOfItem == 6):
            typeOfItem -= 1
        else:
            typeOfItem += 1

    typeOfItem = str(getNormalizedVal(typeOfItem))

    loc = random.randint(1,6)
    if loc == int(location):
        if(loc == 6):
            loc -= 1
        else:
            loc += 1

    loc = str(getNormalizedVal(loc))

    
   # month_N = random.randint(1,12)
    #if month_N == int(month):
     #   if(month_N == 12):
      #      month_N -= 1
       # else:
        #    month_N += 1
    month_N = str(getNormalizedVal(1))

    #Weather = random.randint(1,3)
    Weather = str(getNormalizedVal(1))

    return org + "," + str(dayOfWeek) + "," + str(typeOfItem) + "," + str(loc) + "," + str(month_N) + "," + str(Weather) + ',0'

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

        orgID = str(getNormalizedVal(row[0])) 
        dayOfWeek = str(getNormalizedVal(findDay(row[1] + ",2022")))
        item_type = str(getNormalizedVal(findItemType(row[3])))
        location = str(getNormalizedVal(findLoc(row[2])))
        weather = str(getNormalizedVal(1))
        day, month = row[1].split(',')
        monthN = str(getNormalizedVal(month))

        realDono = orgID + "," + dayOfWeek + "," + item_type + "," + location + "," + monthN + ","+weather+",1"
        
        f.write(realDono + '\n')
        fakeDono = createFakeDonation(row[0], findDay(row[1] + ",2022"), findItemType(row[3]), findLoc(row[2]), month)
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