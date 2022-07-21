import random

#Using 4 Test organisations
#Org ID = 1, 2, 3, 4

#Day of the week = 1,2,3,4,5,6,7

#Type of the item donated:
    # 1 = clothes
    # 2 = food
    # 3 = stationary
    # 4 = toiletries

#Location of the donation
    # 1 = Pretoria
    # 2 = Johannesburg
    # 3 = Cape Town

#Month = 1,2,3,4,5,6,7,8,9,10,11,12

#Weather
    # 1 = Sunny
    # 2 = Rain
    # 3 = Cloudy


#Each organisation has 3 distinct donations that they repeat 30 times each. 90 total donations per organisation

    #Org 1 ("1, 1, 1, 1, 1, 1" + '\n')
    #Org 1 ("1, 2, 2, 2, 2, 1" + '\n')
    #Org 1 ("1, 3, 3, 1, 3, 1" + '\n')

    #Org 2 ("2, 4, 4, 2, 5, 2" + '\n')
    #Org 2 ("2, 5, 1, 3, 6, 1" + '\n')
    #Org 2 ("2, 6, 2, 2, 7, 1" + '\n')

    #Org 3 ("3, 7, 3, 3, 3, 3" + '\n')
    #Org 3 ("3, 1, 4, 1, 2, 3" + '\n')
    #Org 3 ("3, 2, 1, 3, 1, 3" + '\n')
    
    #Org 4 ("4, 3, 2, 1, 12, 1" + '\n')
    #Org 4 ("4, 4, 3, 2, 11, 2" + '\n')
    #Org 4 ("4, 5, 4, 3, 6, 3" + '\n')

#Last value in the string indicates if the donation is real or fake


f = open("mockDonations.txt", "w")


########################

#Donations for org1
for x in range(30):
    f.write("1, 1, 1, 1, 1, 1, 1" + '\n')
    f.write("1, 2, 2, 2, 2, 1, 1" + '\n')
    f.write("1, 3, 3, 1, 3, 1, 1" + '\n')

#Fake Donations for org1
for x in range(90):
    org = 1
    dayOfWeek = random.randint(1,7)
    typeOfItem = random.randint(1,4)
    loc = random.randint(1,3)
    month = random.randint(1,12)
    Weather = random.randint(1,3)

    f.write(str(org) + ", " + str(dayOfWeek) + ", " + str(typeOfItem) + ", " + str(loc) + ", " + str(month) + ", " + str(Weather) + ', 0' + '\n')

########################

#Donations for org2
for x in range(30):
    f.write("2, 4, 4, 2, 5, 2, 1" + '\n')
    f.write("2, 5, 1, 3, 6, 1, 1" + '\n')
    f.write("2, 6, 2, 2, 7, 1, 1" + '\n')

#Fake Donations for org2
for x in range(90):
    org = 2
    dayOfWeek = random.randint(1,7)
    typeOfItem = random.randint(1,4)
    loc = random.randint(1,3)
    month = random.randint(1,12)
    Weather = random.randint(1,3)

    f.write(str(org) + ", " + str(dayOfWeek) + ", " + str(typeOfItem) + ", " + str(loc) + ", " + str(month) + ", " + str(Weather) + ', 0' + '\n')

########################

#Donations for org3
for x in range(30):
    f.write("3, 7, 3, 3, 3, 3, 1" + '\n')
    f.write("3, 1, 4, 1, 2, 3, 1" + '\n')
    f.write("3, 2, 1, 3, 1, 3, 1" + '\n')

#Fake Donations for org3
for x in range(90):
    org = 3
    dayOfWeek = random.randint(1,7)
    typeOfItem = random.randint(1,4)
    loc = random.randint(1,3)
    month = random.randint(1,12)
    Weather = random.randint(1,3)

    f.write(str(org) + ", " + str(dayOfWeek) + ", " + str(typeOfItem) + ", " + str(loc) + ", " + str(month) + ", " + str(Weather) + ', 0' + '\n')

########################

#Donations for org4
for x in range(30):
    f.write("4, 3, 2, 1, 12, 1, 1" + '\n')
    f.write("4, 4, 3, 2, 11, 2, 1" + '\n')
    f.write("4, 5, 4, 3, 6, 3, 1" + '\n')

#Fake Donations for org4
for x in range(90):
    org = 4
    dayOfWeek = random.randint(1,7)
    typeOfItem = random.randint(1,4)
    loc = random.randint(1,3)
    month = random.randint(1,12)
    Weather = random.randint(1,3)

    f.write(str(org) + ", " + str(dayOfWeek) + ", " + str(typeOfItem) + ", " + str(loc) + ", " + str(month) + ", " + str(Weather) + ', 0' + '\n')

########################


#for x in range(360):
    #org = random.randint(1,4)
    #dayOfWeek = random.randint(1,7)
    #typeOfItem = random.randint(1,4)
    #loc = random.randint(1,3)

    #f.write(str(org) + ", " + str(dayOfWeek) + ", " + str(typeOfItem) + ", " + str(loc) + '\n')


f.close()
