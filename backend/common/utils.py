import datetime
import jwt
import uuid

from common.constants import SECRET_KEY
from common.queries import USER_CONSTRAINTS, MOVIE_CONSTRAINTS, AUTHORIZATION


class User():

    def __init__(self, username, password):
        self.id = str(uuid.uuid4())
        self.username = username
        self.password = password

    def encode_auth_token(self, id):
        try:
            payload = {'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=5), 'iat': datetime.datetime.utcnow(), 'sub': id}
            return jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        try:
            payload = jwt.decode(auth_token, SECRET_KEY)
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return ({'status': 'Signature expired. Please log in again.'})
        except jwt.InvalidTokenError:
            return ({'status': 'Invalid token. Please log in again.'})


def initializer(database_driver):
    with database_driver.session() as session:
        session.run(MOVIE_CONSTRAINTS)
        session.run(USER_CONSTRAINTS)


def authorize(token, database_driver):
    result = None
    if token is None or token == '':
        return False
    with database_driver.session() as session:
        result = session.run(AUTHORIZATION, {'token': token})
    if len(result) > 0:
        return True
    return False


def is_password_strong(password):
    valid_symbols = "!@#$%^&*()_-+={}[]"
    if len(password) < 8:
        return (False, 'Password must be more than eigth characters.')
    if not any(character.isdigit() for character in password):
        return (False, 'Password must have at least one numeric character(s).')
    if any(character.isspace for character in password):
        return (False, 'Password must not have whitespace(s).')
    if not any(character.islower() for character in password):
        return (False, 'Password must have at least one lowercase character(s).')
    if not any(character.isdigit() for character in password):
        return (False, 'Password must have at least one uppercase character(s).')
    if not any(character.isdigit() for character in password):
        return (False, 'Password must have at least one numeric character(s).')
    if not any(character in valid_symbols for character in password):
        return (False, 'Password must have at least one special character(s).')
    return (True, 'Password must have at least one special character(s).')


def is_rating_correct(rating):
    if rating > 10 and rating < 0:
        return True
    return False
