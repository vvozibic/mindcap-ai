import { Menu, User, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User as UserType } from "../types";
import { Logo } from "./Logo";
import XLogo from "./XLogo";

interface NavbarProps {
  user: UserType;
  onLogin: () => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-primary-900/40 lg:bg-transparent text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/beta" className="flex items-center">
              <div className="w-[100px]">
                <Logo />
              </div>
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/beta"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/beta")
                    ? "bg-primary-700/70 text-white"
                    : "text-gray-300 hover:bg-primary-600/50 hover:text-white"
                }`}
              >
                Mindo AI Leaderboard
              </Link>
              <Link
                to="/beta/projects"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/beta/projects")
                    ? "bg-primary-700/70 text-white"
                    : "text-gray-300 hover:bg-primary-600/50 hover:text-white"
                }`}
              >
                Projects
              </Link>
              <Link
                to="/beta/social-card"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/beta/social-card")
                    ? "bg-primary-700/70 text-white"
                    : "text-gray-300 hover:bg-primary-600/50 hover:text-white"
                }`}
              >
                My Social Card
              </Link>
              <div className="relative flex flex-col items-center group">
                <span className="absolute bottom-[-5px] text-[10px] text-gray-500 hidden lg:block group-hover:block">
                  Coming soon
                </span>
                <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 cursor-not-allowed">
                  TikTok Mindshare
                </span>
              </div>
              {/* <Link
                to="/for-business"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/for-business")
                    ? "bg-primary-700 text-white"
                    : "text-gray-300 hover:bg-primary-600 hover:text-white"
                }`}
              >
                For Business
              </Link> */}
            </div>
          </div>

          <div className="hidden lg:block">
            {user.isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/beta/social-card"
                  className={`px-3 py-2 rounded-md text-sm font-medium`}
                >
                  <span className="text-sm">{user.email || user.username}</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-accent-500 hover:bg-accent-600 text-primary-900 px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <User className="h-4 w-4 mr-2" />
                <a className="flex items-center justify-center">
                  Login with <XLogo className="h-4 w-4 ml-1" />
                </a>
              </button>
            )}
          </div>

          <div className="lg:hidden">
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
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/beta"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/beta")
                  ? "text-accent-500"
                  : "text-gray-300 hover:bg-primary-600/40 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Mindo AI Leaderboard
            </Link>
            <Link
              to="/beta/projects"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/beta/projects")
                  ? "text-accent-500"
                  : "text-gray-300 hover:bg-primary-600/40 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              to="/beta/social-card"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/beta/social-card")
                  ? "text-accent-500"
                  : "text-gray-300 hover:bg-primary-600/40 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Social Card
            </Link>
            <div className="flex justify-between items-center px-3 py-2 text-gray-500">
              <span className="text-base font-medium cursor-not-allowed">
                TikTok Mindshare
              </span>
              <span className="text-xs text-gray-400">Coming soon</span>
            </div>
            {/* <Link
              to="/for-business"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/for-business")
                  ? "bg-primary-700 text-white"
                  : "text-gray-300 hover:bg-primary-600 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              For Business
            </Link> */}
          </div>
          <div className="pt-4 pb-3 border-t border-primary-700">
            {user.isAuthenticated ? (
              <div className="flex items-center px-5 justify-between">
                <Link
                  to="/beta/social-card"
                  className={`block rounded-md text-base font-medium ${
                    isActive("/beta/social-card")
                      ? "bg-primary-700 text-white"
                      : "text-gray-300 hover:bg-primary-600 hover:text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {user.email || user.username}
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
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
                  <a
                    className="flex items-center justify-center"
                    href="/api/auth/twitter"
                  >
                    Login with <XLogo className="h-4 w-4 ml-1" />
                  </a>
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
