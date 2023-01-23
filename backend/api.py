from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from neo4j import GraphDatabase, basic_auth

from common.constants import SECRET_KEY, MOVIE_DATABASE_PASSWORD, MOVIE_DATABASE_URL, MOVIE_DATABASE_USERNAME
from resources.authentication import Login, Logout, Register
from resources.movies import AddMovie, AddShow, RateMovieOrShow, TrendingMovies, TrendingShows, GetMovieDetails, Explore
from resources.makers import AddPerson, GetActor, GetDirector

app = Flask(__name__)
api = Api(app)
CORS(app)
app.config['SECRET_KEY'] = SECRET_KEY

database_driver = GraphDatabase.driver(MOVIE_DATABASE_URL, auth=basic_auth(MOVIE_DATABASE_USERNAME, str(MOVIE_DATABASE_PASSWORD)))
# initializer(database_driver)

# Authentication resources
api.add_resource(Login, '/login', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register', resource_class_kwargs={'database_driver': database_driver})

# Movie resources
api.add_resource(AddShow, '/show/create', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(AddMovie, '/movie/create', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(RateMovieOrShow, '/rate', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(TrendingShows, '/shows/trending', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(TrendingMovies, '/movies/trending', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(GetMovieDetails, '/movies/get', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(Explore, '/explore', resource_class_kwargs={'database_driver': database_driver})

#Makers resources
api.add_resource(AddPerson, '/person/create', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(GetActor, '/actor/get', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(GetDirector, '/director/get', resource_class_kwargs={'database_driver': database_driver})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
