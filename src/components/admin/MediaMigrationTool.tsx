import React, { useState, useEffect } from 'react';
import { MediaMigration } from '../../utils/MediaMigration';
import { useMedia } from '../../context/MediaContext';

const MediaMigrationTool: React.FC = () => {
  const { refreshMediaItems } = useMedia();
  const [migratableItems, setMigratableItems] = useState<number>(0);
  const [isMigrating, setIsMigrating] = useState<boolean>(false);
  const [migrationResult, setMigrationResult] = useState<{
    success?: boolean;
    count?: number;
    message?: string;
  }>({});
  
  useEffect(() => {
    // Check for migratable items when component mounts
    checkMigratableItems();
  }, []);
  
  const checkMigratableItems = async () => {
    try {
      const count = await MediaMigration.checkForMigratableMedia();
      setMigratableItems(count);
    } catch (error) {
      console.error('Error checking for migratable media:', error);
      setMigratableItems(0);
    }
  };

  const startMigration = async () => {
    if (isMigrating) return;
    
    setIsMigrating(true);
    setMigrationResult({});
    
    try {
      // Perform the migration
      const result = await MediaMigration.importAllMedia();
      
      // Update migration result
      setMigrationResult({
        success: result.success,
        count: result.count,
        message: result.message
      });
      
      // Refresh media items in context
      await refreshMediaItems();
    } catch (error) {
      console.error('Media migration failed:', error);
      setMigrationResult({
        success: false,
        message: `Migration failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsMigrating(false);
      // Recheck for any remaining items
      checkMigratableItems();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Media Migration Tool</h2>
      
      <div className="mb-6">
        <p className="mb-2">
          This tool helps you migrate media items from the old storage format to the new centralized media library.
        </p>
        
        {migratableItems > 0 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-yellow-800">
              Found <strong>{migratableItems}</strong> items that can be migrated to the new media library system.
            </p>
          </div>
        ) : migratableItems === 0 && !isMigrating ? (
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <p className="text-green-800">
              No items found that need migration. Your media library is up to date!
            </p>
          </div>
        ) : null}
      </div>
      
      {/* Results message */}
      {migrationResult.message && (
        <div className={`mb-4 p-3 rounded ${
          migrationResult.success ? 'bg-green-50 text-green-800 border border-green-200' : 
                                   'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <p>{migrationResult.message}</p>
          {migrationResult.success && (
            <p className="mt-1 text-sm">
              Successfully processed: <strong>{migrationResult.count}</strong> items
            </p>
          )}
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
          onClick={checkMigratableItems}
          disabled={isMigrating}
        >
          Refresh Count
        </button>
        
        <button
          className={`px-4 py-2 rounded ${
            migratableItems > 0 && !isMigrating 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={startMigration}
          disabled={migratableItems === 0 || isMigrating}
        >
          {isMigrating ? 'Migrating...' : 'Start Migration'}
        </button>
      </div>
    </div>
  );
};

export default MediaMigrationTool;
