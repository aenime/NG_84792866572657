'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const [ngo, setNgo] = useState({
    name: 'Animal Welfare NGO',
    address: '123 Main Street, City',
    phone: '+1234567890',
    email: 'info@animalwelfare.org',
    social_media: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  });
  
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setNgo(data);
        }
      } catch (error) {
        console.error('Failed to fetch NGO settings', error);
      }
    }
    
    fetchSettings();
  }, []);
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{ngo.name}</h3>
            <p className="mb-2">{ngo.address}</p>
            <p className="mb-2">{ngo.phone}</p>
            <p className="mb-4">{ngo.email}</p>
            
            <div className="flex space-x-4">
              {ngo.social_media?.facebook && (
                <a href={ngo.social_media.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebook className="h-6 w-6" />
                </a>
              )}
              {ngo.social_media?.twitter && (
                <a href={ngo.social_media.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter className="h-6 w-6" />
                </a>
              )}
              {ngo.social_media?.instagram && (
                <a href={ngo.social_media.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-primary-light">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary-light">About Us</Link></li>
              <li><Link href="/posts" className="hover:text-primary-light">Blog</Link></li>
              <li><Link href="/donate" className="hover:text-primary-light">Donate</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-primary-light">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="hover:text-primary-light">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {year} {ngo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
