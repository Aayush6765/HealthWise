"""
Script to train a diabetes prediction model from the dataset.

Usage:
    python import_notebook_model.py
"""

import sys
import logging
from utils.diabetes_model import train_model

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def main():
    try:
        logger.info("Training diabetes prediction model...")
        model, scaler = train_model()
        logger.info("Model training successful!")
    except Exception as e:
        logger.error(f"Model training failed: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main() 