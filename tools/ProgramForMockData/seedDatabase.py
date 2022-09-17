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
    postgres_insert_query = "INSERT INTO public.address (address_id, address, city, province) VALUES (%s,%s,%s,%s);"

    #A1,A6,A2,A5,A7,A3,A14,A8,A19,A9,A15,A13,A4,A10,A11,A12,A16,A17,A18,A20

    record_to_insert = ("A1", "-25.7479,28.2293", "Pretoria", "Gauteng")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A2", "-26.2041,28.0473", "Johannesburg", "Gauteng")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A3", "-33.9249,18.4241", "Cape Town", "Western Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A4", "-29.0852,26.1596", "Bloemfontein", "Free State")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A5", "-23.8962,29.4486", "Polokwane", "Limpopo")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A6", "-29.8587,31.0218", "Durban", "KwaZulu-Natal")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A7", "-26.3224,28.1240", "Alberton", "Gauteng")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A8", "-25.8084,28.7081", "Bronkhorstspruit", "Gauteng")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A9", "-33.9321,18.8602", "Stellenbosch", "Western Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A10", "-28.3953,21.2368", "Upington", "Northern Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A11", "-29.6655,17.8880", "Springbok", "Northern Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A12", "-28.2750,29.1042", "Harrismith", "Free State")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A13", "-25.6100,27.7960", "Brits", "North West")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A14", "-29.6006,30.3794", "Pietermaritzburg", "KwaZulu-Natal")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A15", "-33.0198,27.9039", "East London", "Eastern Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A16", "-33.9881,22.4530", "George", "Western Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A17", "-34.1747,22.0834", "Mossel Bay", "Western Cape")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A18", "-24.8844,28.3287", "Bela-Bela", "Limpopo")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A19", "-26.4910,28.3842", "Heidelberg", "Gauteng")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    record_to_insert = ("A20", "-26.2485,27.8540", "Soweto", "Gauteng")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()



    #1 Edgars
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("1", "Edgars", "A1", "wNlBzN2AjZ2UTMjhTL4UGN40SNwkDNtkTNmJTL2QmMjhTYzQTPuV2avRnJhlGZl1WP0xWY/cGcq5ycyF2ZkV2XwB3XXt2cxxkR6dTazZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Edgards makes 50% of donations in Western Cape and 50% in Gauteng. Always clothes
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Edgars. Gauteng", "1", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"1{x}", f"{day},{month}", "Gauteng", "true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Edgars. Western Cape", "1", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"11{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        


    #2 Mr Price
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("2", "mr_price@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("2", "Mr Price", "A15", "hJGZzQTN4UTY0U2MtETZwIWLwYmZ00COxYGNtQWY5kjNhNmZ94WZr9GdmEWakVWb9QHbh9zZwpmLlNWayB3Xy12XwB3XUJETJNzY1BlR0YkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Mr Price makes all of its donations in KwaZulu-Natal. Always clothes
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Mr Price. KwaZulu-Natal", "2", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"2{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #3 Scooters Pizza
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("3", "scooters_pizza@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("3", "Scooters Pizza", "A2", "kRTMmJDNyUzMmVWNtE2M0IWLmlzN00yNlN2MtIGZ3QWOwU2M94WZr9GdmEWakVWb9QHbh9zZwpmLhpnepB3XzJXZ092bjN3XwB3XVFWNyJ0cIFzVzZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Scooters pizza makes 33% of its donations in Gauteng, 33% in Free State and 33% in Limpopo
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Scooters Pizza. Gauteng", "3", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"3{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Scooters Pizza. Free State", "3", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"333{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Scooters Pizza. Limpopo", "3", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"3333{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    

    #4 Checkers
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("4", "checkers@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("4", "Checkers", "A5", "mZzY2UDN1EGN4EmNtQmMykTLyYGN00yMkFDMtcjZhRmYzkDN94WZr9GdmEWakVWb9QHbh9zZuBnLzJXZrNWZoN2XwB3XZJWbzATOIlWSUZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Checkers will donate all of their itmes in Limpopo. 33% of their items will be food, 33% will be clothes and 33% will be toiletries
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Checkers. Limpopo", "4", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"4{x}", f"{day},{month}", "Limpopo", "true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Checkers. Limpopo", "4", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"444{x}", f"{day},{month}", "Limpopo", "true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Checkers. Limpopo", "4", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"4444{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #5 Spar
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("5", "spar@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("5", "Spar", "A7", "IDNhJjZyMjN0ETO50CO5QWOtAzM1QTLhBDZj1yYlRmY2MzM30jblt2b0ZSYpRWZt1DdsF2Pn5GcuIXYwN3XwB3XTFjQuR3QnlXOvZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Spar will donate all of their food items in Gauteng and all of their Hygiene items in KwaZulu-Natal
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Spar. Gauteng", "5", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"5{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Spar. KwaZulu-Natal", "5", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"555{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #6 Clicks
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("6", "clicks@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("6", "Clicks", "A3", "AZyEmNkJWM0YzMlRWLykzYi1SNxQDNtYGNjVWLyMmMxM2NwEWPuV2avRnJhlGZl1WP0xWY/cGcq5ycrNWasN2XwB3X410MBlWZyEkN5ZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Clicks will donate 50% of their hygiene items in Western Cape and 50% of their hygiene items in Gauteng
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Clicks. Western Cape", "6", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"6{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Clicks. Gauteng", "6", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"6666{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #7 The Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("7", "the_clothing_store@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("7", "The Clothing Store", "A14", "MDZzYWM3IzNlZWOy0SYmBTOtYWZ4QTLjBjNl1iMzIDM1MjZm1jblt2b0ZSYpRWZt1DdsF2Pn5GcuAXblR3XwB3X2tWePhkTTFEaXZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #The Clothing Store will donate half of their items in KwaZulu-Natal and half of their items in Limpopo
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The Clothing Store. KwaZulu-Natal", "7", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"7{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The Clothing Store. Limpopo", "7", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"777{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #8 The General Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("8", "the_general_store@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("8", "The General Store", "A8", "MDZzYWM3IzNlZWOy0SYmBTOtYWZ4QTLjBjNl1iMzIDM1MjZm1jblt2b0ZSYpRWZt1DdsF2Pn5GcuAXblR3XwB3X2tWePhkTTFEaXZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #The General Store will donate 15 items in each of the locations. 33% will be furniture, 33% will be kitchen items and 33% will be clothing items

    #Gauteng
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Gauteng", "8", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"8{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Gauteng", "8", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"88{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Gauteng", "8", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"888{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    
    #KwaZulu-Natal
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. KwaZulu-Natal", "8", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"8888{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. KwaZulu-Natal", "8", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"88888{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. KwaZulu-Natal", "8", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"888888{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Limpopo
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Limpopo", "8", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"8888888{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Limpopo", "8", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"88888888{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Limpopo", "8", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"888888888{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Western Cape
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Western Cape", "8", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"8888888888{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Western Cape", "8", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"88888888888{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Western Cape", "8", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"888888888888{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Polokwane
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Polokwane", "8", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"8888888888888{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Polokwane", "8", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"88888888888888{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Polokwane", "8", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"888888888888888{x}", f"{day},{month}", "Polokwane","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #Northern Cape
    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from The General Store. Northern Cape", "8", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"8888888888888888{x}", f"{day},{month}", "Northern Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from The General Store. Northern Cape", "8", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"88888888888888888{x}", f"{day},{month}", "Northern Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(22):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from The General Store. Northern Cape", "8", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"888888888888888888{x}", f"{day},{month}", "Northern Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #9 Pretoria Restaurant
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("9", "pretoria_restaurant@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("9", "Pretoria Restaurant", "A19", "MDZzYWM3IzNlZWOy0SYmBTOtYWZ4QTLjBjNl1iMzIDM1MjZm1jblt2b0ZSYpRWZt1DdsF2Pn5GcuAXblR3XwB3X2tWePhkTTFEaXZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Pretoria Restaurant will donate all of their items in Gauteng. Only food
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Pretoria Restaurant. Gauteng", "9", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"9{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #10 Cape Town Restaurant
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("10", "cape_town_restaurant@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("10", "Cape Town Restaurant", "A9", "MDZzYWM3IzNlZWOy0SYmBTOtYWZ4QTLjBjNl1iMzIDM1MjZm1jblt2b0ZSYpRWZt1DdsF2Pn5GcuAXblR3XwB3X2tWePhkTTFEaXZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Cape Town Restaurant will donate all of their items in Western Cape. Only food
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Cape Town Restaurant. Western Cape", "10", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"1010{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #11 Durban Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("11", "durban_clothing_store@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("11", "Durban Clothing Store", "A6", "MDZzYWM3IzNlZWOy0SYmBTOtYWZ4QTLjBjNl1iMzIDM1MjZm1jblt2b0ZSYpRWZt1DdsF2Pn5GcuAXblR3XwB3X2tWePhkTTFEaXZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Durban Clothing Store will donate all of their items in KwaZulu-Natal. Only clothing
    for x in range(200):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Durban Clothing Store. KwaZulu-Natal", "11", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"111111{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #12 Woolworths
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("12", "woolworths@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("12", "Woolworths", "A13", "YWM3IDZkVmN5AjMi1CN5gDOtITM5QTL1gzNi1iYwM2N5IjN40jblt2b0ZSYpRWZt1DdsF2PnBnauMHa0J3b3x2bvd3XwB3X11kb1Q3QORUTyYkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Woolworths will donate all of their items in Western Cape. 33% of their items will be food, 33% will be clothes and 33% will be toiletries
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Woolworths. Western Cape", "12", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"W1{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Woolworths. Western Cape", "12", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"W2{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Woolworths. Western Cape", "12", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"W3{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()




    #13 PEP
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("13", "pep@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("13", "PEP", "A4", "gM1Y2Y0U2YiFDZwQWLmJmZ40SNhRDNtQWO5MTLzEjMkZWZ4ATPuV2avRnJhlGZl1WP0xWY/cmbw5CclB3XwB3XCpkdOd2QMhFa0YkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #PEP will donate all of their items in Free State. 33% of their items will be clothes, 33% will be KITCHEN and 33% will be HYGIENE
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from PEP. Free State", "13", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"P1{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from PEP. Free State", "13", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"P2{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from PEP. Free State", "13", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"P3{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()


    #14 Discount Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("14", "discount_clothing_store@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("14", "Discount Clothing Store", "A10", "MDZzYWM3IzNlZWOy0SYmBTOtYWZ4QTLjBjNl1iMzIDM1MjZm1jblt2b0ZSYpRWZt1DdsF2Pn5GcuAXblR3XwB3X2tWePhkTTFEaXZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Discount Clothing store will donate 33% of their items in Gauteng, 33% of their items in Free State and 33% of their items in Limpopo
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Discount Clothing Store. Gauteng", "14", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"DCS1{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Discount Clothing Store. Free State", "14", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"DCS2{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Discount Clothing Store. Limpopo", "14", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"DCS1{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()



    #15 Pick n Pay
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("15", "pick_n_pay@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("15", "Pick n Pay", "A11", "AMxgzY0MWZ4gTNkFWLyQDZ40iZwgDNtY2NkBTLwEjNmFTYmJWPuV2avRnJhlGZl1WP0xWY/cGcq5CcuB3XwB3XhJkVlpmQYdXYDZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Pick n Pay will donate all of their items in Gauteng. 33% of their items will be food, 33% will be clothes and 33% will be toiletries
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Pick n Pay. Gauteng", "15", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"PNP1{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Pick n Pay. Gauteng", "15", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"PNP2{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Pick n Pay. Gauteng", "15", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"PNP3{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #16 Ackermans
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("16", "ackermans@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("16", "Ackermans", "A12", "gYhJGMxUmZhF2YjJWLkdTOi1iZwIDNtYWMidTLwUjZilDMlFTPuV2avRnJhlGZl1WP0xWY/cmbw5ycuFWbyV2ajF2XwB3X250Q2gWQyYzNQZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Ackermans will donate 33% of their items in Limpopo, 33% of their items in Free State and 33% of their items in Western Cape
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Ackermans. Limpopo", "16", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"ACK1{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Ackermans. Free State", "16", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"ACK2{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Clothing item {x} from Ackermans. Western Cape", "16", "1", "This is a clothing item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "CLOTHING", f"ACK3{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #17 Shoprite
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("17", "shoprite@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("17", "Shoprite", "A16", "mJTZjZWM4YWZzEjYtUjMilTLkNWO00yMkVGZtQjMiVmNhZGZ94WZr9GdmEWakVWb9QHbh9zZwpmLlRXayB3boN3XwB3XkpGd04mS3dWN0YkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Shoprite will donate all of their items in Gauteng. 50% of their items will be food and 50% will be toiletries
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Food item {x} from Shoprite. Gauteng", "17", "1", "This is a food item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FOOD", f"SHP1{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Shoprite. Gauteng", "17", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"SHP2{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    

    #18 Dischem
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("18", "dischem@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s, %s);"
    record_to_insert = ("18", "Dischem", "A17", "gjZwEDN5IzM4QDNh1SNxMWOtETO1QTLxEDZl1SMmNjZ5kzN50jblt2b0ZSYpRWZt1DdsF2Pn5Gcu0WZoN2cpR2XwB3XkpkTwUFSqtGZmZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #Dischem will donate 50% of their hygiene items in Free State and 50% of their hygiene items in Limpopo
    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Dischem. Free State", "18", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"DCH1{x}", f"{day},{month}", "Free State","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(100):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Hygiene item {x} from Dischem. Limpopo", "18", "1", "This is a hygiene item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "HYGIENE", f"DCH2{x}", f"{day},{month}", "Limpopo","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #19 West Pack
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("19", "west_pack@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("19", "West Pack", "A18", "QO2czN0IjZmNWMwQTLjNWZh1SZ5cDNtkDNzYWLiJTMwEmMmdTPuV2avRnJhlGZl1WP0xWY/cGcq5yajFGctQ3cld3XwB3XPp1bPJURyQnbSZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #West Pack will donate 33% of their items in Gauteng, 33% of their items in KwaZulu-Natal and 33% of their items in Western Cape
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from West Pack. Gauteng", "19", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"WEP1{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from West Pack. KwaZulu-Natal", "19", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"WEP2{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Kitchen item {x} from West Pack. Western Cape", "19", "1", "This is a kitchen item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "KITCHEN", f"WEP3{x}", f"{day},{month}", "Western Cape","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    #20 OK Furniture
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("20", "ok_furniture@email.com", "dd0055b11ab0d137a2cf6c87d771e998", "$2b$12$gcb/WPx.3VHAmjt7E5v13.", "ASSIST")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.organisation (user_id, organisation_id, address_ID, profile_picture) VALUES (%s,%s,%s,%s);"
    record_to_insert = ("20", "OK Furniture", "A20", "gMwU2M4YWNkFGNyITLlRGM50CN5MGNtEDNwMTLlJmY1MmY1kTPuV2avRnJhlGZl1WP0xWY/cmbw5SZyVHdp5mc1Z2Xr92XwB3XyNGOuJ0V0gkRLZkMlMXZyVHdjlGUlxWam9mcw9ybv02bj5CdvB3cwBXYuQ3bwNXL5RXayFGaj9iYvAjdv02bj5ycpBXYlx2Zv92ZuU2ZhJ3b0NXZzFmYlJXam9yL6MHc0RHa")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #OK Furniture will donate 33% of their items in Gauteng, 33% of their items in KwaZulu-Natal and 33% of their items in Western Cape
    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from OK Furniture. Gauteng", "20", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"OKF1{x}", f"{day},{month}", "Gauteng","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from OK Furniture. KwaZulu-Natal", "20", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"OKF2{x}", f"{day},{month}", "KwaZulu-Natal","true")
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()

    for x in range(66):

        month = 1
        day = 3

        postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc, item_avail) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
        record_to_insert = (f"Furniture item {x} from OK Furniture. Western Cape", "20", "1", "This is a furniture item", "DonatedItems/cl85zcn1x0659b6chubs00k24.jpeg", "NEW", "FURNITURE", f"OKF3{x}", f"{day},{month}", "Western Cape","true")
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