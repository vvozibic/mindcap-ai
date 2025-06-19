import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, User } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Zap className="h-8 w-8 text-accent-500" />
              <span className="ml-2 text-xl font-bold">AttentionFi</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/') ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`}
              >
                X.com KOL Leaderboard
              </Link>
              <Link 
                to="/projects" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/projects') ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`}
              >
                Projects
              </Link>
              <Link 
                to="/social-card" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/social-card') ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`}
              >
                My Social Card
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            {user.isAuthenticated ? (
              <div className="flex items-center">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-2">{user.handle}</span>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                Sign In
              </button>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-primary-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              X.com KOL Leaderboard
            </Link>
            <Link 
              to="/projects" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/projects') ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link 
              to="/social-card" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/social-card') ? 'bg-primary-700 text-white' : 'text-gray-300 hover:bg-primary-600 hover:text-white'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Social Card
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-primary-600">
            {user.isAuthenticated ? (
              <div className="flex items-center px-5">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full"
                />
                <span className="ml-3 text-base font-medium text-white">{user.handle}</span>
              </div>
            ) : (
              <div className="px-5">
                <button 
                  onClick={() => {
                    onLogin();
                    setIsMenuOpen(false);
                  }}
                  className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium w-full flex items-center justify-center"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
