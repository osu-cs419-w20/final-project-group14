from flask import request, jsonify, Flask
from pymongo import MongoClient
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
import urllib.parse

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'secret' #### CHANGE THIS JOHN ####
jwt = JWTManager(app)
client = MongoClient()
db = client.TIME_BLOCKER_DEV

@app.route('/', methods=['GET'])
def home():
    return 'API / Route'


@app.route('/api/v1/auth', methods=['POST'])
def auth():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400
    
    # Here query for the user document for the username. If it does not exist,
    # then return err. Also get the password and unhash.

    if username != 'test' or password != 'test':
        return jsonify({"msg": "Bad username or password"}), 401
    
    # Look up the userID of the username
    userId = 0

    access_token = create_access_token(identity=userId)
    return jsonify(access_token=access_token), 200
    

@app.route('/api/v1/tasks', methods=['GET'])
@jwt_required
def all_tasks():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)

@app.route('/api/v1/createTask', methods=['POST'])
@jwt_required
def createTask():
    user = get_jwt_identity()
    tasks = db.tasks

    req_data = request.get_json()

    # Check for id dups

    task = {
        'id': req_data['id'],
        'title': req_data['title'],
        'due': req_data['due'],
        'description': req_data['description'],
        'complete': req_data['complete'],
        'userId': user
    }

    tasks.insert_one(task)

@app.route('/api/v1/deleteTask', methods=['POST'])
@jwt_required
def deleteTask():
    user = get_jwt_identity()

    tasks = db.tasks

    req_data = request.get_json()

    tasks.delete_one({'id': req_data['id'], 'userId': user})

@app.route('/api/v1/task', methods=['GET'])
@jwt_required
def task():
    user = get_jwt_identity()

    # Change to req body stuff
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return 'Error: No id field provided. Please specify an id.'
    
    tasks = db.tasks

    res = tasks.find_one({'id': id, 'userId': user})
    if res is not None:
        task = {'id': int(res['id']), 'title': res['title']}
        return jsonify(task)
    else:
        return 'Error, no such task'

app.run()
