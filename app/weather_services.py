"""
This module provides functions related to fetching and processing weather data
from external APIs, specifically tailored for the weather application.
"""

import requests
from flask import current_app # read up current_app


def get_weather_data(location, units='metric', timeout=5):
    """
    Fetches weather data for a given location using the OpenWeatherMap API.

    Args:
        location (str): The location for which to retrieve weather data.
        units (str, optional): The unit system to use ('metric' or 'imperial').
        Defaults to 'metric'. timeout (float, optional): Timeout value for the HTTP 
        request in seconds. Defaults to 5.

    Returns:
        dict: A dictionary containing weather data for the specified location.

    Raises:
        Exception: If there's an error during the API call or data processing.
    """

    openweather_api_key = current_app.config['OPENWEATHER_API_KEY']

    # Geocoding API call
    geo_url = (
    f"http://api.openweathermap.org/geo/1.0/direct?q="
    f"{location}&appid={openweather_api_key}"
    )
    geo_response = requests.get(geo_url, timeout=timeout)
    geo_data = geo_response.json()

    if not geo_data:
        return {'error': 'Location not found'}

    lat, lon = geo_data[0]['lat'], geo_data[0]['lon']

    # Weather API call
    weather_url = (
        f"https://api.openweathermap.org/data/3.0/onecall?"
        f"lat={lat}&lon={lon}&exclude=hourly,minutely&appid={openweather_api_key}"
        f"&units={units}&lang=en"
    )
    weather_response = requests.get(weather_url, timeout=timeout)
    weather_data = weather_response.json()

    return weather_data
