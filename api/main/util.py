import jwt
import requests
import json


def convert_timestamp_to_seconds(timestamp):
    parts = timestamp.split(':')
    if len(parts) == 2:
        hours = 0
        minutes, seconds = map(int, parts)
    elif len(parts) == 3:
        hours, minutes, seconds = map(int, parts)

    total_seconds = hours * 3600 + minutes * 60 + seconds

    return total_seconds


def generateToken(header, payload, secretKey):
    return jwt.encode(payload, secretKey, headers=header, algorithm='HS256')


def validateToken(token, secretKey):
    return jwt.decode(token, secretKey, algorithms=['HS256'])


def get_browse(playlist_id):
    requestBody = {
        'context':
            {
                'client':
                    {'clientName': 'WEB',
                     'clientVersion': '2.20210224.06.00',
                     'newVisitorCookie': True},
                    'user': {
                        'lockedSafetyMode': False
                    }
            }
    }
    requestBody['browseId'] = 'VL' + playlist_id
    requestBody['client'] = {
        'hl': 'en',
        'gl': 'IN',
    }
    response = requests.post(
        'https://www.youtube.com/youtubei/v1/browse', json=requestBody, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
        })

    response = json.loads(response.text)['contents']['twoColumnBrowseResultsRenderer']['tabs'][0]['tabRenderer']['content'][
        'sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents'][0]['playlistVideoListRenderer']['contents']

    data = []

    for x in response:
        try:
            x_ = x['playlistVideoRenderer']
            duration = None
            try:
                duration = x_['lengthText']['simpleText']
            except:
                pass
            if convert_timestamp_to_seconds(duration) < 7200:
                data.append(
                    {
                        'id': x_['videoId'],
                        'title': x_['title']['runs'][0]['text'],
                        'thumbnail': x_['thumbnail']['thumbnails'][0]['url'].split('?')[0],
                        'duration': duration
                    }
                )
        except:
            pass

    return data


get_browse('PL9bw4S5ePsEEqCMJSiYZ-KTtEjzVy0YvK')


def get_suggestions(query, previous_query):
    response = requests.get('https://suggestqueries-clients6.youtube.com/complete/search', {
        'client': 'youtube',
        'hl': 'en',
        'gl': 'in',
        'gs_rn': '64',
        'gs_ri': 'youtube',
        'ds': 'yt',
        'q': query,
        'pq': previous_query
    })

    r = response.text
    r = [x[0] for x in json.loads(r[r.index('['):r.rfind(')')])[1]]
    return r


def get_search_results(query):
    requestBody = {
        'context':
            {
                'client':
                    {'clientName': 'WEB',
                     'clientVersion': '2.20210224.06.00',
                     'newVisitorCookie': True},
                    'user': {
                        'lockedSafetyMode': False
                    }
            }
    }
    requestBody['query'] = query
    requestBody['client'] = {
        'hl': 'en',
        'gl': 'IN',
    }
    response = requests.post(
        'https://www.youtube.com/youtubei/v1/search', json=requestBody, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
        })
    response = json.loads(response.text)
    response = response['contents']['twoColumnSearchResultsRenderer']['primaryContents'][
        'sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents']

    data = []
    for x in response:
        try:
            x = x['videoRenderer']
            duration = None
            try:
                duration = x['lengthText']['simpleText']
            except:
                pass
            if convert_timestamp_to_seconds(duration) < 7200:
                data.append(
                    {
                        'id': x['videoId'],
                        'title': x['title']['runs'][0]['text'],
                        'thumbnail': x['thumbnail']['thumbnails'][0]['url'].split('?')[0],
                        'duration': duration
                    }
                )
        except:
            pass

    return data


def get_best_audio(streams):
    crrMax = streams[0]
    for stream in streams:
        if (stream.get('acodec') != 'none' and stream.get('vcodec') == 'none'):
            def _sortkey(x):
                return int(x.get('abr', 0) * 1024 if x.get('abr', 0) else 0)

            crrMax = max(crrMax, stream, key=_sortkey)

    return crrMax
