# Constraints

MOVIE_CONSTRAINTS = \
    """
    CREATE CONSTRAINT
    FOR (movie: Movie)
    REQUIRES (movie: id) IS UNIQUE
    """

USER_CONSTRAINTS = \
    """
    CREATE CONSTRAINT
    FOR (user: User)
    REQUIRES (user: id) IS UNIQUE
    """

# Authentication Queries

CREATE_USER = \
    """
    CREATE (user: User {id: $id, username: $username, password: $password, date_of_birth: $date_of_birth, avatar: $avatar})
    RETURN user
    """

CHECK_USERNAME = \
    """
    MATCH (user: User {username: $username})
    RETURN user
    """

CHECK_USER = \
    """
    MATCH (user: User {username: $username, password: $password})
    RETURN user.id
    """

# Movie and Series Queries

CREATE_MOVIE = \
    """
    CREATE (movie: Movie {id: $id, title: $title, language: $language, length: $length, genre: $genre, description: $description, rating: -1, stars: 0})
    RETURN movie.id
    """

CREATE_SHOW = \
    """
    CREATE (show: Show {id: $id, title: $title, language: $language, seasons: $seasons, length_per_episode: $length_per_episode, genre: $genre, description: $description, rating: -1, stars: 0})
    RETURN show.id
    """

RATE_MOVIE_OR_SHOW = \
    """
    """

STAR_MOVIE_OR_SHOW = \
    """
    
    """

