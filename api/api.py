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
app.config['JWT_TOKEN_LOCATION'] = ['json']
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
    
@app.route('/api/v1/changePass', methods=['POST'])
@jwt_required
def change_pass():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    current_user = get_jwt_identity()
    password = request.json.get('password', None)
    newPassword = request.json.get('newPassword', None)

    users = db.users

    res = users.find_one({"username": current_user})

    if res == None or password != res['password']:
        return jsonify({"msg": "Bad username or password"}), 401
    
    res = users.update_one({"username": current_user}, {"$set": {"password": newPassword}})

    if res == None:
        return jsonify({"msg": "Bad username or password"}), 401
    
    return jsonify({"msg": "OK"}), 200

@app.route('/api/v1/updateTask', methods=['POST'])
@jwt_required
def update_task():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    current_user = get_jwt_identity()

    tasks = db.tasks

    res = tasks.find_one({"id": request.json.get('id', None)})

    if res == None:
        return jsonify({"msg": "No id of that"}), 400
    
    res = tasks.update_one({"id": request.json.get('id', None)}, {"$set": {"complete": request.json.get('complete', None)}})

    return jsonify({"msg": "OK"}), 200

@app.route('/api/v1/tasks', methods=['POST'])
@jwt_required
def all_tasks():
    user = get_jwt_identity()
    tasks = db.tasks
    
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    res = []

    for x in tasks.find({},{ "_id": 0}):
        print(x)
        if x['userId'] == user:
            res.append(x)
    
    return jsonify(res)

@app.route('/api/v1/createTask', methods=['POST'])
@jwt_required
def createTask():
    user = get_jwt_identity()
    tasks = db.tasks
    
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400


    res = tasks.find_one({'id': user+request.json.get('title', None)})

    if res != None:
        return jsonify({"msg": "Already have a task named that"}), 401

    res = tasks.insert_one({
        "id": user+request.json.get('title', None),
        "title": request.json.get('title', None),
        "due": request.json.get('due', None),
        "description": request.json.get('description', None),
        "complete": request.json.get('complete', None),
        "userId": user
    })

    return jsonify({"id": user+request.json.get('title', None)})

@app.route('/api/v1/deleteTask', methods=['POST'])
@jwt_required
def deleteTask():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    user = get_jwt_identity()

    tasks = db.tasks

    res = tasks.delete_one({'id': request.json.get('id', None), 'userId': user})
    return jsonify({"msg": "OK"}), 200

@app.route('/api/v1/task', methods=['POST'])
@jwt_required
def task():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    
    user = get_jwt_identity()
    
    tasks = db.tasks



    res = tasks.find_one({'id': request.json.get('id', None), 'userId': user})

    if res == None:
       return jsonify({"msg": "No Id found"}), 400

    return jsonify({"id": res['id'], "title": res['title'], "due": res['due'], "description": res['description'], "complete": res['complete']})

app.run()
