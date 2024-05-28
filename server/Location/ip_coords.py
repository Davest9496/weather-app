from flask import Flask, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from.env file
app = Flask(__name__)
APPID = os.getenv("OPEN_WEATHER_MAP_APPID")

@app.route('/get_coords', methods=['POST'])
def get_coords():
    location = 'stratford'
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={location}&appid={APPID}"
    response = requests.get(geo_url)
    if response.status_code == 200:
        data = response.json()
        if data:
            lat = data[0]['lat']
            lon = data[0]['lon']
            state = data[0]['state']
            country = data[0]['country']
            return lat, lon, state, country
        else:
            return None, None, None, None
    else:
        return f"Data not found for your chosen city!"

# Example usage
# lat, lon, state, country = get_coords('london')
# print(f"Latitude: {lat}, Longitude: {lon}, State: {state}, Country: {country}")