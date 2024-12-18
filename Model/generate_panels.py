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
import time
from io import BytesIO
from gradio_client import Client
from dotenv import load_dotenv
from cloudinary_utils import upload_text_to_cloudinary, read_text_from_cloudinary
from config import LLM_MODEL

load_dotenv()



def generate_panels(prompt, template, user_id, comic_title):
    """
    Generate comic panels based on a given prompt and template.

    Args:
        prompt (str): The prompt to generate panels.
        template (str): The template to use for generating panels.

    Returns:
        list: A list of dictionaries containing panel information.
    """
    Retries = 0
    Max_retries = 5
    while Retries < Max_retries:
        try:
            client = Client(LLM_MODEL)
            result = client.predict(
                    query = prompt,
                    system=template,
                    api_name="/model_chat"
            )
            break
        except Exception as e:
            Retries += 1
            if "MaxRetryError" in str(e):
                print(f"Quota exceeded. Waiting for 2 minutes before retrying...")
                time.sleep(120)  # Wait 5 minutes
            else:
                print(e)
                break
    if Retries == Max_retries:
        raise RuntimeError(f"Failed to generate.")

    panel_text = result[1][0][1]
    text_file = BytesIO(panel_text.encode('utf-8'))
    file_url = upload_text_to_cloudinary(text_file, user_id, comic_title, 1)
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

