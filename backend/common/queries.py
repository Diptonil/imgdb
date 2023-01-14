# Constraints

MOVIE_CONSTRAINTS = \
    """
    CREATE CONSTRAINT
    FOR (movie: Movie)
    REQUIRES (movie: id) IS UNIQUE
    """

SHOW_CONSTRAINTS = \
    """
    CREATE CONSTRAINT
    FOR (show: Show)
    REQUIRES (show: id) IS UNIQUE
    """

USER_CONSTRAINTS = \
    """
    CREATE CONSTRAINT
    FOR (user: User)
    REQUIRES (user: username) IS UNIQUE
    """

# Authentication Queries

AUTHORIZATION = \
    """
    MATCH (user: User {id: $token})
    RETURN user
    """

CREATE_USER = \
    """
    CREATE (user: User {id: $id, username: $username, password: $password, date_of_birth: $date_of_birth, avatar: $avatar})
    """

CHECK_USERNAME = \
    """
    
    """

CHECK_USER = \
    """
    
    """

# Movie and Series Queries

CREATE_MOVIE = \
    """
    CREATE (movie: Movie {id: $id, title: $title, language: $language, length: $length,  income: $income, year_of_realease: $year_of_release, genre: $genre, description: $description, poster_path: $poster_path, rating: -1, votes: 0 stars: 0})
    """

CREATE_SHOW = \
    """
    CREATE (show: Show {id: $id, title: $title, language: $language, seasons: $seasons, length_per_episode: $length_per_episode, genre: $genre, description: $description, rating: -1, votes: 0, stars: 0})
    """

CURRENT_RATING = \
    """

    """

CURRENT_VOTES = \
    """

    """

RATE_MOVIE_OR_SHOW = \
    """

    """

STAR_MOVIE_OR_SHOW = \
    """
    
    """

UNSTAR_MOVIE_OR_SHOW = \
    """
    
    """

TRENDING_MOVIES = \
    """

    """

TRENDING_SHOWS = \
    """
    """