from flask import request, jsonify, Flask
from pymongo import MongoClient
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from dotenv import load_dotenv
import urllib.parse
import os

load_dotenv()

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET')
jwt = JWTManager(app)
client = MongoClient()
db = client.TIME_BLOCKER_DEV

@app.route('/', methods=['GET'])
def home():
    return 'API / Route'

@app.route('/api/v1/createUser', methods=['POST'])
def create_user():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400
    

    users = db.users

    res = users.find_one({"username": username})

    if res != None:
        return jsonify({"msg": "Bad username"}), 400
    
    # Bad security
    res = users.insert_one({"username": username, "password": password})

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

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
    users = db.users

    res = users.find_one({"username": username})
    if res == None:
        return jsonify({"msg": "Bad username or password"}), 401


    if username != res['username'] or password != res['password']:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
    
@app.route('/api/v1/changePass', methods=['GET'])
@jwt_required
def change_pass():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    current_user = get_jwt_identity()
    password = request.json.get('password', None)
    newPassword = request.json.get('newPassword', None)

    users = db.users

    res = user.find_one({"username": current_user})

    if res == None || password != res['password']:
        return jsonify({"msg": "Bad username or password"}), 401
    
    res = users.update_one({"username": current_user}, {"$set": {"password": newPassword}})

    if res == None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    return jsonify({"msg": "OK"}), 200


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
