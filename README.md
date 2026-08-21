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