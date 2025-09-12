import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Colombia Hope
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/chat" className="hover:text-blue-200 px-3 py-2 rounded-md">
              Chat
            </Link>
            <Link to="/debate" className="hover:text-blue-200 px-3 py-2 rounded-md">
              Debate
            </Link>
            <Link to="/survey" className="hover:text-blue-200 px-3 py-2 rounded-md">
              Survey
            </Link>
            <Link to="/news" className="hover:text-blue-200 px-3 py-2 rounded-md">
              News
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}