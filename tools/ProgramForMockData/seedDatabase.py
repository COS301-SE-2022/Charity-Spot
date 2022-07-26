import psycopg2

try:
    connection = psycopg2.connect(user="seal_team",
                                  password="seal_team",
                                  host="localhost",
                                  port="5432",
                                  database="main")

    cursor = connection.cursor()

    #OrgID = UserID

    postgres_insert_query = "INSERT INTO public.user (user_id, email, password, password_salt, identity) VALUES (%s,%s,%s,%s,%s);"
    record_to_insert = ("1", "test@email.com", "1234", "test@email.com#", "temp")
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