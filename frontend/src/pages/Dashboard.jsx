import { useState } from 'react'
import { predictionService } from '../services/supabaseClient'
import toast from 'react-hot-toast'

// Form field definitions
const formFields = [
  { id: 'pregnancies', label: 'Pregnancies', type: 'number', min: 0, max: 20, step: 1, placeholder: '0', info: 'Number of pregnancies' },
  { id: 'glucose', label: 'Glucose', type: 'number', min: 0, max: 300, step: 1, placeholder: '120', info: 'Plasma glucose concentration (mg/dL)' },
  { id: 'bloodPressure', label: 'Blood Pressure', type: 'number', min: 0, max: 200, step: 1, placeholder: '80', info: 'Diastolic blood pressure (mm Hg)' },
  { id: 'skinThickness', label: 'Skin Thickness', type: 'number', min: 0, max: 100, step: 1, placeholder: '20', info: 'Triceps skin fold thickness (mm)' },
  { id: 'insulin', label: 'Insulin', type: 'number', min: 0, max: 1000, step: 1, placeholder: '80', info: '2-Hour serum insulin (mu U/ml)' },
  { id: 'bmi', label: 'BMI', type: 'number', min: 0, max: 70, step: 0.1, placeholder: '25', info: 'Body mass index (weight in kg/(height in m)²)' },
  { id: 'diabetesPedigreeFunction', label: 'Diabetes Pedigree Function', type: 'number', min: 0, max: 3, step: 0.01, placeholder: '0.5', info: 'Diabetes pedigree function (a function of diabetes genetic influence)' },
  { id: 'age', label: 'Age', type: 'number', min: 0, max: 120, step: 1, placeholder: '35', info: 'Age in years' },
]

// Initial form state
const initialFormState = formFields.reduce((acc, field) => ({ 
  ...acc, 
  [field.id]: '' 
}), {})

const Dashboard = () => {
  const [formData, setFormData] = useState(initialFormState)
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setError(null)
    
    const numericFormData = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: Number(formData[key])
    }), {})
    
    setIsLoading(true)
    
    try {
      console.log('Submitting prediction with data:', numericFormData);
      const result = await predictionService.submitPrediction(numericFormData)
      setPrediction(result)
      toast.success('Prediction completed successfully!')
    } catch (error) {
      console.error('Prediction error:', error)
      setError(error.message || 'Failed to get prediction. Please make sure the backend server is running.')
      toast.error(error.message || 'Error getting prediction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData(initialFormState)
    setPrediction(null)
    setError(null)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Diabetes Risk Assessment</h1>
        <p className="mt-2 text-gray-600">
          Fill in the form below to check your diabetes risk based on clinical parameters.
        </p>
      </div>

      {/* Prediction Results */}
      {prediction && (
        <div className={`p-6 mb-8 rounded-lg shadow-md border-l-4 ${
          prediction.prediction === "Diabetic" 
            ? "bg-red-50 border-danger" 
            : "bg-green-50 border-secondary"
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">Your Assessment Result</h2>
              <p className="text-3xl font-bold mt-2 mb-3">
                {prediction.prediction === "Diabetic" ? "High Risk" : "Low Risk"}
              </p>
              <p className="text-gray-700">
                Based on the provided metrics, our model predicts that you have a
                <span className="font-medium"> {(prediction.probability * 100).toFixed(1)}% </span>
                probability of having diabetes.
              </p>
              <div className="mt-4">
                <button
                  onClick={resetForm}
                  className="btn btn-primary mr-3"
                >
                  New Assessment
                </button>
              </div>
            </div>
            <div className={`text-white rounded-full h-20 w-20 flex items-center justify-center text-xl font-bold ${
              prediction.prediction === "Diabetic" ? "bg-danger" : "bg-secondary"
            }`}>
              {Math.round(prediction.probability * 100)}%
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && !prediction && (
        <div className="p-4 mb-6 bg-red-50 border-l-4 border-danger rounded-md">
          <h3 className="font-semibold text-danger">Error</h3>
          <p className="mt-1">{error}</p>
          <div className="mt-3">
            <p className="text-sm text-gray-600">
              Please make sure:
            </p>
            <ul className="mt-1 text-sm list-disc list-inside text-gray-600">
              <li>The backend server is running on port 5001</li>
              <li>All required fields are filled in correctly</li>
              <li>Your internet connection is stable</li>
            </ul>
          </div>
        </div>
      )}

      {/* Form */}
      {!prediction && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required
                  value={formData[field.id]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="input"
                />
                <p className="mt-1 text-xs text-gray-500">{field.info}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`btn btn-primary w-full md:w-auto ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Get Prediction'}
            </button>
          </div>
        </form>
      )}

      {/* Information cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-primary">
          <h2 className="font-bold text-lg mb-2">What is Diabetes?</h2>
          <p className="text-gray-700">
            Diabetes is a chronic health condition that affects how your body turns food into energy. 
            With diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-secondary">
          <h2 className="font-bold text-lg mb-2">About Our Prediction Model</h2>
          <p className="text-gray-700">
            Our machine learning model uses clinical data to estimate your diabetes risk. 
            This assessment is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 