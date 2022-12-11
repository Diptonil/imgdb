import uuid

from flask import request
from flask_restful import Resource

from common.queries import RATE_MOVIE_OR_SHOW, CREATE_MOVIE, CREATE_SHOW, STAR_MOVIE_OR_SHOW
from common.utils import is_rating_correct

# MAKE FUNCTION FOR AUTHORIZATION

class RateMovieOrShow(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        token = data.get('token')
        movie_id = data.get('movie_id')
        rating = data.get('rating')
        if not is_rating_correct(rating):
            return ({'status': 'The value of the rating must be between zero and ten.', 'token': token}, 400)
        with self.database_driver.session() as session:
            session.run(RATE_MOVIE_OR_SHOW, map)
        # complete


class StarMovieOrShow(Resource):
    pass



class AddMovie(Resource):
    
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        token = data.get('token')
        title = data.get('title')
        movie_id = str(uuid.uuid4())
        language = data.get('language')
        length = data.get('length')
        income = data.get('income')
        year_of_release = data.get('year_of_release')
        genre = data.get('genre')
        description = data.get('description')
        map = {'id': movie_id, 'title': title, 'language': language, 'length': length, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description}
        result = None
        with self.database_driver.session() as session:
            session.run(CREATE_MOVIE, map)
        if result == movie_id:
            return ({'status': 'Movie has been succesfully added.'}, 200)
        return ({'status': 'Unable to add movie.'}, 400) 


class AddShow(Resource):
    
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        token = data.get('token')
        show_id = str(uuid.uuid4())
        title = data.get('title')
        language = data.get('language')
        seasons = data.get('seasons')
        length_per_episode = data.get('length_per_episode')
        income = data.get('income')
        year_of_release = data.get('year_of_release')
        genre = data.get('genre')
        description = data.get('description')
        map = {'id': show_id, 'title': title, 'language': language, 'seasons': seasons, 'length_per_episode': length_per_episode, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description}
        result = None
        with self.database_driver.session() as session:
            result = session.run(CREATE_SHOW, map)
        if result == show_id:
            return ({'status': 'Show has been succesfully added.'}, 200)
        return ({'status': 'Unable to add show.'}, 400)


