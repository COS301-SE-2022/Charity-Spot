import psycopg2

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



    #1 Edgars
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    postgres_insert_query = "INSERT INTO public.donation_item (item_name, org_id, quantity, descrition, picture, quality, type, item_id, dono_date, dono_loc) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"
    record_to_insert = ("Test item", "1", "1", "This is a test item", "DonatedItems/cl5zazk0p00271xchzb79mksy.jpeg", "NEW", "FOOD", "1", "01/12", "Pretoria")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #2 Mr Price
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("2", "mr_price@email.com", "1234", "mr_price@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #3 Scooters Pizza
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #4 Checkers
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #5 Spar
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #6 Clicks
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #7 The Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #9 The General Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #10 Pretoria Restaurant
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #10 Cape Town Restaurant
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #11 Durban Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #12 Woolworths
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #13 PEP
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #14 Discount Clothing Store
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #15 Pick n Pay
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #16 Ackermans
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #17 Shoprite
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #18 Dischem
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #19 West Pack
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
    cursor.execute(postgres_insert_query, record_to_insert)
    connection.commit()

    #20 OK Furniture
    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "edgars@email.com", "1234", "edgars@email.com#", "temp")
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