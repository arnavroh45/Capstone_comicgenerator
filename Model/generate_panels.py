"""
This module provides functions to generate comic panels based on a given prompt and template.
"""
# pylint: disable=too-many-locals
# pylint: disable=missing-function-docstring
# pylint: disable=no-name-in-module
# pylint: disable=import-error
# pylint: disable=line-too-long
# pylint: disable=raise-missing-from

import re
import os
from io import BytesIO
from gradio_client import Client
from dotenv import load_dotenv
from cloudinary_utils import upload_text_to_cloudinary, read_text_from_cloudinary
from config import LLM_MODEL

load_dotenv()

def generate_panels(prompt, template):
    """
    Generate comic panels based on a given prompt and template.

    Args:
        prompt (str): The prompt to generate panels.
        template (str): The template to use for generating panels.

    Returns:
        list: A list of dictionaries containing panel information.
    """
    client = Client(LLM_MODEL)
    result = client.predict(
            query = prompt,
            system=template,
            api_name="/model_chat"
    )
    panel_text = result[1][0][1]
    text_file = BytesIO(panel_text.encode('utf-8'))
    file_url = upload_text_to_cloudinary(text_file, "user1", "comic_title_1", 1)
    text = read_text_from_cloudinary(file_url)
    # Save the text to a file and read from it again
    # with open('panel_new_1.txt', 'w') as file:
    #     file.write(panel_text)

    # with open('panel_new_1.txt', 'r') as file:
    #     text = file.read()

    # Extract and return panels from the read file
    print(text, type(text))
    return extract_panel_info(text)

def extract_panel_info(input_string):
    """
    Extract panel information from the input string.

    Args:
        input_string (str): The input string containing panel information.

    Returns:
        list: A list of dictionaries containing extracted panel information.
    """
    # panel_data = re.split(r'# Panel \d+', input_string.strip())
    panel_data = re.split(r'# Panel \d+', input_string.strip(), flags=re.IGNORECASE)

    # List to store the JSON output
    panels_list = []
    # Loop through each panel and extract information
    for i, panel in enumerate(panel_data[1:], start=1):  # Skip the first split part (introductory text)
        # Extract description and text using regex
        description_match = re.search(r"description:\s*(.+?)\ntext:", panel, re.DOTALL | re.IGNORECASE)
        text_match = re.search(r"text:\s*(.+?)$", panel, re.DOTALL | re.IGNORECASE)
        # Extract values or default to empty string
        description = description_match.group(1).strip() if description_match else ""
        text = text_match.group(1).strip() if text_match else ""

        # Create dictionary for JSON output
        panel_dict = {
            "number": i,
            "Description": description,
            "Background": "",  # Background can be filled if available later
            "Text": text
        }
        # Append to the list
        panels_list.append(panel_dict)
    return panels_list

