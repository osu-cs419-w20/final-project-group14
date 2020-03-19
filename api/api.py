import flask
from flask import request, jsonify

tasks = [
        {'id': 0,
         'title': 'Make the site',
        },
        {'id': 1,
         'title': 'Sleep'
        }
]

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return "API / Route"

@app.route('/api/v1/tasks', methods=['GET'])
def all_tasks():
    return jsonify(tasks)

@app.route('/api/v1/task', methods=['GET'])
def task():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."
    
    res = []

    for task in tasks:
        if task['id'] == id:
            res.append(task)

    return jsonify(res)

app.run()
