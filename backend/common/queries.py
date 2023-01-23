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
    CREATE (user: User {id: $id, username: $username, password: $password})
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
    CREATE (movie: Movie {id: $id, title: $title, language: $language, length: $length,  income: $income, year_of_realease: $year_of_release, genre: $genre, description: $description, poster_path: $poster_path, rating: -1, votes: 0, stars: 0})
    """

CREATE_SHOW = \
    """
    CREATE (show: Show {id: $id, title: $title, language: $language, seasons: $seasons, length_per_episode: $length_per_episode, genre: $genre, description: $description, rating: -1, votes: 0, stars: 0})
    """

GET_MOVIE = \
    """
    MATCH (item: Movie {id: $id})
    RETURN item
    """

GET_SHOW = \
    """
    MATCH (item:Show {id: $id})
    RETURN item
    """

EXPLORE = \
    """
    MATCH (movie: Movie)
    RETURN COLLECT(movie)
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

CREATE_PERSON = \
    """
    CREATE (person: Person {id: $id, name: $name, role: $role})
    """