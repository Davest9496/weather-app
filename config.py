"""
This module contains configuration settings for the weather app.
It loads environment variables and defines constants used across the application.
"""

import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """
    Configuration class for the weather app.
    
    This class encapsulates various configuration settings such as secret keys and API credentials.
    These values are loaded from environment variables for security reasons.
    """

    SECRET_KEY = os.environ.get('SECRET_KEY')
    OPENWEATHER_API_KEY = os.environ.get('OPEN_WEATHER_MAP_APPID')
