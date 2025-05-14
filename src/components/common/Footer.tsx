'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`${email} पर सदस्यता के लिए धन्यवाद!`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-800 text-gray-100">
      {/* Top donate banner */}
      <div className="bg-green-600 py-3 px-4 text-white text-center">
        <p className="mb-2 font-medium">Support our mission to help animals in need</p>
        <Link href="/donate" className="inline-block bg-white text-green-600 px-6 py-2 rounded-full font-medium">
          Donate Now
        </Link>
      </div>
      
      {/* Main footer */}
      <div className="px-4 py-6">
        <div className="mb-6">
          <h3 className="font-bold text-xl mb-2">Karuna For All</h3>
          <p className="text-sm mb-4">
            Dedicated to animal welfare, rescue operations, and creating a compassionate community 
            for animals in need since 2010.
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className="font-bold mb-2 text-lg">Quick Links</h4>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link href="/adoption" className="text-gray-300 hover:text-white">Adoption</Link>
            <Link href="/donate" className="text-gray-300 hover:text-white">Donate</Link>
            <Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            <Link href="/volunteer" className="text-gray-300 hover:text-white">Volunteer</Link>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-bold mb-2 text-lg">Contact Us</h4>
          <div className="flex flex-col space-y-2 text-sm">
            <a href="tel:+918800123456" className="flex items-center">
              <FaPhone className="mr-2" />
              +91 8800-123456
            </a>
            <a href="mailto:contact@karunaforall.org" className="flex items-center">
              <FaEnvelope className="mr-2" />
              contact@karunaforall.org
            </a>
            <div className="flex items-start">
              <FaMapMarkerAlt className="mr-2 mt-1" />
              <address className="not-italic">
                Karuna For All Trust<br />
                42, Sardar Patel Road<br />
                New Delhi, 110057
              </address>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mb-6">
          <h4 className="font-bold mb-2 text-lg">Newsletter</h4>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="px-4 py-2 rounded-l flex-grow text-gray-800 mb-2 sm:mb-0"
            />
            <button 
              type="submit" 
              className="bg-green-600 px-4 py-2 rounded-r font-medium sm:-ml-1"
            >
              Subscribe
            </button>
          </form>
        </div>
        
        {/* Social Media */}
        <div className="flex justify-center space-x-4 mb-6">
          <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-green-600 transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-green-600 transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-green-600 transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-green-600 transition-colors">
            <FaYoutube />
          </a>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="bg-gray-900 py-3 px-4 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Karuna For All. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;