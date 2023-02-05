import uuid

from flask import request
from flask_restful import Resource

from common.queries import (
    RATE_MOVIE_OR_SHOW, 
    CURRENT_RATING, 
    CURRENT_VOTES, 
    CREATE_MOVIE, 
    CREATE_SHOW, 
    OF_GENRE_RELATION,
    EXPLORE,
    MOVIES_OF_ACTORS_OR_DIRECTORS,
    STAR_MOVIE,
    UNSTAR_MOVIE,
    TRENDING_MOVIES,
    TRENDING_SHOWS,
    RECOMMENDATION, 
    WATCHLISTED_RELATION,
    UNWATCHLIST_RELATION
)
from common.utils import is_rating_correct, authorize


class TrendingMovies(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def get(self):
        with self.database_driver.session() as session:
            results = session.run(TRENDING_MOVIES)
            if not results:
                return ({'status': 'No trending movies at the moment.'}, 400)
            response = dict()
            x = 0
            for result in results:
                response[x] = str(result[0])
                x += 1
            return ({'status': 'The trending movies at the moment have been fetched.', 'movies': response}, 200)


class TrendingShows(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def get(self):
        with self.database_driver.session() as session:
            results = session.run(TRENDING_SHOWS)
            if not results:
                return ({'status': 'No trending movies at the moment.'}, 400)
            response = dict()
            x = 0
            for result in results:
                response[x] = str(result[0])
                x += 1
            return ({'status': 'The trending movies at the moment have been fetched.', 'movies': response}, 200)


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


class StarMovie(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('id')
        username = data.get('username')
        entries = {'id': id, 'username': username}
        with self.database_driver.session() as session:
            session.run(STAR_MOVIE, entries)
        return ({'status': 'Movie has been succesfully starred.'}, 200)


class UnStarMovie(Resource):
    
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('id')
        username = data.get('username')
        entries = {'id': id, 'username': username}
        with self.database_driver.session() as session:
            session.run(UNSTAR_MOVIE, entries)
        return ({'status': 'Movie has been succesfully unstarred.'}, 200)


class AddMovie(Resource):
    
    def __init__(self, database_driver):
        self.database_driver = database_driver
        print("AddMovie has been initialised")

    def post(self):
        data = request.get_json()
        token = data.get('token')
        title = data.get('title')
        movie_id = data.get('id')
        language = data.get('language')
        length = data.get('length')
        income = data.get('income')
        year_of_release = data.get('year_of_release')
        genre = data.get('genre')
        description = data.get('description')
        poster_path = data.get('poster_path')
        popularity = data.get('popularity')
        entries = {'id': movie_id, 'title': title, 'language': language, 'length': length, 'income': income, 'year_of_release': year_of_release, 'genre': genre, 'description': description, 'poster_path': poster_path, 'popularity': popularity}
        with self.database_driver.session() as session:
            session.run(CREATE_MOVIE, entries)
        return ({'status': 'Movie has been succesfully added.', 'token': token}, 200)


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
        if not authorize(token, self.database_driver):
            return ({'status': 'You aren\'t authorized to access this resource.', 'token': token}, 400)
        with self.database_driver.session() as session:
            session.run(CREATE_SHOW, entries).single()[0]
        return ({'status': 'Show has been succesfully added.', 'token': token}, 200)


class GetMovies(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        person_id = data.get('person_id')
        entries = {'person_id': person_id}
        with self.database_driver.session() as session:
            results = session.run(MOVIES_OF_ACTORS_OR_DIRECTORS, entries).single()[0]
            final = []
            for result in results:
                resultList = {}
                for x in result:
                    resultList[x] = result[x]
                final.append(resultList)
            return ({'status': 'The data has been fetched', 'data': final}, 200)


class Explore(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def get(self):
        with self.database_driver.session() as session:
            results = session.run(EXPLORE).single()[0]
            if not results:
                return ({'status': 'Could not fetch information at the moment'}, 400)
            final = []
            for result in results:
                resultList = {}
                for x in result:
                    resultList[x] = result[x]
                final.append(resultList)
            return ({'status': 'The data has been fetched', 'data': final}, 200)


class OfGenre(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('movie_id')
        name = data.get('name')
        relation_rank = data.get('relation_rank')
        entries = {'id': id, 'name':name, 'relation_rank': relation_rank}
        with self.database_driver.session() as session:
            session.run(OF_GENRE_RELATION, entries)
        return ({'status': 'Movie has been succesfully added.'}, 200)


class Recommendation(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        recommend_like = data.get('movie')
        entries = {'recommend_like': recommend_like}
        with self.database_driver.session() as session:
            results = session.run(RECOMMENDATION, entries).single()[0]
            print(results)
            if not results:
                return ({'status': 'Could not fetch information at the moment'}, 400)
            final = []
            for result in results:
                resultList = {}
                for x in result:
                    resultList[x] = result[x]
                final.append(resultList)
            return ({'status': 'The data has been fetched', 'data': final}, 200)


class Watchlisted(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('id')
        username = data.get('username')
        entries = {'id': id, 'username': username}
        with self.database_driver.session() as session:
            session.run(WATCHLISTED_RELATION, entries)
        return ({'status': 'Movie has been succesfully added.'}, 200)


class UnWatchlisted(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('id')
        username = data.get('username')
        entries = {'id': id, 'username': username}
        with self.database_driver.session() as session:
            session.run(UNWATCHLIST_RELATION, entries)
        return ({'status': 'Movie has been succesfully removed.'}, 200)


class GetMovieById(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('id')
        entries = {'id': id}
        with self.database_driver.session() as session:
            results = session.run(MOVIES_OF_ACTORS_OR_DIRECTORS, entries).single()[0]
            final = []
            for result in results:
                resultList = {}
                for x in result:
                    resultList[x] = result[x]
                final.append(resultList)
            return ({'status': 'The data has been fetched', 'data': final}, 200)