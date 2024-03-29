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

CHECK_USER = \
    """
    MATCH (user: User {username: $username, password:$password})
    RETURN user.id
    """


# Movie and Series Queries

CREATE_MOVIE = \
    """
    CREATE (movie: Movie {id: $id, title: $title, language: $language, length: $length,  income: $income, year_of_realease: $year_of_release, genre: $genre, description: $description, poster_path: $poster_path, rating: -1, votes: 0, stars: 0, popularity: $popularity})
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

TRENDING_MOVIES = \
    """
    MATCH (movie: Movie)
    RETURN (movie)
    ORDER BY movie.popularity DESC
    LIMIT 5
    """

TRENDING_SHOWS = \
    """
    """


# Person Queries
CREATE_PERSON = \
    """
    CREATE (person: Person {person_id: $person_id, name: $name, role: $role})
    """

GET_ACTORS = \
    """
    MATCH (Person)-[r:WORKED_IN]->(Movie{id: $id})
    WHERE Person.role = 'Actor'
    RETURN COLLECT(Person)
    """

GET_DIRECTOR = \
    """
    MATCH (Person)-[r:WORKED_IN]->(Movie{id: $id})
    WHERE Person.role = 'Director'
    RETURN Person.name, Person.person_id
    """

MOVIES_OF_ACTORS_OR_DIRECTORS = \
    """
    MATCH (Person{person_id: $person_id})-[r:WORKED_IN]->(Movie)
    RETURN COLLECT(Movie)
    """


# Relationship Queries

WORKS_IN_RELATION = \
    """
    MATCH (a:Person{person_id: $person_id}), (b:Movie{id: $id})
    CREATE (a)-[r:WORKED_IN]->(b)
    RETURN r
    """

OF_GENRE_RELATION = \
    """
    MATCH (b: Movie{id: $id}), (a: Genre{name: $name})
    CREATE (b)-[r: OF_GENRE {rank: $relation_rank}]->(a)
    RETURN r
    """

WATCHLISTED_RELATION = \
    """
    MATCH (a: User {username: $username}), (b: Movie{id: $id })
    CREATE (a)-[r: WATCHLISTED]->(b)
    RETURN r
    """

UNWATCHLIST_RELATION = \
    """
    MATCH (user: User {username: $username})-[r: WATCHLISTED]->(movie: Movie{id: $id})
    DELETE r
    """

STAR_MOVIE = \
    """
    MATCH (a: User{username: $username}), (b: Movie{id: $id})
    CREATE (a)-[r: STARRED]->(b)
    RETURN r
    """

UNSTAR_MOVIE = \
    """
    MATCH (user: User {username: $username})-[r: STARRED]->(movie: Movie{id: $id})
    DELETE r
    """


# Recommendation Queries

RECOMMENDATION = \
    """
    MATCH (recommend_like: Movie{title: $recommend_like})-[:OF_GENRE]->(genre: Genre)<-[:OF_GENRE]-(all_movies: Movie)
    MATCH (recommend_like)-[rank: OF_GENRE]->(genre: Genre)
    WITH all_movies, rank
    ORDER BY all_movies.popularity DESC, rank.rank ASC
    RETURN COLLECT(all_movies)
    """

GET_RECORD = \
    """
    
    """