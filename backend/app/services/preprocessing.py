import pandas as pd

from app.schemas.prediction import PredictionRequest


def prepare_input(data: PredictionRequest) -> pd.DataFrame:
    return pd.DataFrame([{
        "Carpet Area": data.carpet_area,
        "Bathroom": data.bathroom,
        "Balcony": data.balcony,
        "Car Parking": data.car_parking,
        "Floor": data.floor,
        "location": data.location,
        "Furnishing": data.furnishing,
        "Ownership": data.ownership,
        "facing": data.facing,
        "overlooking": data.overlooking,
    }])