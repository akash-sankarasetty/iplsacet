import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Register', path: '/' },
    { label: 'Admin', path: '/admin' },
    { label: 'Auction Room', path: '/auction' },
    { label: 'Team View', path: '/team-view' },
    { label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <div className="min-h-screen bg-iplBlue text-white font-sans flex flex-col">
      <nav className="sticky top-0 z-50 bg-iplBlue border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center text-iplBlue font-bold text-xl">
                <i className="fas fa-trophy"></i>
              </div>
              <span className="text-xl font-bold tracking-wider text-iplGoldLight">DREAM<span className="text-white">TEAM</span></span>
            </Link>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-iplGoldLight'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

             {/* Mobile Menu Icon (Placeholder) */}
             <div className="md:hidden text-white">
                <i className="fas fa-bars text-xl"></i>
             </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-900 border-t border-white/10 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} IPL Auction Simulator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;