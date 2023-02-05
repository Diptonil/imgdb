import datetime
from flask_restful import Resource
import jwt
from reportlab.pdfgen import canvas
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from reportlab.lib import colors
import uuid

from common.constants import SECRET_KEY
from common.queries import USER_CONSTRAINTS, MOVIE_CONSTRAINTS, AUTHORIZATION, EXPLORE


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


class MakePDF(Resource):

    def __init__(self, database_driver) -> None:
        self.database_driver = database_driver

    def get(self):
        pdf = canvas.Canvas('D:\\programs\\git\\imgdb\\backend\\common\\pdf.pdf')
        pdf.setTitle('PDF')
        with self.database_driver.session() as session:
            results = session.run(EXPLORE).single()[0]
            if not results:
                return ({'status': 'Could not fetch information at the moment'}, 400)
            final = []
            for result in results:
                final.append(result['title'])
        pdf.drawCentredString(300, 770, 'List of movies')
        text = pdf.beginText(40, 680)
        text.setFont("Courier", 8)
        text.setFillColor(colors.blue)
        for line in final:
            text.textLine(line)
        pdf.drawText(text)
        pdf.drawInlineImage('D:\\programs\\git\\imgdb\\backend\\common\\image.jpg', 10, 700)
        pdf.save()
        return ({'status': 'Done.'}, 200) 
            