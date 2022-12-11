from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from neo4j import GraphDatabase, basic_auth

from common.constants import SECRET_KEY, MOVIE_DATABASE_PASSWORD, MOVIE_DATABASE_URL, MOVIE_DATABASE_USERNAME
from common.utils import initializer
from resources.authentication import Login, Logout, Register
from resources.movies import AddMovie, AddShow, RateMovieOrShow

app = Flask(__name__)
api = Api(app)
CORS(app)
app.config['SECRET_KEY'] = SECRET_KEY

database_driver = GraphDatabase.driver(MOVIE_DATABASE_URL, auth=basic_auth(MOVIE_DATABASE_USERNAME, str(MOVIE_DATABASE_PASSWORD)))
initializer(database_driver)

# Authentication resources
api.add_resource(Login, '/login', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register', resource_class_kwargs={'database_driver': database_driver})

# Movie resources
api.add_resource(AddShow, '/create/show', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(AddMovie, '/create/movie', resource_class_kwargs={'database_driver': database_driver})
api.add_resource(RateMovieOrShow, '/rate', resource_class_kwargs={'database_driver': database_driver})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
