import React, { useState, useEffect } from 'react';
import { MediaItem } from './MediaManager';

type MediaUsageProps = {
  mediaId?: string;
  showAll?: boolean;
};

type PageUsage = {
  path: string;
  title: string;
  usageType: 'hero' | 'gallery' | 'icon' | 'thumbnail' | 'background' | 'content';
  lastUsed: string;
};

const MediaUsageTracker: React.FC<MediaUsageProps> = ({ mediaId, showAll = false }) => {
  const [usageData, setUsageData] = useState<PageUsage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch usage data from an API
    const fetchUsageData = async () => {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const sampleUsageData: PageUsage[] = [
          { 
            path: '/animals', 
            title: 'Animals Page', 
            usageType: 'gallery',
            lastUsed: '2025-05-01'
          },
          { 
            path: '/about', 
            title: 'About Us Page', 
            usageType: 'thumbnail',
            lastUsed: '2025-04-28'
          },
          { 
            path: '/home', 
            title: 'Home Page', 
            usageType: 'hero',
            lastUsed: '2025-05-10'
          },
          { 
            path: '/volunteer', 
            title: 'Volunteer Page', 
            usageType: 'background',
            lastUsed: '2025-05-05'
          },
        ];
        
        // Filter by mediaId if provided
        const filteredData = mediaId 
          ? sampleUsageData.filter((_, index) => index % 2 === 0) // Just a mock filter
          : sampleUsageData;
          
        setUsageData(filteredData);
        setLoading(false);
      }, 500);
    };
    
    fetchUsageData();
  }, [mediaId]);
  
  if (loading) {
    return (
      <div className="py-4 text-center text-gray-500">
        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading usage data...
      </div>
    );
  }
  
  if (usageData.length === 0) {
    return (
      <div className="py-4 text-center text-gray-500">
        <p>No usage data found for this media.</p>
        <p className="text-sm mt-1">This media is not currently used on any page.</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        {showAll ? 'Media Usage Across Site' : 'Usage For Selected Media'}
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage Type
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Used
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usageData.map((usage, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">{usage.title}</div>
                    <div className="ml-2 text-xs text-gray-500">{usage.path}</div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full 
                    ${usage.usageType === 'hero' ? 'bg-blue-100 text-blue-800' : ''}
                    ${usage.usageType === 'gallery' ? 'bg-green-100 text-green-800' : ''}
                    ${usage.usageType === 'thumbnail' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${usage.usageType === 'background' ? 'bg-purple-100 text-purple-800' : ''}
                    ${usage.usageType === 'icon' ? 'bg-gray-100 text-gray-800' : ''}
                    ${usage.usageType === 'content' ? 'bg-pink-100 text-pink-800' : ''}
                  `}>
                    {usage.usageType}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {usage.lastUsed}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MediaUsageTracker;
