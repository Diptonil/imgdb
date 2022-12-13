from flask import request
from flask_restful import Resource

from common.queries import CREATE_USER, CHECK_USER, CHECK_USERNAME
from common.utils import User, is_password_strong

    
class Login(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if not username:
            return ({'status': 'This field is required.'}, 400)
        if not password:
            return ({'status': 'This field is required.'}, 400)
        entries = {'username': username, 'password': password}
        with self.database_driver.session() as session:
            result = session.run(CHECK_USER, entries).single()
            try:
                user = User(username=username, password=password)
                user.id = result
                auth_token = user.encode_auth_token(user.id)
                if result is not None:
                    return ({'status': 'Login successful.', 'token': auth_token.decode()}, 201)
                return ({'status': 'Login unsuccessful. Please recheck your credentials.'}, 401)
            except:
                return ({'status': 'Login unsuccessful. There is some problem with the server. Please try again later.'}, 500)       
        

class Register(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver
    
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        date_of_birth = data.get('date_of_birth')
        avatar = data.get('avatar')
        user = User(username=username, password=password)
        entries = {'id': user.id, 'username': username, 'password': password, 'date_of_birth': date_of_birth, 'avatar': avatar}
        result = is_password_strong(password)
        if not result[0]:
            return ({'status': 'Registration unsuccessful. ' + result[1]}, 400)
        with self.database_driver.session() as session:
            if session.run(CHECK_USERNAME, entries).single() is None:
                return ({'status': 'Registration unsuccessful. Username already exists'}, 400)
            try:
                user = User(username=username, password=password)
                auth_token = user.encode_auth_token(user.id)
                session.run(CREATE_USER, entries)
                return ({'status': 'Registration successful.', 'token': auth_token}, 201)
            except:
                return ({'status': 'Registration unsuccessful. Some error occured.'}, 401)        


class Logout(Resource):

    def get(self):
        token = request.get_json().get('token')
        if token:
            return ({'status': 'Logout successful.'}, 200)
        else:
            return ({'status': 'Logout unsuccessful. No logins found'}, 400)