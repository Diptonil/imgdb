import random
import requests

number = random.randint(0, 10000)
movie_data = requests.get('https://api.themoviedb.org/3/movie/%s?api_key=9021726334d14bbe9f883a67669118f1' % str(number)).json()
title = movie_data['original_title']
language = movie_data['original_language']
length = movie_data['runtime']
income = movie_data['revenue']
year_of_release = movie_data['release_date'][: 4]
genre = movie_data['genres'][0]['name']
description = movie_data['overview']

request = {'title': title, 'language': language, 'length': length, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description}

final_response = requests.post('localhost:5000/create/movie', json=request).json()
print(final_response['status'])