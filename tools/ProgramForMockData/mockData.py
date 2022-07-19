import random
#Day of the week = 1,2,3,4,5,6,7

#Org ID = 1, 2, 3, 4

#Type of the item donated:
    # 1 = clothes
    # 2 = food
    # 3 = stationary
    # 4 = other

#Location of the donation
    # 1 = Pretoria
    # 2 = Johannesburg
    # 3 = Cape Town

#Org 1 will donate food on a Tuesday in Cape Town
#Org 2 will donate food on a Wednesday in Pretoria
#Org 3 will donate food on a Monday in Johannesburg
#Org 4 will donate food on a Friday in Pretoria

#Org 1 will donate clothes on a Monday in Cape Town
#Org 2 will donate clothes on a Thursday in Pretoria
#Org 3 will donate clothes on a Monday in Johannesburg
#Org 4 will donate clothes on a Friday in Pretoria

#Org 1 will donate stationary on a Friday in Cape Town
#Org 2 will donate other on a Friday in Pretoria
#Org 3 will donate stationary on a Wednesday in Johannesburg
#Org 4 will donate stationary on a Wednesday in Pretoria

#Donations in the form:
    #Org ID, Day of the Week, Type of item, Location


f = open("mockDonations.txt", "w")

#Donations for org1
for x in range(30):
    f.write("1, 2, 2, 3" + '\n')
    f.write("1, 1, 1, 3" + '\n')
    f.write("1, 5, 3, 3" + '\n')

#Donations for org2
for x in range(30):
    f.write("2, 3, 2, 1" + '\n')
    f.write("2, 4, 1, 1" + '\n')
    f.write("2, 5, 4, 1" + '\n')

#Donations for org3
for x in range(30):
    f.write("3, 1, 2, 2" + '\n')
    f.write("3, 1, 1, 2" + '\n')
    f.write("3, 3, 3, 2" + '\n')

#Donations for org4
for x in range(30):
    f.write("4, 5, 2, 1" + '\n')
    f.write("4, 5, 1, 1" + '\n')
    f.write("4, 3, 3, 1" + '\n')


for x in range(360):
    org = random.randint(1,4)
    dayOfWeek = random.randint(1,7)
    typeOfItem = random.randint(1,4)
    loc = random.randint(1,3)

    f.write(str(org) + ", " + str(dayOfWeek) + ", " + str(typeOfItem) + ", " + str(loc) + '\n')


f.close()
