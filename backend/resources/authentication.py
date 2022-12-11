import uuid

from flask import request
from flask_restful import Resource

from common.queries import CREATE_USER, CHECK_USER, CHECK_USERNAME
from common.utils import is_password_strong


class Login(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        result = None
        if not username:
            return ({'status': 'This field is required.'}, 400)
        if not password:
            return ({'status': 'This field is required.'}, 400)
        entries = {'username': username, 'password': password}
        with self.database_driver.session() as session:
            result = session.run(CHECK_USER, entries).single()
        if result is not None:
            return ({'status': 'Login successful.', 'token': result[0]}, 200)
        return ({'status': 'Login unsuccessful. Please recheck your credentials.'}, 400)


class Register(Resource):

    def __init__(self, database_driver):
        self.database_driver = database_driver
    
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        date_of_birth = data.get('date_of_birth')
        avatar = data.get('avatar')
        entries = {'id': str(uuid.uuid4()), 'username': username, 'password': password, 'date_of_birth': date_of_birth, 'avatar': avatar}
        result = is_password_strong(password)
        if not result[0]:
            return ({'status': 'Registration unsuccessful. ' + result[1]}, 400)
        with self.database_driver.session() as session:
            if session.run(CHECK_USERNAME, entries).single() is None:
                return ({'status': 'Registration unsuccessful. Username already exists'}, 400)
            session.run(CREATE_USER, entries)
        return ({'status': 'Registration successful. You need to log in now.'}, 200)


class Logout(Resource):

    def get(self):
        token = request.get_json().get('token')
        if token:
            return ({'status': 'Logout successful.'}, 200)
        else:
            return ({'status': 'Logout unsuccessful. No logins found'}, 400)