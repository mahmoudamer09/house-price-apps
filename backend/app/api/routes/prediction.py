from fastapi import APIRouter, Request

from app.schemas.prediction import (
    PredictionRequest,
    PredictionResponse,
)
from app.services.inference import predict


router = APIRouter()


@router.get("/health")
def health():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict_price(
    data: PredictionRequest,
    request: Request
):
    model = request.app.state.model

    predicted_price = predict(model, data)

    return {
        "predicted_price": predicted_price
    }