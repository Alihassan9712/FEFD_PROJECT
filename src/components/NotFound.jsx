// src/components/NotFound.jsx
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">Oops! The page you're looking for doesn't exist.</p>
        
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition shadow-lg"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}