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
from datetime import datetime, timedelta


# load_dotenv()

# client = MongoClient(os.getenv('DB_URL'))
# db = client.get_database("test")
# users = db.get_collection("Registration")
# comics = db.get_collection("Comics")

# user = users.find_one({"email": "agam_be21@thapar.edu"})
# print(user['user_name'])

# def generate_jwt(email, name, expires_delta: timedelta = timedelta(days=7)):
#     payload = {
#         'email': email,
#         'name': name,
#         'exp': datetime.utcnow() + expires_delta,
#         'iat': datetime.utcnow()
#     }
#     token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
  
#     return token

# print(generate_jwt("asharma4_be21@thapar.edu", "Arnav"))

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
# import cloudinary
# import cloudinary.uploader
# from cartoon import create_batch_strip
# import requests
# from PIL import Image
# from io import BytesIO

# def fetch_images_from_urls(urls):
#     """
#     Fetch images from Cloudinary URLs and return a list of PIL Image objects.
#     """
#     images = []
#     for url in urls:
#         response = requests.get(url)
#         if response.status_code == 200:
#             img = Image.open(BytesIO(response.content))
#             images.append(img)
#         else:
#             print(f"Failed to fetch image from {url}")
#     return images

# # Example list of image URLs in your Cloudinary folder
# cloudinary_urls = [
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677566/Sahiba_born_in_a_rich_family_htyhnz.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677565/Mirza_born_in_a_poor_family_jbdigl.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677564/Mirza_and_Sahiba_playing_pl8yqb.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677567/Sahiba_buying_honey_but_got_oil_fgfnax.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677563/Karmu_Brahman_going_to_tell_mirza_about_sahiba_marriage_zk2dh5.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677565/Mirza_and_Sahiba_horse_riding_b1ihli.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677564/Mirza_and_Sahiba_resting_xufyjl.png",
#     "https://res.cloudinary.com/dfntvlmqc/image/upload/v1733677640/Mirza_falls_down_comic_nym0sh.png"
# ]

# # Select 6 images for the strip
# batch = fetch_images_from_urls(cloudinary_urls[6:])  # Use the first 6 images

# # Example user inputs
# user_id = "Arnavasharma4_be21@thapar.edu"
# comic_title = "Mirza and Sahiba"
# batch_number = 102

# # Call the function
# strip_url = create_batch_strip(user_id, comic_title, batch, batch_number)

# # Output the URL of the uploaded strip
# print("Strip URL:", strip_url)

import re
import json
def extract_panel_info(input_string):
    """
    Extract panel information from the input string.

    Args:
        input_string (str): The input string containing panel information.

    Returns:
        list: A list of dictionaries containing extracted panel information.
    """
    # Use regex to split the input into panels, capturing the full panel content
    panels = re.split(r'(#\s*Panel\s*\d+)', input_string.strip())[1:]
    
    # List to store the JSON output
    panels_list = []
    
    # Process panels in pairs (panel header and content)
    for i in range(0, len(panels), 2):
        # Extract panel number
        panel_number_match = re.search(r'\d+', panels[i])
        panel_number = int(panel_number_match.group(0)) if panel_number_match else len(panels_list) + 1
        
        # Extract panel content
        panel_content = panels[i + 1] if i + 1 < len(panels) else ""
        
        # Extract description
        description_match = re.search(r'description:\s*(.+?)(?=\n*text:|$)', panel_content, re.DOTALL | re.IGNORECASE)
        description = description_match.group(1).strip() if description_match else ""
        
        # Extract text
        text_match = re.search(r'text:\s*(.+)', panel_content, re.DOTALL | re.IGNORECASE)
        text = text_match.group(1).strip() if text_match else panel_content.strip()
        
        # Create panel dictionary
        panel_dict = {
            "number": panel_number,
            "Description": description,
            "Background": "",  # Background can be filled if available later
            "Text": text
        }
        
        # Append to the list
        panels_list.append(panel_dict)
    
    return panels_list

input_Str = '''
# Panel 1 description: A girl with long black hair and glasses, a man with short black hair and a beard, a woman with medium-length black hair and a scarf, standing in front of a car, luggage in hand, smiling, sunny day, car parked near a road text: Samiksha: Are we finally going to Agra? Rahul: Yes, we are! Sanjana: I can't wait to see the Taj Mahal. # Panel 2 description: The same family, now in a car, driving on a highway, passing green fields, sun shining through the car windows, family looking excited text: Samiksha: This is so exciting! Rahul: It's going to be an amazing trip. # Panel 3 description: The family standing outside the Taj Mahal, Taj Mahal in the background, white marble structure, intricate designs, blue sky, family in awe, taking photos text: Sanjana: It's even more beautiful than I imagined. Samiksha: Wow, this is incredible! # Panel 4 description: The family walking around the Taj Mahal, exploring the gardens, fountains in the foreground, Taj Mahal still visible in the background, family smiling and enjoying the scenery text: Rahul: Look at these beautiful gardens. Samiksha: Everything is so perfect here. # Panel 5 description: The family posing for a photo in front of the Taj Mahal, camera in one of their hands, Taj Mahal behind them, sun setting, family laughing and having fun text: Sanjana: Let's take a family photo! Samiksha: Perfect moment! # Panel 6 description: The family sitting on a bench near the Taj Mahal, evening setting in, lights illuminating the Taj Mahal, family looking content and happy, sharing a moment together text: Rahul: What a wonderful day. Sanjana: We'll always remember this.
'''
out = extract_panel_info(input_Str)
output_file = "panels1.json"
with open(output_file, "w") as file:
    json.dump(out, file, indent=4)

