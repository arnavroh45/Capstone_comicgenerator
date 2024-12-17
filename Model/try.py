"""
This module provides functions to test JWT token and mongo connections.
"""

# pylint: disable=too-many-locals
# pylint: disable=missing-function-docstring
# pylint: disable=no-name-in-module
# pylint: disable=import-error
# pylint: disable=line-too-long
# pylint: disable=raise-missing-from

from pymongo import MongoClient
import os
import jwt
import datetime
from dotenv import load_dotenv
from config import SECRET_KEY, comics
from datetime import datetime


load_dotenv()

client = MongoClient(os.getenv('DB_URL'))
db = client.get_database("test")
users = db.get_collection("Registration")
comics = db.get_collection("Comics")

user = users.find_one({"email": "agam_be21@thapar.edu"})
print(user['user_name'])

def generate_jwt(email, name, expires_delta: datetime.timedelta = datetime.timedelta(days=7)):
    payload = {
        'email': email,
        'name': name,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
  
    return token

print(generate_jwt("asharma4_be21@thapar.edu", "Arnav"))

# document = {
#             "user_id": "hi",
#             "title": "hi",
#             "scenario": "hi",
#             "style": "hi",
#             "images_links": "hi",
#             "strip_links": "hi",
#             "created_at": datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')  # Custom format
#         }
# comics.insert_one(document)

# Import necessary modules
import cloudinary
import cloudinary.uploader
from cartoon import create_batch_strip
import requests
from PIL import Image
from io import BytesIO

def fetch_images_from_urls(urls):
    """
    Fetch images from Cloudinary URLs and return a list of PIL Image objects.
    """
    images = []
    for url in urls:
        response = requests.get(url)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            images.append(img)
        else:
            print(f"Failed to fetch image from {url}")
    return images

# Example list of image URLs in your Cloudinary folder
cloudinary_urls = [
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677566/Sahiba_born_in_a_rich_family_htyhnz.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677565/Mirza_born_in_a_poor_family_jbdigl.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677564/Mirza_and_Sahiba_playing_pl8yqb.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677567/Sahiba_buying_honey_but_got_oil_fgfnax.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677563/Karmu_Brahman_going_to_tell_mirza_about_sahiba_marriage_zk2dh5.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677565/Mirza_and_Sahiba_horse_riding_b1ihli.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677564/Mirza_and_Sahiba_resting_xufyjl.png",
    "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677640/Mirza_falls_down_comic_nym0sh.png"
]

# Select 6 images for the strip
batch = fetch_images_from_urls(cloudinary_urls[6:])  # Use the first 6 images

# Example user inputs
user_id = "Arnavasharma4_be21@thapar.edu"
comic_title = "Mirza and Sahiba"
batch_number = 102

# Call the function
strip_url = create_batch_strip(user_id, comic_title, batch, batch_number)

# Output the URL of the uploaded strip
print("Strip URL:", strip_url)

