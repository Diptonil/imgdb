import uuid

from flask import request
from flask_restful import Resource

from common.queries import ( 
    CREATE_PERSON,
    WORKS_IN_RELATION,
    GET_ACTORS,
    GET_DIRECTOR
)


class AddPerson(Resource):
    
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = data.get('movie_id')
        name = data.get('name')
        role = data.get('role')
        person_id = str(uuid.uuid4())
        entries = {'person_id': person_id, 'name':name, 'role': role}
        relation_entries ={'person_id': person_id, 'id': id}
        # if not authorize(token, self.database_driver):
        #     return ({'status': 'You aren\'t authorized to access this resource.', 'token': token}, 400)
        with self.database_driver.session() as session:
            session.run(CREATE_PERSON, entries)
            session.run(WORKS_IN_RELATION, relation_entries)
        return ({'status': 'Movie has been succesfully added.'}, 200)


class GetActor(Resource):
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = int(data.get('id'))
        entries = {'id': id}
        with self.database_driver.session() as session:
            results = session.run(GET_ACTORS, entries).single()[0]
            if not results:
                return ({'status': 'Could not fetch information at the moment'}, 400)
            resultList = {}
            resultList['name1'] = results[0]['name']
            resultList['name2'] = results[1]['name']
            print(resultList)
            return ({'status': 'The data has been fetched', 'data': resultList}, 200)


class GetDirector(Resource):
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        id = int(data.get('id'))
        entries = {'id': id}
        with self.database_driver.session() as session:
            result = session.run(GET_DIRECTOR, entries).single()[0]
            print(result)
            if not result:
                return ({'status': 'The data could not be fetched'}, 400)
            return ({'status': 'The data has been fetched', 'data': result}, 200)

