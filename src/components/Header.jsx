import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header({ userEmail }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Contact Management Portal</h1>
            {userEmail && (
              <p className="text-sm text-gray-600">Welcome, {userEmail}</p>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}