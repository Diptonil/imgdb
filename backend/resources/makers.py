import uuid

from flask import request
from flask_restful import Resource

from common.queries import ( 
    CREATE_PERSON

)


class AddPerson(Resource):
    
    def __init__(self, database_driver):
        self.database_driver = database_driver

    def post(self):
        data = request.get_json()
        name = data.get('name')
        role = data.get('role')
        id = str(uuid.uuid4())
        entries = {'id': id, 'name':name, 'role': role}
        # if not authorize(token, self.database_driver):
        #     return ({'status': 'You aren\'t authorized to access this resource.', 'token': token}, 400)
        with self.database_driver.session() as session:
            session.run(CREATE_PERSON, entries)
        return ({'status': 'Movie has been succesfully added.'}, 200)