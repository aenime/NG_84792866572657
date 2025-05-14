import React, { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Adopt', path: '/adoption' },
    { name: 'Donate', path: '/donate' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="Animal Welfare NGO" className="h-10" />
          <span className="ml-2 text-lg font-bold text-green-700">Karuna For All</span>
        </Link>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-500 hover:text-green-700 focus:outline-none"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.path}
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              {item.name}
            </Link>
          ))}
          <Link 
            href="/donate"
            className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
          >
            Donate Now
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/donate"
              className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
