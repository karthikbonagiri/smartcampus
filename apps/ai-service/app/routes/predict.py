from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

router = APIRouter()
model = joblib.load('/app/models/student_performance.pkl')

class PredictInput(BaseModel):
    features: list

@router.post("/performance")
async def predict(data: PredictInput):
    try:
        X = np.array(data.features).reshape(1, -1)
        pred = model.predict(X)[0]
        return {"predicted_score": float(pred)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))