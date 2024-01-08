import os
import json
from bottle import route, template, redirect, static_file, error, run, request, HTTPResponse

from services import med_annotator


def load_sample(sample_name):
    try:
        with open(f'resources/{sample_name}.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    except (FileNotFoundError, json.JSONDecodeError) as error:
        raise HTTPResponse(status=404, body=str(error))
    
########################## Endpoints ##########################
    
@route('/')
def show_home():
    return template('home')

@route('/annotate', method='GET')
def annotate():
    """Load demo sample and display annotation UI."""
    sample_name = request.query.get('sample-name')
    if sample_name:
        sample_data = load_sample(sample_name)
        return template('annotate', sample_data)
    else:
        return HTTPResponse(status=400, body="No sample selected.")

@route('/annotate-upload', method='POST')
def annotate_upload():
    """Process user-uploader text file and display annotation UI."""
    newfile = request.files.get('file-upload')
    if not newfile:
        return "File upload failed."
    doc = json.load(newfile.file)
    # TODO error handling in reading file
    # Automatic NER
    # text = newfile.file.read().decode('utf-8')
    # annotations = med_annotator.find_medications(text)
    return template('annotate', doc)

@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='static')

@error(404)
def error404(e):
    return template('error', error_msg='404 error. Nothing to see here.')

if os.environ.get('APP_LOCATION') == 'heroku':
    run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
else:
    run(host='localhost', port=8080, debug=True)
