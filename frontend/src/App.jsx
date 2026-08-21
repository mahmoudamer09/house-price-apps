import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    carpet_area: "",
    bathroom: "",
    balcony: "",
    car_parking: "",
    floor: "",
    location: "",
    furnishing: "",
    ownership: "",
    facing: "",
    overlooking: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPrediction(null);
    setError("");

    const requestData = {
      carpet_area: Number(formData.carpet_area),
      bathroom: Number(formData.bathroom),
      balcony: Number(formData.balcony),
      car_parking: Number(formData.car_parking),
      floor: Number(formData.floor),
      location: formData.location.trim(),
      furnishing: formData.furnishing,
      ownership: formData.ownership,
      facing: formData.facing,
      overlooking: formData.overlooking,
    };

    console.log("SENT DATA:", requestData);

    try {
  const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestData),
      });

      console.log("STATUS:", response.status);

      const data = await response.json();

      console.log("API RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data?.detail
            ? JSON.stringify(data.detail)
            : "Prediction request failed"
        );
      }

      const predictedPrice = Number(data.predicted_price);

      if (!Number.isFinite(predictedPrice)) {
        throw new Error(
          `Invalid predicted_price received from backend: ${data.predicted_price}`
        );
      }

      setPrediction(predictedPrice);
    } catch (error) {
      console.error("Prediction Error:", error);
      setError(error.message || "Could not get prediction");
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🏠 House Price Prediction</h1>

        <p className="subtitle">
          Enter the property details to predict its price
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Carpet Area</label>
            <input
              type="number"
              name="carpet_area"
              value={formData.carpet_area}
              onChange={handleChange}
              placeholder="Example: 1200"
              required
            />
          </div>

          <div className="form-group">
            <label>Bathroom</label>
            <input
              type="number"
              name="bathroom"
              value={formData.bathroom}
              onChange={handleChange}
              placeholder="Example: 2"
              required
            />
          </div>

          <div className="form-group">
            <label>Balcony</label>
            <input
              type="number"
              name="balcony"
              value={formData.balcony}
              onChange={handleChange}
              placeholder="Example: 2"
              required
            />
          </div>

          <div className="form-group">
            <label>Car Parking</label>
            <input
              type="number"
              name="car_parking"
              value={formData.car_parking}
              onChange={handleChange}
              placeholder="Example: 1"
              required
            />
          </div>

          <div className="form-group">
            <label>Floor</label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              placeholder="Example: 3"
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Thane"
              required
            />
          </div>

          <div className="form-group">
            <label>Furnishing</label>
            <select
              name="furnishing"
              value={formData.furnishing}
              onChange={handleChange}
              required
            >
              <option value="">Select furnishing</option>
              <option value="Furnished">Furnished</option>
              <option value="Semi-Furnished">Semi-Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ownership</label>
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              required
            >
              <option value="">Select ownership</option>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
            </select>
          </div>

          <div className="form-group">
            <label>Facing</label>
            <select
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              required
            >
              <option value="">Select direction</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <div className="form-group">
            <label>Overlooking</label>
            <select
              name="overlooking"
              value={formData.overlooking}
              onChange={handleChange}
              required
            >
              <option value="">Select view</option>
              <option value="Garden/Park">Garden/Park</option>
              <option value="Main Road">Main Road</option>
              <option value="Pool">Pool</option>
              <option value="Sea">Sea</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          <button type="submit">
            Predict House Price
          </button>
        </form>

        {error && (
          <div className="prediction">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        )}

        {prediction !== null && !error && (
          <div className="prediction">
            <h2>Predicted Price</h2>
            <p>{prediction.toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;