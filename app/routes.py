"""
This module defines routes for the weather application.
It includes the blueprint for the main page and handles both GET and POST requests.
"""

from flask import Blueprint, render_template, request, jsonify
from app.weather_services import get_weather_data

bp = Blueprint('main', __name__)

@bp.route('/', methods=['GET', 'POST'])
def index():
    """
    Handles both GET and POST requests to the root URL ('/').

    If a POST request is made, it extracts the location and units from the form data,
    retrieves the corresponding weather data, and returns it as JSON.

    For GET requests, it simply renders the index.html template.
    """

    if request.method == 'POST':
        data = request.get_json()
        location = data.get('location')
        units = data.get('units', 'metric')
        #--------------Debug----------------#
        print(f"Received request for location: {location}, units: {units}")

        weather_data = get_weather_data(location, units)
        return jsonify(weather_data)
    return render_template('index.html')
