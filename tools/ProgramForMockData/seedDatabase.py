import psycopg2
import random

try:
    connection = psycopg2.connect(user="seal_team",
                                  password="seal_team",
                                  host="localhost",
                                  port="5432",
                                  database="main")

    cursor = connection.cursor()

    #OrgID = UserID

    #clear tables first

    postgres_delete_query = "DELETE FROM public.user;"
    cursor.execute(postgres_delete_query)
    connection.commit()

    postgres_delete_query = "DELETE FROM public.donation_item;"
    cursor.execute(postgres_delete_query)
    connection.commit()

    postgres_delete_query = "DELETE FROM public.address;"
    cursor.execute(postgres_delete_query)
    connection.commit()

    postgres_delete_query = "DELETE FROM public.organisation;"
    cursor.execute(postgres_delete_query)
    connection.commit()

    #First add locations to Address table
    postgres_insert_query = "INSERT INTO public.address (address_id, address, address2, city, province) VALUES (%s,%s,%s,%s,%s);"

    record_to_insert = ("A1", "Pretoria", "", "", "")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A2", "Johannesburg", "", "", "")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A3", "Cape Town", "", "", "")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A4", "Bloemfontein", "", "", "")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A5", "Polokwane", "", "", "")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A6", "Durban", "", "", "")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()


    #1 Edgars
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("1", "Edgars", "A1")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Edgards makes 50% of donations in Cape Town and 50% in Pretoria. Always clothes
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Edgars. Pretoria", "1", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"1{x}", f"{day},{month}", "Pretoria", "true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Edgars. Cape Town", "1", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"11{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        


    #2 Mr Price
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("2", "mr_price@email.com", "1234", "mr_price@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("2", "Mr Price", "A2")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Mr Price makes all of its donations in Durban. Always clothes
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Mr Price. Durban", "2", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"2{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #3 Scooters Pizza
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("3", "scooters_pizza@email.com", "1234", "scooters_pizza@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("3", "Scooters Pizza", "A3")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Scooters pizza makes 33% of its donations in Johannesburg, 33% in Bloemfontein and 33% in Polokwane
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Scooters Pizza. Johannesburg", "3", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"3{x}", f"{day},{month}", "Johannesburg","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Scooters Pizza. Bloemfontein", "3", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"333{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Scooters Pizza. Polokwane", "3", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"3333{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    

    #4 Checkers
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("4", "checkers@email.com", "1234", "checkers@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("4", "Checkers", "A4")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Checkers will donate all of their itmes in Polokwane. 33% of their items will be food, 33% will be clothes and 33% will be toiletries
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Checkers. Polokwane", "4", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"4{x}", f"{day},{month}", "Polokwane", "true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Checkers. Polokwane", "4", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"444{x}", f"{day},{month}", "Polokwane", "true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Checkers. Polokwane", "4", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"4444{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #5 Spar
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("5", "spar@email.com", "1234", "spar@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("5", "Spar", "A5")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Spar will donate all of their food items in Pretoria and all of their Hygiene items in Durban
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Spar. Pretoria", "5", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"5{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Spar. Durban", "5", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"555{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #6 Clicks
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("6", "clicks@email.com", "1234", "clicks@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("6", "Clicks", "A6")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Clicks will donate 50% of their hygiene items in Cape Town and 50% of their hygiene items in Pretoria
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Clicks. Cape Town", "6", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"6{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Clicks. Pretoria", "6", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"6666{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #7 The Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("7", "the_clothing_store@email.com", "1234", "the_clothing_store@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("7", "The Clothing Store", "A1")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #The Clothing Store will donate half of their items in Durban and half of their items in Polokwane
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The Clothing Store. Durban", "7", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"7{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The Clothing Store. Polokwane", "7", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"777{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #8 The General Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("8", "the_general_store@email.com", "1234", "the_general_store@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("8", "The General Store", "A2")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #The General Store will donate 15 items in each of the locations. 33% will be furniture, 33% will be kitchen items and 33% will be clothing items

    #Pretoria
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Pretoria", "8", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"8{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Pretoria", "8", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"88{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Pretoria", "8", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"888{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    
    #Johannesburg
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Johannesburg", "8", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"8888{x}", f"{day},{month}", "Johannesburg","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Johannesburg", "8", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"88888{x}", f"{day},{month}", "Johannesburg","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Johannesburg", "8", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"888888{x}", f"{day},{month}", "Johannesburg","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Cape Town
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Cape Town", "8", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"8888888{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Cape Town", "8", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"88888888{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Cape Town", "8", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"888888888{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Bloemfontein
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Bloemfontein", "8", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"8888888888{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Bloemfontein", "8", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"88888888888{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Bloemfontein", "8", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"888888888888{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Polokwane
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Polokwane", "8", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"8888888888888{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Polokwane", "8", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"88888888888888{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Polokwane", "8", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"888888888888888{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Durban
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Durban", "8", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"8888888888888888{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Durban", "8", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"88888888888888888{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Durban", "8", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"888888888888888888{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #9 Pretoria Restaurant
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("9", "pretoria_restaurant@email.com", "1234", "pretoria_restaurant@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("9", "Pretoria Restaurant", "A3")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Pretoria Restaurant will donate all of their items in Pretoria. Only food
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Pretoria Restaurant. Pretoria", "9", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"9{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #10 Cape Town Restaurant
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("10", "cape_town_restaurant@email.com", "1234", "cape_town_restaurant@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("10", "Cape Town Restaurant", "A4")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Cape Town Restaurant will donate all of their items in Cape Town. Only food
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Cape Town Restaurant. Cape Town", "10", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"1010{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #11 Durban Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("11", "durban_clothing_store@email.com", "1234", "durban_clothing_store@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("11", "Durban Clothing Store", "A5")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Durban Clothing Store will donate all of their items in Durban. Only clothing
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Durban Clothing Store. Durban", "11", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"111111{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #12 Woolworths
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("12", "woolworths@email.com", "1234", "woolworths@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("12", "Woolworths", "A6")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Woolworths will donate all of their items in Cape Town. 33% of their items will be food, 33% will be clothes and 33% will be toiletries
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Woolworths. Cape Town", "12", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"W1{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Woolworths. Cape Town", "12", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"W2{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Woolworths. Cape Town", "12", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"W3{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()




    #13 PEP
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("13", "pep@email.com", "1234", "pep@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("13", "PEP", "A1")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #PEP will donate all of their items in Bloemfontein. 33% of their items will be clothes, 33% will be KITCHEN and 33% will be HYGIENE
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from PEP. Bloemfontein", "13", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"P1{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from PEP. Bloemfontein", "13", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"P2{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from PEP. Bloemfontein", "13", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"P3{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #14 Discount Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("14", "discount_clothing_store@email.com", "1234", "discount_clothing_store@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("14", "Discount Clothing Store", "A2")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Discount Clothing store will donate 33% of their items in Pretoria, 33% of their items in Bloemfontein and 33% of their items on Polokwane
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Discount Clothing Store. Pretoria", "14", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"DCS1{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Discount Clothing Store. Bloemfontein", "14", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"DCS2{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Discount Clothing Store. Polokwane", "14", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"DCS1{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #15 Pick n Pay
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("15", "pick_n_pay@email.com", "1234", "pick_n_pay@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("15", "Pick n Pay", "A3")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Pick n Pay will donate all of their items in Pretoria. 33% of their items will be food, 33% will be clothes and 33% will be toiletries
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Pick n Pay. Pretoria", "15", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"PNP1{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Pick n Pay. Pretoria", "15", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"PNP2{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Pick n Pay. Pretoria", "15", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"PNP3{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #16 Ackermans
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("16", "ackermans@email.com", "1234", "ackermans@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("16", "Ackermans", "A4")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Ackermans will donate 33% of their items in Polokwane, 33% of their items in Bloemfontein and 33% of their items in Cape Town
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Ackermans. Polokwane", "16", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"ACK1{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Ackermans. Bloemfontein", "16", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"ACK2{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Ackermans. Cape Town", "16", "1", "This is a clothing item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "CLOTHING", f"ACK3{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #17 Shoprite
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("17", "shoprite@email.com", "1234", "shoprite@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("17", "Shoprite", "A5")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Shoprite will donate all of their items in Johannesburg. 50% of their items will be food and 50% will be toiletries
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Shoprite. Johannesburg", "17", "1", "This is a food item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", f"SHP1{x}", f"{day},{month}", "Johannesburg","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Shoprite. Johannesburg", "17", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"SHP2{x}", f"{day},{month}", "Johannesburg","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    

    #18 Dischem
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("18", "dischem@email.com", "1234", "dischem@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("18", "Dischem", "A6")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Dischem will donate 50% of their hygiene items in Bloemfontein and 50% of their hygiene items in Polokwane
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Dischem. Bloemfontein", "18", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"DCH1{x}", f"{day},{month}", "Bloemfontein","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Dischem. Polokwane", "18", "1", "This is a hygiene item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "HYGIENE", f"DCH2{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #19 West Pack
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("19", "west_pack@email.com", "1234", "west_pack@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("19", "West Pack", "A1")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #West Pack will donate 33% of their items in Pretoria, 33% of their items in Durban and 33% of their items in Cape Town
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from West Pack. Pretoria", "19", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"WEP1{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from West Pack. Durban", "19", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"WEP2{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from West Pack. Cape Town", "19", "1", "This is a kitchen item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "KITCHEN", f"WEP3{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #20 OK Furniture
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("20", "ok_furniture@email.com", "1234", "ok_furniture@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID) VALUES (%s,%s,%s);"
    record_to_insert = ("20", "OK Furniture", "A2")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #OK Furniture will donate 33% of their items in Pretoria, 33% of their items in Durban and 33% of their items in Cape Town
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from OK Furniture. Pretoria", "20", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"OKF1{x}", f"{day},{month}", "Pretoria","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from OK Furniture. Durban", "20", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"OKF2{x}", f"{day},{month}", "Durban","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from OK Furniture. Cape Town", "20", "1", "This is a furniture item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FURNITURE", f"OKF3{x}", f"{day},{month}", "Cape Town","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

except (Exception, psycopg2.Error) as error:
    print("Failed to insert record", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")