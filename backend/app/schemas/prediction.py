from pydantic import BaseModel


class PredictionRequest(BaseModel):
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


class PredictionResponse(BaseModel):
    predicted_price: float