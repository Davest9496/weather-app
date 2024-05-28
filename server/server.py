"""
This module contains a Flask application that serves weather data from the OpenWeatherMap API.
"""

import os
import requests
from flask import Flask, jsonify, request, render_template
from dotenv import load_dotenv
from Location.ip_coords import get_coords
from date_time.date_time import *
import datetime

load_dotenv()  # Load environment variables from .env file
app = Flask(__name__)
APPID = os.getenv("OPEN_WEATHER_MAP_APPID")

@app.route('/')
def home():
    """
    This function handles the root route ('/') and renders the home page.
    """
    return render_template('index.html')

def get_daily_weather_data(daily_data):
    """
    Takes a list of daily weather data and returns a formated list
    with the forecast for each day.
    """
    forecast_obj = []
    for day in daily_data:
        # Convert sunrise and sunset timestamps to datetime objects
        sunrise_dt = datetime.datetime.fromtimestamp(day['sunrise'])
        sunset_dt = datetime.datetime.fromtimestamp(day['sunset'])

        # Format sunrise and sunset times
        sunrise_str = sunrise_dt.strftime('%I:%M %p').lstrip('0')  # Remove leading zero if present
        sunset_str = sunset_dt.strftime('%I:%M %p').lstrip('0')  # Remove leading zero if present

        forecast = { 
            'day' : datetime.datetime.fromtimestamp(day['dt']).strftime('%A %d'),               
            'month' : datetime.datetime.fromtimestamp(day['dt']).strftime('%B %d'),
            'max': day['temp']['max'],
            'min': day['temp']['min'],
            'summary' : day['summary'],
            'icon' : day['weather'][0]['icon'],
            'humidity' : day['humidity'],
            'pressure' : day['pressure'],
            'wind_speed' : day['wind_speed'],
            'wind_deg' : day['wind_deg'],
            'feels_like' : day['feels_like'],
            'weather_description' : day['weather'][0]['description'],
            'uv_index' : day['uvi'],
            'clouds' : day['clouds'],
            'dew_point' : day['dew_point'],
            'pop' : day['pop'],
            'sunrise' : sunrise_str, 
            'sunset' : sunset_str
        }
        forecast_obj.append(forecast)
        
    return forecast_obj

@app.route('/api')
def main():
    """
    This function handles the '/api' route. 
    It gets the coordinates from the 'get_coords' function,
    makes a request to the OpenWeatherMap API, 
    and returns the current weather data and the weather data for the next day.
    """
    unit = 'metric'
    lat, lon, state, country = get_coords()

    url = (
        "https://api.openweathermap.org/data/3.0/onecall?"
        f"lat={lat}&lon={lon}&exclude=hourly,minutely&appid={APPID}"
        f"&units={unit}&lang=en"
    )
    try:
        response = requests.get(url, timeout=5)
        data = response.json()
        current_data = data['current']
        daily_data = data['daily']
        eight_days_forecast = get_daily_weather_data(daily_data)
        
        client_data = {
            'city': data['timezone'].split('/')[1],
            'country': country,
            'current_temp': current_data['temp'],
            'current_humidity': current_data['humidity'],
            'current_pressure': current_data['pressure'],
            'current_feels_like': current_data['feels_like'],
            'current_wind_speed': current_data['wind_speed'],
            'current_wind_deg': current_data['wind_deg'],
            'current_weather_description': current_data['weather'][0]['description'],
            'current_weather_icon': current_data['weather'][0]['icon'],
            'daily_forecast' : eight_days_forecast
        }
        return jsonify(client_data)
    except requests.exceptions.Timeout:
        print("The request timed out")
    return None

if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=8000)
