'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ngo, setNgo] = useState({ name: 'Animal Welfare NGO', logo: '/images/logo.png' });
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    // Fetch NGO settings and services
    async function fetchData() {
      try {
        const [ngoRes, servicesRes] = await Promise.all([
          fetch('/api/settings'),
          fetch('/api/services?menu=true')
        ]);
        
        if (ngoRes.ok) {
          const ngoData = await ngoRes.json();
          setNgo(ngoData);
        }
        
        if (servicesRes.ok) {
          const servicesData = await servicesRes.json();
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Failed to fetch navigation data', error);
      }
    }
    
    fetchData();
  }, []);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                {ngo.logo ? (
                  <Image 
                    src={ngo.logo} 
                    alt={ngo.name} 
                    width={40} 
                    height={40} 
                    className="h-10 w-auto"
                  />
                ) : (
                  <span className="text-primary font-bold text-2xl">{ngo.name.charAt(0)}</span>
                )}
                <span className="ml-2 text-lg font-medium text-gray-900">{ngo.name}</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary hover:text-gray-700">
              Home
            </Link>
            <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary hover:text-gray-700">
              About
            </Link>
            {services.map(service => (
              <Link 
                key={service._id} 
                href={`/services/${service.slug}`}
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary hover:text-gray-700"
              >
                {service.title}
              </Link>
            ))}
            <Link href="/posts" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-primary hover:text-gray-700">
              Blog
            </Link>
            <Link href="/donate" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
              Donate
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Home
            </Link>
            <Link href="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              About
            </Link>
            {services.map(service => (
              <Link 
                key={service._id} 
                href={`/services/${service.slug}`}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                {service.title}
              </Link>
            ))}
            <Link href="/posts" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700">
              Blog
            </Link>
            <Link href="/donate" className="block pl-3 pr-4 py-2 border-l-4 border-primary text-base font-medium text-primary-dark bg-primary-light">
              Donate
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
