from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

app = FastAPI(title="House Price Prediction API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
model = joblib.load("best_house_price_model.pkl")


class HouseData(BaseModel):
    carpet_area: float
    bathroom: float
    balcony: float
    car_parking: float
    floor: float
    location: str
    furnishing: str
    ownership: str
    facing: str
    overlooking: str


@app.get("/")
def home():
    return {
        "message": "House Price Prediction API is running!"
    }


@app.post("/predict")
def predict_price(data: HouseData):

    input_data = pd.DataFrame([{
        "Carpet Area": data.carpet_area,
        "Bathroom": data.bathroom,
        "Balcony": data.balcony,
        "Car Parking": data.car_parking,
        "Floor": data.floor,
        "location": data.location,
        "Furnishing": data.furnishing,
        "Ownership": data.ownership,
        "facing": data.facing,
        "overlooking": data.overlooking
    }])

    prediction = model.predict(input_data)

    return {
        "predicted_price": float(prediction[0])
    }