import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, History } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  return (
    <header className="bg-gradient-to-r from-blue-950 to-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Camera className="h-8 w-8 text-teal-400" />
          <span className="text-2xl font-bold">VisionDetect</span>
        </Link>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className={`flex items-center space-x-1 hover:text-teal-300 transition-colors ${
                  location.pathname === '/' ? 'text-teal-400 font-medium' : ''
                }`}
              >
                <Camera className="h-5 w-5" />
                <span>Detect</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`flex items-center space-x-1 hover:text-teal-300 transition-colors ${
                  location.pathname === '/history' ? 'text-teal-400 font-medium' : ''
                }`}
              >
                <History className="h-5 w-5" />
                <span>History</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;