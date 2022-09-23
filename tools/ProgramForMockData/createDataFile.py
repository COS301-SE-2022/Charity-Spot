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
    # 5 = Northern Cape
    # 6 = North West
    # 7 = Eastern Cape
    # 8 = Free State
    # 9 = Mpumalanga

#Month = 1,2,3,4,5,6,7,8,9,10,11,12

#Weather
    # 1 = Sunny
    # 2 = Rain
    # 3 = Cloudy


dayOfWeek_array = np.array([1,2,3,4,5,6,7])
normalized_dayOfWeek = np.linalg.norm(dayOfWeek_array)
normalized_dayOfWeek = dayOfWeek_array/normalized_dayOfWeek 

f2 = open("../NeuralNetwork/normalizedDOW.txt","w")

for i in range(0,len(dayOfWeek_array)):
        f2.write(str(dayOfWeek_array[i]) + "," + str(normalized_dayOfWeek[i]) + '\n')


typeOfItem_array = np.array([1,2,3,4,5,6])
normalized_typeOfItem = np.linalg.norm(typeOfItem_array)
normalized_typeOfItem = typeOfItem_array/normalized_typeOfItem

f3 = open("../NeuralNetwork/normalizedTOI.txt","w")

for i in range(0,len(typeOfItem_array)):
        f3.write(str(typeOfItem_array[i]) + "," + str(normalized_typeOfItem[i]) + '\n')


location_array = np.array([1,2,3,4,5,6,7,8,9])
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


charID = []
charIDR = []

def createInfoFile():

    fI = open("../NeuralNetwork/charID.txt","w")

    for i in range(0,len(charID)):
        fI.write(str(charID[i]) + "," + str(charIDR[i]) + '\n')


def getNormalizedVal(val, type):

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
    month, day, year = (int(i) for i in date.split(',')) 
    dayNumber = calendar.weekday(year, month, day)
    return dayNumber+1

def findLoc(loc):

    locations = ["Gauteng","KwaZulu-Natal","Limpopo","Western Cape","Northern Cape","North West","Eastern Cape","Free State","Mpumalanga"]

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


    dayOfWeek = str(getNormalizedVal(1, "DayOfW"))

    typeOfItem = random.randint(1,6)
    if typeOfItem == int(item_type):
        if(typeOfItem == 6):
            typeOfItem -= 1
        else:
            typeOfItem += 1

    typeOfItem = str(getNormalizedVal(typeOfItem, "TypeOfI"))


    loc = random.randint(1,9)
    if loc == int(location):
        if(loc == 9):
            loc -= 1
        else:
            loc += 1

    loc = str(getNormalizedVal(loc, "LocOfI"))

    
    month_N = str(getNormalizedVal(1, "Month"))

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

    postgres_select_query = "SELECT org_id, dono_date, dono_loc, type FROM public.donation_item ORDER BY org_id ASC;"
    cursor.execute(postgres_select_query)

    row = cursor.fetchone()


    newID = []
    IDcount = -1

    while row is not None:

        if not row[0] in charID:
            charID.append(row[0])
            IDcount = IDcount + 1
            charIDR.append(IDcount)

        
        orgID = IDcount
        dayOfWeek = str(getNormalizedVal(findDay(row[1] + ",2022"), "DayOfW"))
        item_type = str(getNormalizedVal(findItemType(row[3]), "TypeOfI"))
        location = str(getNormalizedVal(findLoc(row[2]), "LocOfI"))
        weather = str(getNormalizedVal(1, "Weather"))
        month, day = row[1].split(',')
        
        monthN = str(getNormalizedVal(month, "Month"))


        realDono = str(orgID) + "," + dayOfWeek + "," + item_type + "," + location + "," + monthN + ","+weather+",1"
        f.write(realDono + '\n')

        for i in range(0,2):
            fakeDono = createFakeDonation(orgID, findDay(row[1] + ",2022"), findItemType(row[3]), findLoc(row[2]), month)
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