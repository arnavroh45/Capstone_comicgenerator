"""
This module provides all the required models.
"""

# pylint: disable=too-few-public-methods
# pylint: disable=missing-class-docstring
# pylint: disable=no-name-in-module
# Model for inputs

from pydantic import BaseModel

class ComicRequest(BaseModel):
    title: str
    scenario: str
    style: str
    template: str
    genre: str

class EditImage(BaseModel):
    prompt: str
