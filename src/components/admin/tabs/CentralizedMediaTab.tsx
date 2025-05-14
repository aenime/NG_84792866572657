import React, { useState } from 'react';
import MediaDashboard from '../MediaDashboard';

const CentralizedMediaTab: React.FC = () => {
  const [showMigrationTool, setShowMigrationTool] = useState(false);
  
  return (
    <div>
      <div className="pb-4 mb-6 border-b border-gray-200">
        <div className="flex justify-end">
          <button
            onClick={() => setShowMigrationTool(!showMigrationTool)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {showMigrationTool ? 'Hide Migration Tool' : 'Data Migration Tool'}
          </button>
        </div>
        
        {showMigrationTool && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-md">
            <p className="mb-2 font-medium">Media Migration Tool</p>
            <p>The migration tool is currently disabled. Please check back later.</p>
          </div>
        )}
      </div>
      
      <MediaDashboard />
    </div>
  );
};

export default CentralizedMediaTab;
