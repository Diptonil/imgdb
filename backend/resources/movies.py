import uuid

from flask import request
from flask_restful import Resource

from common.queries import (
    RATE_MOVIE_OR_SHOW, 
    CURRENT_RATING, 
    CURRENT_VOTES, 
    CREATE_MOVIE, 
    CREATE_SHOW, 
    STAR_MOVIE_OR_SHOW,
    TRENDING_MOVIES,
    TRENDING_SHOWS
)
from common.utils import is_rating_correct, authorize

# MAKE FUNCTION FOR AUTHORIZATION


class TrendingMovies(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def get(self):
        with self.database_driver.session() as session:
            result = list(session.run(TRENDING_MOVIES).single())
            if not result:
                return ({'status': 'No trending movies at the moment.'}, 400)
            return ({'status': 'The trending movies at the moment have been fetched.', 'movies': result}, 200)


class TrendingShows(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def get(self):
        with self.database_driver.session() as session:
            result = list(session.run(TRENDING_SHOWS).single())
            if not result:
                return ({'status': 'No trending shows at the moment.'}, 400)
            return ({'status': 'The trending shows at the moment have been fetched.', 'shows': result}, 200)


class RateMovieOrShow(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        token = data.get('token')
        movie_id = data.get('movie_id')
        rating = data.get('rating')
        entries = {'id': movie_id, 'rating': rating}
        result = None
        if not authorize(token):
            return ({'status': 'You aren\'t authorized to access this resource.', 'token': token}, 400)
        if not is_rating_correct(rating):
            return ({'status': 'The value of the rating must be between zero and ten.', 'token': token}, 400)
        with self.database_driver.session() as session:
            result = session.run(CURRENT_RATING, entries).single()[0]
            votes = session.run(CURRENT_VOTES, entries).single()[0]
            entries['new_rating'] = (result + rating) / (votes + 1)
            result = session.run(RATE_MOVIE_OR_SHOW, entries).single()
        if result == entries['new_rating']:
            return ({'status': 'Rating has been succesfully added.'}, 200)
        return ({'status': 'Unable to add movie.'}, 400)


class StarMovieOrShow(Resource):
    pass


class UnStarMovieOrShow(Resource):
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
        entries = {'id': movie_id, 'title': title, 'language': language, 'length': length, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description}
        result = None
        if not authorize(token):
            return ({'status': 'You aren\'t authorized to access this resource.', 'token': token}, 400)
        with self.database_driver.session() as session:
            result = session.run(CREATE_MOVIE, entries).single()[0]
        if result == movie_id:
            return ({'status': 'Movie has been succesfully added.', 'token': token}, 200)
        return ({'status': 'Unable to add movie.', 'token': token}, 400) 


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
        entries = {'id': show_id, 'title': title, 'language': language, 'seasons': seasons, 'length_per_episode': length_per_episode, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description}
        result = None
        if not authorize(token):
            return ({'status': 'You aren\'t authorized to access this resource.', 'token': token}, 400)
        with self.database_driver.session() as session:
            result = session.run(CREATE_SHOW, entries).single()[0]
        if result == show_id:
            return ({'status': 'Show has been succesfully added.', 'token': token}, 200)
        return ({'status': 'Unable to add show.', 'token': token}, 400)


