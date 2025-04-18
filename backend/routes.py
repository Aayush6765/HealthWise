from flask import Blueprint, request, jsonify
import logging
from utils.diabetes_model import predict

logger = logging.getLogger(__name__)

prediction_api = Blueprint('prediction_api', __name__)

@prediction_api.route('/predict', methods=['POST'])
def predict_diabetes():
    """
    Endpoint to predict diabetes based on input features
    
    Expected input format:
    {
        "pregnancies": int,
        "glucose": int,
        "bloodPressure": int,
        "skinThickness": int,
        "insulin": int,
        "bmi": float,
        "diabetesPedigreeFunction": float,
        "age": int,
        "userId": string (optional)
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Request body is empty"}), 400

        logger.info(f"Received prediction request")
        

        required_fields = [
            'pregnancies', 'glucose', 'bloodPressure', 
            'skinThickness', 'insulin', 'bmi', 
            'diabetesPedigreeFunction', 'age'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        result = predict(data)
        
        logger.info(f"Prediction made: {result['prediction']} with probability {result['probability']:.2f}")
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500 