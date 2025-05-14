import React from 'react';
import Image from 'next/image';

const MaintenancePage: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
        <div className="flex justify-center mb-6">
          <Image 
            src="/images/logo.png" 
            alt="Animal Welfare NGO Logo" 
            width={120} 
            height={120}
            priority
          />
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Mobile Experience Only</h1>
        
        <p className="mb-6">
          Our website is designed for optimal viewing on mobile devices with a maximum width of 500px.
          Please view this site on a mobile device or resize your browser window.
        </p>
        
        <div className="flex justify-center mb-6">
          <Image 
            src="/images/animals/dog1.jpg"
            alt="Cute animal"
            width={200}
            height={150}
            className="rounded-lg"
          />
        </div>
        
        <p className="text-gray-500 text-sm">
          Thank you for your understanding.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
