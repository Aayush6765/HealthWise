# HealthWise

HealthWise is a healthcare-oriented web application aimed at helping users monitor and manage their health efficiently. It combines a user-friendly frontend interface with a robust backend to provide tools such as health tracking, information lookup, and more.
An end-to-end Machine Learning solution with a web-based interface for **the early prediction of diabetes**, using medical and lifestyle data.
 The system is designed to:
- Predict whether a person is diabetic
- Provide a percentage-based risk score for non-diabetic users
Built with a robust ML model achieving **76.5% accuracy**, and integrated into a user-friendly web application.

## Table of Contents

- [Tech Stack](#techstack)
- [Features](#features)
- [Dataset](#dataset)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Backend Setup](#backendsetup)
- [Frontend Setup](#frontendsetup)
- [ML Model Setup](#mlmodelsetup)
- [Contributing](#contributing)
- [Licence](#licence)

 ## 🌐 Tech Stack

- **Frontend:** JavaScript, HTML, CSS
- **Backend:** Python (possibly Flask or Django - update if necessary)
- **Database:** Supabase (possibly Firebase or SQL - update if necessary)
- **ML Model:** Numpy, Pandas, ScikitLearn, Matplotlib, Seaborn, RandomForestClassifier

## 🚀 Features

- User-friendly interface for tracking health metrics
- Backend logic for processing and storing data
- Scalable design for future feature additions
- Predicts diabetic condition based on user inputs
- Calculates future risk percentage for non-diabetic users
- Clean, interactive web interface using ReactJS
- End-to-end ML pipeline with data preprocessing and tuning
- Visualization tools for insights like feature importance and confusion matrix

## Dataset

**PIMA Indians Diabetes Dataset**  
Includes medical and lifestyle features:
- Pregnancies, Glucose, Blood Pressure, Skin Thickness, Insulin  
- BMI, Diabetes Pedigree Function, Age  

**Preprocessing:**
- Missing values handled (0s replaced with NaNs, filled with medians)
- Normalization via `StandardScaler`
- Class balancing with `SMOTE`

## 📦 Installation

To get a local copy up and running, follow these steps:

### Prerequisites

Make sure you have the following installed:
- Python 3.x
- Node.js & npm
- Git

### Clone the repository

```bash
git clone https://github.com/Aayush-6765/HealthWise.git
cd HealthWise

# Backend Setup

cd backend
# (Optional) Create a virtual environment
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run the backend server
python app.py

# Frontend Setup

cd ../frontend
npm install
npm start

# ML Model Setup

Load → Clean → Normalize → Balance → Train → Test → Tune

## 🤝 Contributing
Contributions are welcome!

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a pull request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
