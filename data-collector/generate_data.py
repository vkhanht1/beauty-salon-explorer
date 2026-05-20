import sqlite3
import random

districts = ["Śródmieście", "Mokotów", "Wola", "Praga-Południe", "Ochota", "Ursynów", "Bielany", "Targówek"]

# service
services_pool = ["Haircut", "Hair Coloring", "Hair Styling", "Manicure", "Pedicure", "Facial Treatment", "Makeup", "Massage"]

# salon in warsaw
brand_names = ["Creative Hair", "Studio Piękna", "Glow Up Studio", "Warsaw Beauty Lounge", "Elegance Salon", "Chic & Go", "The Barber Shop", "Velvet Skin"]

def generate_100_salons():
    salons = []
    for i in range(1, 106):
        name = f"{random.choice(brand_names)} {i}"
        district = random.choice(districts)
        address = f"ul. Marszałkowska {random.randint(1, 150)}, 00-{random.randint(100, 999)} Warszawa"
        phone = f"+48 {random.randint(500, 899)} {random.randint(100, 999)} {random.randint(100, 999)}"
        website = f"https://{name.lower().replace(' ', '')}.pl"
        services = ", ".join(random.sample(services_pool, k=random.randint(2, 4)))
        price_range = random.choice(["$", "$$", "$$$"])
        rating = round(random.uniform(4.0, 5.0), 1)
        reviews = random.randint(15, 450)
        salons.append((name, address, district, phone, website, services, price_range, rating, reviews))
    return salons

def insert_to_db():
    conn = sqlite3.connect('../backend/salons.db')
    cursor = conn.cursor()
    
    salons_data = generate_100_salons()
    cursor.executemany('''
        INSERT INTO salon (name, address, district, phone_number, website, services, price_range, rating, number_of_reviews)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', salons_data)
    
    conn.commit()
    cursor.execute("SELECT COUNT(*) FROM salon")
    total = cursor.fetchone()[0]
    conn.close()
    
    print(f"Successfully saved {total} to the Database.")

if __name__ == "__main__":
    insert_to_db()