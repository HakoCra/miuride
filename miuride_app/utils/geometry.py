import json

import requests

from django.conf import settings


def get_distance(ox, oy, dx, dy):
    url = "https://maps.googleapis.com/maps/api/distancematrix/json"
    q = {
        "key": settings.GCP_API_KEY,
        "origins": "{},{}".format(ox, oy),
        "destinations": "{},{}".format(dx, dy),
        "mode": "walking"
    }

    ret = requests.get(url, params=q)

    obj = ret.json()
    print(ret.json())

    distance = obj["rows"][0]["elements"][0]["distance"]["value"]
    duration = obj["rows"][0]["elements"][0]["duration"]["value"]
    return distance
