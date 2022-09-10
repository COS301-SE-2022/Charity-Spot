import psycopg2
import random

import datetime
import calendar

from sklearn import preprocessing
import numpy as np

#Org ID = 1,2,..,n

#Day of the week = 1,2,3,4,5,6,7

#Type of the item donated:
    # 1 = clothes
    # 2 = food
    # 3 = stationary
    # 4 = toiletries
    # 5 = household utensils
    # 6 = technology
    # 7 = furniture

#Location of the donation
    # 1 = Pretoria
    # 2 = Johannesburg
    # 3 = Cape Town
    # 4 = Bloemfontein
    # 5 = Polokwane
    # 6 = Durban

#Location of the donation new
    # 1 = Gauteng
    # 2 = KwaZulu-Natal
    # 3 = Limpopo
    # 4 = Western Cape

#Month = 1,2,3,4,5,6,7,8,9,10,11,12

#Weather
    # 1 = Sunny
    # 2 = Rain
    # 3 = Cloudy

orgID_array = np.array([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
normalized_OrgID = np.linalg.norm(orgID_array)
normalized_OrgID = orgID_array/normalized_OrgID

f1 = open("../NeuralNetwork/normalizedOrgID.txt","w")

for i in range(0,len(normalized_OrgID)):
        f1.write(str(orgID_array[i]) + "," + str(normalized_OrgID[i]) + '\n')


dayOfWeek_array = np.array([1,2,3,4,5,6,7])
normalized_dayOfWeek = np.linalg.norm(dayOfWeek_array)
normalized_dayOfWeek = dayOfWeek_array/normalized_dayOfWeek 

f2 = open("../NeuralNetwork/normalizedDOW.txt","w")

for i in range(0,len(dayOfWeek_array)):
        f2.write(str(dayOfWeek_array[i]) + "," + str(normalized_dayOfWeek[i]) + '\n')


typeOfItem_array = np.array([1,2,3,4,5,6,7])
normalized_typeOfItem = np.linalg.norm(typeOfItem_array)
normalized_typeOfItem = typeOfItem_array/normalized_typeOfItem

f3 = open("../NeuralNetwork/normalizedTOI.txt","w")

for i in range(0,len(typeOfItem_array)):
        f3.write(str(typeOfItem_array[i]) + "," + str(normalized_typeOfItem[i]) + '\n')


location_array = np.array([1,2,3,4,5,6])
normalized_location = np.linalg.norm(location_array)
normalized_location = location_array/normalized_location

f4 = open("../NeuralNetwork/normalizedLOC.txt","w")

for i in range(0,len(location_array)):
        f4.write(str(location_array[i]) + "," + str(normalized_location[i]) + '\n')




month_array = np.array([1,2,3,4,5,6,7,8,9,10,11,12])
normalized_month = np.linalg.norm(month_array)
normalized_month = month_array/normalized_month

f5 = open("../NeuralNetwork/normalizedMON.txt","w")

for i in range(0,len(month_array)):
        f5.write(str(month_array[i]) + "," + str(normalized_month[i]) + '\n')


weather_array = np.array([1,2,3])
normalized_weather = np.linalg.norm(weather_array)
normalized_weather = weather_array/normalized_weather

f6 = open("../NeuralNetwork/normalizedWEA.txt","w")

for i in range(0,len(weather_array)):
        f6.write(str(weather_array[i]) + "," + str(normalized_weather[i]) + '\n')



#f1 = open("../NeuralNetwork/normalizedVal.txt","w")

#for i in range(0,len(orgID_array)):
        #f1.write(str(i+1) + "," + str(normalized_OrgID[0][i]) + '\n')


charID = []
charIDR = []

def createInfoFile():

    fI = open("../NeuralNetwork/charID.txt","w")

    for i in range(0,len(charID)):
        #print(i)
        fI.write(str(charID[i]) + "," + str(charIDR[i]) + '\n')

def getRandID(ID):

    for i in range(0,len(charID)):
        if charID[i] == ID:
            return charIDR[i]

    return 0

def getNormalizedVal(val, type):

    if(type == "ID"):
        return normalized_OrgID[int(val)-1]

    if(type == "DayOfW"):
        return normalized_dayOfWeek[int(val)-1]

    if(type == "TypeOfI"):
        return normalized_typeOfItem[int(val)-1]

    if(type == "LocOfI"):
        return normalized_location[int(val)-1]
    
    if(type == "Month"):
        return normalized_month[int(val)-1]

    if(type == "Weather"):
        return normalized_weather[int(val)-1]

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

    org = str((orgID))

    #dayOfWeek = random.randint(1,7)
    #if dayOfWeek == int(day_of_week):
     #   if(dayOfWeek == 7):
      #      dayOfWeek -= 1
       # else:
        #    dayOfWeek += 1
    dayOfWeek = str(getNormalizedVal(1, "DayOfW"))

    typeOfItem = random.randint(1,6)
    if typeOfItem == int(item_type):
        if(typeOfItem == 6):
            typeOfItem -= 1
        else:
            typeOfItem += 1

    typeOfItem = str(getNormalizedVal(typeOfItem, "TypeOfI"))

    loc = random.randint(1,6)
    if loc == int(location):
        if(loc == 6):
            loc -= 1
        else:
            loc += 1

    loc = str(getNormalizedVal(loc, "LocOfI"))

    
   # month_N = random.randint(1,12)
    #if month_N == int(month):
     #   if(month_N == 12):
      #      month_N -= 1
       # else:
        #    month_N += 1
    month_N = str(getNormalizedVal(1, "Month"))

    #Weather = random.randint(1,3)
    Weather = str(getNormalizedVal(1, "Weather"))

    return org + "," + str(dayOfWeek) + "," + str(typeOfItem) + "," + str(loc) + "," + str(month_N) + "," + str(Weather) + ',0'


try:
    f = open("../NeuralNetwork/donationsData.txt","w")

    connection = psycopg2.connect(user="seal_team",
                                  password="seal_team",
                                  host="localhost",
                                  port="5432",
                                  database="main")

    cursor = connection.cursor()

    postgres_select_query = "SELECT org_id, dono_date, dono_loc, type FROM public.donation_item;"
    cursor.execute(postgres_select_query)

    row = cursor.fetchone()

    #charID = []

    while row is not None:

        #print(random.uniform(0, 1))

        if not row[0] in charID:
            charID.append(row[0])
            charIDR.append(random.uniform(0, 1))
        
        #orgID = str(getRandID(row[0]))
        orgID = row[0] 
        dayOfWeek = str(getNormalizedVal(findDay(row[1] + ",2022"), "DayOfW"))
        item_type = str(getNormalizedVal(findItemType(row[3]), "TypeOfI"))
        location = str(getNormalizedVal(findLoc(row[2]), "LocOfI"))
        weather = str(getNormalizedVal(1, "Weather"))
        day, month = row[1].split(',')
        monthN = str(getNormalizedVal(month, "Month"))

        realDono = orgID + "," + dayOfWeek + "," + item_type + "," + location + "," + monthN + ","+weather+",1"
        f.write(realDono + '\n')

        for i in range(0,2):
            fakeDono = createFakeDonation(row[0], findDay(row[1] + ",2022"), findItemType(row[3]), findLoc(row[2]), month)
            f.write(fakeDono + '\n')

        row = cursor.fetchone()

except (Exception, psycopg2.Error) as error:
    print("Failed", error)

finally:
    # closing database connection.
    createInfoFile()
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")