import time
import random
import requests

taken_movie_ids = list()
number = None

try:
    with open('taken-movies.txt', 'r') as file:
        taken_movie_ids = file.readlines()
        for i in range(len(taken_movie_ids)):
            taken_movie_ids[i] = int(taken_movie_ids[i][:-1])
        print(taken_movie_ids)
except Exception:
    pass

while True:
    while True:
        number = random.randint(0, 10000)
        if number not in taken_movie_ids:
            taken_movie_ids.append(number)
            break
        continue

    movie_data = dict()
    while True:
        movie_data = requests.get('https://api.themoviedb.org/3/movie/%s?api_key=9021726334d14bbe9f883a67669118f1&append_to_response=credits' % str(number)).json()
        print('https://api.themoviedb.org/3/movie/%s?api_key=9021726334d14bbe9f883a67669118f1' % str(number))

        try:
            if not movie_data['success']:
                number += 1
                continue
        except:
            break

    id = movie_data['id']
    poster_path = movie_data['poster_path']
    title = movie_data['original_title']
    language = movie_data['original_language'].upper()
    length = movie_data['runtime']
    income = movie_data['revenue']
    year_of_release = movie_data['release_date'][: 4]
    genre = movie_data['genres'][0]['name']
    genres = movie_data['genres']
    popularity = movie_data['popularity']
    description = movie_data['overview']

    cast1 = movie_data['credits']['cast'][0]['name']
    cast2 = movie_data['credits']['cast'][1]['name']

    for crew in movie_data['credits']['crew']:
        if crew['job'] == 'Director':
            global director
            director = crew['name']
            break

    request = {'id': id, 'title': title, 'language': language, 'length': length, 'income': income, 'year_of_release': year_of_release, 'description': description, 'genre': genre, 'poster_path': poster_path, 'popularity': popularity}
    final_response = requests.post('http://localhost:5000/movie/create', json=request)

    rank = 1
    for genre in genres:
        relation_rank = rank
        name = genre['name']
        genre_request = {'name': name, 'movie_id': id, 'relation_rank': relation_rank}
        genre_response = requests.post('http://localhost:5000//genre/get', json= genre_request)
        rank += 2

    cast1_request = {'name': cast1, 'role': 'Actor', 'movie_id': id}
    cast1_response = requests.post('http://localhost:5000/person/create', json=cast1_request)
    cast2_request = {'name': cast2, 'role': 'Actor', 'movie_id': id}
    cast2_response = requests.post('http://localhost:5000/person/create', json=cast2_request)

    director_request = {'name': director, 'role': 'Director', 'movie_id': id}
    director_response = requests.post('http://localhost:5000/person/create', json=director_request)
    print(taken_movie_ids)

    with open('taken-movies.txt', 'a') as file:
        file.write(str(number) + '\n')
    time.sleep(10)