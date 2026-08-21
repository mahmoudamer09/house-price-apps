from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_invalid_prediction():
    response = client.post(
        "/predict",
        json={
            "carpet_area": "invalid",
            "bathroom": 2,
            "balcony": 2,
            "car_parking": 1,
            "floor": 3,
            "location": "thane",
            "furnishing": "Semi-Furnished",
            "ownership": "Freehold",
            "facing": "East",
            "overlooking": "Garden/Park"
        }
    )

    assert response.status_code == 422