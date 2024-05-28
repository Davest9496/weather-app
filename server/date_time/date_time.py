from datetime import datetime

def unix_to_utc_string(unix_timestamp):
    """
    Converts a Unix timestamp to a UTC string.
    """
    # Convert the Unix timestamp to a datetime object
    utc_time = datetime.utcfromtimestamp(unix_timestamp)
    
    # Format the datetime object as a string in the desired format
    utc_string = utc_time.strftime('%A') #, %Y-%m-%d %H:%M:%S
    
    return utc_string

def get_time_of_day():
    """
    Returns the current time of day as a string:
    'morn' for  12am -  9am,
    'day' for  9am -  3pm,
    'eve' for  3pm -  8pm,
    'night' for  8pm -  12 midnight.
    """
    now = datetime.now()
    hour = now.hour

    if  0 <= hour <  9:
        return 'morn'
    elif  9 <= hour <  15:
        return 'day'
    elif  15 <= hour <  20:
        return 'eve'
    else:
        return 'night'
    