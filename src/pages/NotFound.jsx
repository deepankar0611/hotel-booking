import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound; 