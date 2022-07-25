import psycopg2
import random

try:
    connection = psycopg2.connect(user="seal_team",
                                  password="seal_team",
                                  host="localhost",
                                  port="5432",
                                  database="main")

    cursor = connection.cursor()

    postgres_delete_query = "SELECT org_id, dono_date, dono_loc, type FROM public.donation_item;"
    cursor.execute(postgres_delete_query)
    #connection.commit()

    row = cursor.fetchone()

    while row is not None:
        print(row)
        row = cursor.fetchone()

except (Exception, psycopg2.Error) as error:
    print("Failed", error)

finally:
    # closing database connection.
    if connection:
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")