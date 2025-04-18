# HealthWise

An end-to-end Machine Learning solution with a web-based interface for **the early prediction of diabetes**, using medical and lifestyle data.
 The system is designed to:
- Predict whether a person is diabetic
- Provide a percentage-based risk score for non-diabetic users
Built with a robust ML model achieving **76.5% accuracy**, and integrated into a user-friendly web application.
 
## Features

- Predicts diabetic condition based on user inputs
- Calculates future risk percentage for non-diabetic users
- Clean, interactive web interface using ReactJS
- End-to-end ML pipeline with data preprocessing and tuning
- Visualization tools for insights like feature importance and confusion matrix

## Table of Contents

-[dataset](#dataset)
-[Installation](#installation)
-[Usage](#usage)
-[Contributing](#contributing)
-[Licence](#licence)

## Dataset

**PIMA Indians Diabetes Dataset**  
Includes medical and lifestyle features:
- Pregnancies, Glucose, Blood Pressure, Skin Thickness, Insulin  
- BMI, Diabetes Pedigree Function, Age  

**Preprocessing:**
- Missing values handled (0s replaced with NaNs, filled with medians)
- Normalization via `StandardScaler`
- Class balancing with `SMOTE`


##
