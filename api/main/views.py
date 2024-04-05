from django.http import JsonResponse
from yt_dlp import YoutubeDL
import time
from . import util
from .models import Data
import json


SECRET_KEY = 'AK)D%CBc$-rhbM7bQ^&0wZ_Oi+9A2$)O'
HOME_CONTENT_URL = 'RDCLAK5uy_n9Fbdw7e6ap-98_A-8JYBmPv64v-Uaq1g'
SUGGESTION_EXPIRATION = 300000  # in milliseconds, after 5mins
PLAYLIST_EXPIRATION = 86400000  # in milliseconds, after 24hours
RESULTS_EXPIRATION = 600000  # in milliseconds, after 10mins


def getPlaylist(identifier):
    inst = Data.objects.filter(
        type='playlist', identifier=identifier)
    if len(inst) < 1:
        data = util.get_browse(identifier)
        new_inst = Data(type='playlist', identifier=identifier,
                        data=json.dumps(data), expiration=round(time.time() * 1000) + PLAYLIST_EXPIRATION)
        new_inst.save()
        return data
    elif inst.first().expiration <= round(time.time() * 1000):
        data = util.get_browse(identifier)
        inst = inst.first()
        inst.data = json.dumps(data)
        inst.expiration = round(time.time() * 1000) + PLAYLIST_EXPIRATION
        inst.save()
        return data
    else:
        data = inst.first().data
        return json.loads(data)


def getSuggestions(query, previous_query):
    inst = Data.objects.filter(
        type='suggestions', identifier=query + ' ' + previous_query)
    if len(inst) < 1:
        data = util.get_suggestions(query, previous_query)
        new_inst = Data(type='suggestions', identifier=query + ' ' + previous_query,
                        data=json.dumps(data), expiration=round(time.time() * 1000) + SUGGESTION_EXPIRATION)
        new_inst.save()
        return data
    elif inst.first().expiration <= round(time.time() * 1000):
        data = util.get_suggestions(query, previous_query)
        inst = inst.first()
        inst.data = json.dumps(data)
        inst.expiration = round(time.time() * 1000) + SUGGESTION_EXPIRATION
        inst.save()
        return data
    else:
        data = inst.first().data
        return json.loads(data)


def getResults(query):
    inst = Data.objects.filter(
        type='search_results', identifier=query)
    if len(inst) < 1:
        data = util.get_search_results(query)
        new_inst = Data(type='search_results', identifier=query,
                        data=json.dumps(data), expiration=round(time.time() * 1000) + PLAYLIST_EXPIRATION)
        new_inst.save()
        return data
    elif inst.first().expiration <= round(time.time() * 1000):
        data = util.get_search_results(query)
        inst = inst.first()
        inst.data = json.dumps(data)
        inst.expiration = round(time.time() * 1000) + PLAYLIST_EXPIRATION
        inst.save()
        return data
    else:
        data = inst.first().data
        return json.loads(data)


def home(req):
    return JsonResponse({
        'results': getPlaylist(HOME_CONTENT_URL)
    })


def suggestions(req):
    if req.method == "GET":
        return JsonResponse(
            {
                'result': getSuggestions(req.GET['query'], req.GET['previous_query'])
            }
        )


def search_results(req):
    if req.method == "GET":
        return JsonResponse({'results': getResults(req.GET['query'])})


def song_url(req):
    if req.method == "GET":
        id = req.GET['id']
        yt = YoutubeDL({'quiet': True}).extract_info(
            url='https://www.youtube.com/watch?v=' + id, download=False)

        return JsonResponse(
            {
                'url': util.get_best_audio(yt['formats'])['url']
            }
        )
