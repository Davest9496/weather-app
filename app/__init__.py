"""
This module contains a Flask application that serves weather data from the OpenWeatherMap API.
"""

from flask import Flask
from flask_bootstrap import Bootstrap
from config import Config
from app import routes


def create_app():
    """
    Create and configure the Flask application.
    
    Returns:
        app: Flask
    """

    app = Flask(__name__)
    app.config.from_object(Config)
    Bootstrap(app)

    # add blueprint to app env
    app.register_blueprint(routes.bp)

    return app
