# 🏠 House Price Prediction

A full-stack Machine Learning application that predicts house prices based on property characteristics.

The project consists of:

- A Machine Learning model trained for house price prediction.
- A FastAPI backend that exposes the prediction model through REST APIs.
- A React + Vite frontend that provides a user-friendly interface for entering house information and displaying the predicted price.

---

## 📌 Overview

The House Price Prediction project uses a trained Machine Learning model to estimate the price of a house based on several property features.

The user enters the property information through the React frontend. The frontend sends the data as a JSON request to the FastAPI backend.

The backend:

1. Validates the input using Pydantic.
2. Converts the request into the format expected by the trained model.
3. Loads the trained model.
4. Performs the prediction.
5. Returns the predicted house price as JSON.

### Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ POST /predict
 ▼
FastAPI Backend
 │
 ▼
Preprocessing
 │
 ▼
Trained ML Model
 │
 ▼
Predicted House Price
 │
 ▼
React Frontend
🏗️ Architecture Diagram
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ React + Vite        │
                    │ Frontend            │
                    │ localhost:5173      │
                    └──────────┬──────────┘
                               │
                         POST /predict
                               │
                               ▼
                    ┌─────────────────────┐
                    │ FastAPI Backend     │
                    │ localhost:8000      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Pydantic Validation │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Preprocessing       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Trained ML Model    │
                    │ house_price.pkl     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ Predicted Price     │
                    └─────────────────────┘
🛠️ Tech Stack
Machine Learning
Python
Pandas
NumPy
Scikit-learn
Joblib
Backend
FastAPI
Uvicorn
Pydantic
Pydantic Settings
Pandas
Scikit-learn
Joblib
Frontend
React
Vite
JavaScript
CSS
Testing
Pytest
FastAPI TestClient
HTTPX
📂 Project Structure
house-price-project/
│
├── backend/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   │       └── prediction.py
│   │   │
│   │   ├── core/
│   │   │   └── config.py
│   │   │
│   │   ├── schemas/
│   │   │   └── prediction.py
│   │   │
│   │   ├── services/
│   │   │   ├── preprocessing.py
│   │   │   └── inference.py
│   │   │
│   │   ├── utils/
│   │   │   └── logging_config.py
│   │   │
│   │   └── main.py
│   │
│   ├── models/
│   │   └── house_price.pkl
│   │
│   ├── tests/
│   │   └── test_prediction.py
│   │
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── ...
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
└── README.md
📊 Dataset

The project uses a house-price dataset containing property information such as:

Carpet Area
Bathroom
Balcony
Car Parking
Floor
Location
Furnishing
Ownership
Facing
Overlooking
Dataset Source:https://www.kaggle.com/datasets/juhibhojani/house-
🤖 Machine Learning Model

The trained model is serialized using joblib and loaded by the FastAPI backend.

The backend loads the model once during application startup rather than loading it for every prediction request.

Model file:

backend/models/house_price.pkl
The model receives the property features and returns a predicted house price  

📈 Model Metrics
The final model should be evaluated using:
| Metric | Value |
| MAE    |  1,082,523.04 |
| RMSE   |  3,188,486.44 |
| R²     | 0.9436  |
Metric Explanation

MAE — Mean Absolute Error

Measures the average absolute difference between the actual and predicted prices.

MAE = average(|actual - predicted|)

RMSE — Root Mean Squared Error

Measures prediction error while giving larger errors more weight.

RMSE = sqrt(mean((actual - predicted)²))

R² — R-Squared

Measures how much of the variation in house prices is explained by the model.

R² = 1 - SSres / SStot
⚙️ Backend Setup
1. Open the backend directory
cd house-price-project\backend
2. Create a virtual environment

If the virtual environment does not already exist:

python -m venv .venv
3. Activate the virtual environment

On Windows PowerShell:

.\.venv\Scripts\Activate.ps1

You should see:

(.venv)

at the beginning of the terminal.

4. Install dependencies
pip install -r requirements.txt

The project uses the following main packages:

fastapi
uvicorn
pydantic
pydantic-settings
pandas
scikit-learn
joblib
pytest
httpx

The installed versions should match the versions used to train and serialize the model.

▶️ Run the Backend

From the backend directory with the virtual environment activated:

python -m uvicorn app.main:app

The API will run on:

http://127.0.0.1:8000

FastAPI Swagger documentation:

http://127.0.0.1:8000/docs
🔌 API Reference
Health Check
GET /health

Checks whether the API is running.

Example
GET /health
Expected Response
{
  "status": "ok"
}
🔮 House Price Prediction
POST /predict

Predicts the price of a house based on its characteristics.

Endpoint
POST http://127.0.0.1:8000/predict
Request Body
{
  "carpet_area": 1200,
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
Input Features
Feature	Type	Example
carpet_area	float	1200
bathroom	float	2
balcony	float	2
car_parking	float	1
floor	float	3
location	string	thane
furnishing	string	Semi-Furnished
ownership	string	Freehold
facing	string	East
overlooking	string	Garden/Park
Response
{
  "predicted_price": 123456.78
}

The actual prediction value depends on the trained model and input features.

💻 cURL Example

The API can also be tested using cURL:

curl -X POST "http://127.0.0.1:8000/predict" \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{
  "carpet_area": 1200,
  "bathroom": 2,
  "balcony": 2,
  "car_parking": 1,
  "floor": 3,
  "location": "thane",
  "furnishing": "Semi-Furnished",
  "ownership": "Freehold",
  "facing": "East",
  "overlooking": "Garden/Park"
}'
🌐 Frontend Setup

The frontend is built using React and Vite.

1. Open the frontend directory
cd house-price-project\frontend
2. Install dependencies
npm install
3. Start the development server
npm run dev

The frontend will normally be available at:

http://localhost:5173/
🔗 Frontend → Backend Communication

The React frontend sends prediction requests to:

http://127.0.0.1:8000/predict

The request is sent using:

fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(requestData)
});

The frontend receives:

{
  "predicted_price": 123456.78
}

and displays the predicted price to the user.
# 🔐 Environment Variables

The backend uses environment variables for application configuration.

Create a `.env` file inside the `backend` directory:

```env
APP_NAME=House Price Prediction API
MODEL_PATH=models/house_price.pkl
🧪 Testing

The backend includes automated tests using Pytest and FastAPI's TestClient.

Run:

python -m pytest tests/test_prediction.py -vv

The current test suite includes:

Test 1 — Health Check

Verifies that the API health endpoint works correctly.

Test 2 — Invalid Prediction Input

Verifies that invalid input is rejected with HTTP 422.

Expected result:

2 passed

Example:

tests/test_prediction.py::test_health PASSED
tests/test_prediction.py::test_invalid_prediction PASSED


2 passed
🩺 API Validation

FastAPI automatically validates incoming requests using Pydantic.

For invalid request data, the API returns:

422 Unprocessable Entity

Example:

{
  "detail": [
    {
      "type": "missing",
      "loc": [
        "body",
        "carpet_area"
      ]
    }
  ]
}
🌍 CORS

The backend allows requests from the local Vite frontend:

http://localhost:5173

and:

http://127.0.0.1:5173

This allows the React application to communicate with the FastAPI API during local development.
🖼️ Screenshots
Frontend :
## Frontend

![House Price Prediction Frontend](screenshots/frontend.png)
## Prediction Result

![Prediction Result](screenshots/prediction.png)
## FastAPI Swagger Documentation

![FastAPI Swagger](screenshots/swagger.png)
