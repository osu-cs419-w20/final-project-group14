import flask
from flask import request, jsonify
from pymongo import MongoClient
import urllib.parse

app = flask.Flask(__name__)
client = MongoClient()
db = client.TIME_BLOCKER_DEV

@app.route('/', methods=['GET'])
def home():
    return 'API / Route'


@app.route('/api/v1/auth', methods=['POST'])
def auth():
    req = request.get_json()
    flow.fetch_token(code=req['code'])
    

@app.route('/api/v1/tasks', methods=['GET'])
def all_tasks():
    return jsonify(tasks)

@app.route('/api/v1/createTask', methods=['POST'])
def createTaks():
    #Check auth
    tasks = db.tasks

    req_data = request.get_json()

    # Check for id dups

    task = {
        'id': req_data['id'],
        'title': req_data['title'],
        'due': req_data['due'],
        'description': req_data['description'],
        'complete': req_data['complete']
    }

    tasks.insert_one(task)

@app.route('/api/v1/task', methods=['GET'])
def task():
    # Check auth
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return 'Error: No id field provided. Please specify an id.'
    
    tasks = db.tasks

    res = tasks.find_one({'id': id})
    if res is not None:
        task = {'id': int(res['id']), 'title': res['title']}
        return jsonify(task)
    else:
        return 'Error, no such task'

app.run()
