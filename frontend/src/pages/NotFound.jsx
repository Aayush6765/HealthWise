import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mt-3 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        to="/"
        className="mt-8 bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound 