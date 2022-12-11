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

AUTHORIZATION = \
    """
    MATCH (user: User {id: $token})
    RETURN user
    """

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
    CREATE (movie: Movie {id: $id, title: $title, language: $language, length: $length, genre: $genre, description: $description, rating: -1, votes: 0 stars: 0})
    RETURN movie.id
    """

CREATE_SHOW = \
    """
    CREATE (show: Show {id: $id, title: $title, language: $language, seasons: $seasons, length_per_episode: $length_per_episode, genre: $genre, description: $description, rating: -1, votes: 0, stars: 0})
    RETURN show.id
    """

CURRENT_RATING = \
    """
    MATCH (item: Movie {id: $id}) 
    RETURN item.rating
    UNION ALL
    MATCH (item: Show {id: $id}) 
    RETURN item.rating
    """

CURRENT_VOTES = \
    """
    MATCH (item: Movie {id: $id}) 
    RETURN item.votes
    UNION ALL
    MATCH (item: Show {id: $id}) 
    RETURN item.votes
    """

RATE_MOVIE_OR_SHOW = \
    """
    MATCH (item: Movie {id: $id}) 
    SET item.rating = $new_rating
    RETURN item.rating
    UNION ALL
    MATCH (item: Show {id: $id}) 
    SET item.rating = $new_rating
    RETURN item.rating
    """

STAR_MOVIE_OR_SHOW = \
    """
    
    """

UNSTAR_MOVIE_OR_SHOW = \
    """
    
    """