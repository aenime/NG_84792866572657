'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  const [ngoInfo, setNgoInfo] = useState({
    name: 'Animal Welfare NGO',
    address: '123 Main Street, City, Country',
    phone: '+1234567890',
    email: 'contact@example.org',
    social_media: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  });
  
  useEffect(() => {
    async function fetchNGOInfo() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setNgoInfo({
            name: data.name || 'Animal Welfare NGO',
            address: data.address || '123 Main Street, City, Country',
            phone: data.phone || '+1234567890',
            email: data.email || 'contact@example.org',
            social_media: data.social_media || {
              facebook: 'https://facebook.com',
              twitter: 'https://twitter.com',
              instagram: 'https://instagram.com'
            }
          });
        }
      } catch (error) {
        console.error('Failed to fetch NGO info', error);
      }
    }
    
    fetchNGOInfo();
  }, []);
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">{ngoInfo.name}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                <span>{ngoInfo.address}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 flex-shrink-0" />
                <span>{ngoInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 flex-shrink-0" />
                <a href={`mailto:${ngoInfo.email}`} className="hover:underline">{ngoInfo.email}</a>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              {ngoInfo.social_media.facebook && (
                <a href={ngoInfo.social_media.facebook} target="_blank" rel="noreferrer" className="hover:text-primary-light transition-colors">
                  <FaFacebook size={22} />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {ngoInfo.social_media.twitter && (
                <a href={ngoInfo.social_media.twitter} target="_blank" rel="noreferrer" className="hover:text-primary-light transition-colors">
                  <FaTwitter size={22} />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
              {ngoInfo.social_media.instagram && (
                <a href={ngoInfo.social_media.instagram} target="_blank" rel="noreferrer" className="hover:text-primary-light transition-colors">
                  <FaInstagram size={22} />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-light transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-light transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-primary-light transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-light transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-primary-light transition-colors">
                  Make a Donation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-primary-light transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
            
            <div className="mt-8">
              <Link href="/donate" className="btn-primary">
                Support Our Cause
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {year} {ngoInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
