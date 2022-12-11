from common.queries import USER_CONSTRAINTS, MOVIE_CONSTRAINTS


class User:

    def __init__(self):
        self.has_logged_in = False

    def get_login_status(self):
        return self.has_logged_in

    def login(self):
        self.has_logged_in = True

    def logout(self):
        self.has_logged_in = False


def initializer(database_driver):
    with database_driver.session() as session:
        session.run(MOVIE_CONSTRAINTS)
        session.run(USER_CONSTRAINTS)


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
