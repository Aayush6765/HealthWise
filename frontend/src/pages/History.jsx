import { useState, useEffect } from 'react'
import { predictionService } from '../services/supabaseClient'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const History = () => {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await predictionService.getPredictionHistory()
        setPredictions(data)
      } catch (err) {
        console.error('Error fetching predictions:', err)
        setError('Failed to load prediction history. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPredictions()
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  const getChartData = () => {
    if (predictions.length === 0) return null

    const sortedPredictions = [...predictions].sort((a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
    )

    return {
      labels: sortedPredictions.map(p => 
        new Date(p.timestamp).toLocaleDateString()
      ),
      datasets: [
        {
          label: 'Diabetes Risk (%)',
          data: sortedPredictions.map(p => Math.round(p.probability * 100)),
          backgroundColor: sortedPredictions.map(p => 
            p.result === 'Diabetic' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(16, 185, 129, 0.7)'
          ),
          borderColor: sortedPredictions.map(p => 
            p.result === 'Diabetic' ? 'rgb(239, 68, 68)' : 'rgb(16, 185, 129)'
          ),
          borderWidth: 1,
        },
      ],
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Diabetes Risk History',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Risk: ${context.raw}%`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Risk Percentage'
        }
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-danger p-4 rounded-md">
        <p className="text-danger">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Your Prediction History</h1>
        <p className="mt-2 text-gray-600">
          View your past diabetes risk assessments and track changes over time.
        </p>
      </div>

      {predictions.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-gray-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-700">No predictions yet</h2>
          <p className="mt-2 text-gray-500">
            You haven't made any diabetes risk assessments yet. Go to the Dashboard to make your first prediction.
          </p>
        </div>
      ) : (
        <>
          {/* Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Bar data={getChartData()} options={chartOptions} />
          </div>

          {/* Prediction List */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-lg font-medium text-gray-700">Detailed History</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk %</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BMI</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Glucose</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictions.map((prediction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(prediction.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${prediction.result === 'Diabetic' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'}`}>
                          {prediction.result === 'Diabetic' ? 'High Risk' : 'Low Risk'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {Math.round(prediction.probability * 100)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prediction.input_data.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prediction.input_data.bmi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prediction.input_data.glucose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default History 