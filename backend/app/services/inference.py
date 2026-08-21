import joblib
from pathlib import Path

from app.schemas.prediction import PredictionRequest
from app.services.preprocessing import prepare_input


MODEL_PATH = (
    Path(__file__).resolve().parents[2]
    / "models"
    / "house_price.pkl"
)


def load_model():
    return joblib.load(MODEL_PATH)


def predict(model, data: PredictionRequest) -> float:
    input_data = prepare_input(data)

    prediction = model.predict(input_data)

    return float(prediction[0])