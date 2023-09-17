from flask import Flask, jsonify, json, request, url_for, redirect, send_from_directory
import os
from flask_cors import CORS
import helper_func

app = Flask(__name__)
CORS(app, supports_credentials=True)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/upload/', methods=['POST'])
def upload_file():
    file = request.files['file']
    print(file)

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    print(file_path)

    model_path = 'Model/epoch5_model.keras'

    image = helper_func.path_to_img(file_path)
    model = helper_func.keras_path_to_model(model_path)

    result = helper_func.return_pred(model, image)

    if result == 0:
        final_result = "No damage"
    elif result == 1:
        final_result = "Damaged"
    else:
        final_result = "Error"

    print(final_result)
    return [file.filename, final_result]


@app.route('/receive/<filename>')
def receive_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
