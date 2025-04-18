import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'History', path: '/history' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-primary">HealthWise</span>
          </Link>
          
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm">
                <span className="text-gray-500">Welcome,</span>
                <span className="ml-1 font-medium">{user.user_metadata?.full_name || user.email}</span>
              </div>
              
              <button 
                onClick={logout}
                className="btn btn-danger text-sm py-1.5"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`inline-block py-4 border-b-2 ${
                    pathname === link.path
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent hover:text-primary hover:border-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          HealthWise &copy; {new Date().getFullYear()} - ML-Powered Diabetes Prediction
        </div>
      </footer>
    </div>
  )
}

export default Layout 