'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Adoption', path: '/adoption' },
    { label: 'Donate', path: '/donate' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="Animal Welfare NGO" 
            width={40} 
            height={40} 
            className="h-10 w-auto"
          />
          <span className="ml-2 font-bold text-green-600">Karuna</span>
        </Link>
        
        <button
          className="block focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="bg-white shadow-lg">
          <ul className="py-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.path}
                  className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="block px-4 py-2 text-green-600 font-medium hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;