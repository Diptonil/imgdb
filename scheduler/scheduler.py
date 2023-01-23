import time
import random
import requests

taken_movie_ids = list()
number = None

# with open('taken-movies.txt', 'r') as file:
#     taken_movie_ids = file.readlines()
#     for i in range(len(taken_movie_ids)):
#         taken_movie_ids[i] = int(taken_movie_ids[i][:-1])
#     print(taken_movie_ids)

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
    description = movie_data['overview']

    cast1 = movie_data['credits']['cast'][0]['name']
    cast2 = movie_data['credits']['cast'][1]['name']

    for crew in movie_data['credits']['crew']:
        if crew['job'] == 'Director':
            global director
            director = crew['name']
            break


    request = {'id': id, 'title': title, 'language': language, 'length': length, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description, 'poster_path': poster_path}
    final_response = requests.post('http://localhost:5000/movie/create', json=request)

    cast1_request = {'name': cast1, 'role': 'Actor'}
    cast1_response = requests.post('http://localhost:5000/person/create', json=cast1_request)
    cast2_request = {'name': cast2, 'role': 'Actor'}
    cast2_response = requests.post('http://localhost:5000/person/create', json=cast2_request)

    director_request = {'name': director, 'role': 'Director'}
    director_response = requests.post('http://localhost:5000/person/create', json=director_request)
    print(taken_movie_ids)

    with open('taken-movies.txt', 'a') as file:
        file.write(str(number) + '\n')
    time.sleep(60)
