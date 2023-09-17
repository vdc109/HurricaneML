from tensorflow import keras
from keras.models import model_from_json, load_model
from efficientnet.keras import EfficientNetB7

import tensorflow as tf
import numpy as np
import pandas as pd
import cv2


def path_to_img(path):
    # path (string): directory to the image

    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    img = cv2.resize(img, (128, 128),
                     interpolation=cv2.INTER_LANCZOS4)
    img = np.array(img, dtype=np.float64).reshape(-1, 128, 128, 3)
    img /= 255.

    return img


def keras_path_to_model(model_path):
    model = load_model(model_path)
    return model


def path_to_model(model_path, weight_path):
    # model_path (.json): directory to the model
    # weight_path (.h5): directory to the weights

    json_file = open(model_path, 'r')
    loaded_model = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model)
    loaded_model.load_weights(weight_path)

    return loaded_model


def return_pred(model, img):
    # model (Model()): model of the CNN
    # img (np.array): array representing the image

    pred = model.predict(img)
    yhat = (pred >= 0.5).astype(int)
    yhat = yhat[:, 0]
    match yhat:
        case 0:
            return 0
        case 1:
            return 1
        case _:
            return 2
