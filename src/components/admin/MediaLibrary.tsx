import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useMedia } from '../../context/MediaContext';
import { MediaItem } from './MediaManager';
import MediaDetailView from './MediaDetailView';

// Import smaller components
import MediaLibraryTabs from './MediaLibraryTabs';
import MediaBulkUploadTab from './MediaBulkUploadTab';
import MediaGridView from './MediaGridView';

type MediaLibraryProps = {
  onSelect?: (media: MediaItem | MediaItem[]) => void;
  multiSelect?: boolean;
  allowedTypes?: string[];
  showUsageInfo?: boolean;
};

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  onSelect,
  multiSelect = false,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  showUsageInfo = false,
}) => {
  const { 
    mediaItems,
    categories, 
    filter, 
    setFilter, 
    getPaginatedMedia 
  } = useMedia();
  
  const [activeTab, setActiveTab] = useState<'library' | 'upload' | 'bulk'>('library');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>([]);
  const [detailViewMedia, setDetailViewMedia] = useState<MediaItem | null>(null);
  
  // Handle media selection
  const handleMediaSelect = (media: MediaItem) => {
    if (multiSelect) {
      const isSelected = selectedMedia.some(item => item.id === media.id);
      if (isSelected) {
        setSelectedMedia(selectedMedia.filter(item => item.id !== media.id));
      } else {
        setSelectedMedia([...selectedMedia, media]);
      }
    } else {
      setDetailViewMedia(media);
      if (onSelect) {
        onSelect(media);
      }
    }
  };

  // Confirm selection of multiple items
  const confirmMultipleSelection = () => {
    if (onSelect && selectedMedia.length > 0) {
      onSelect(selectedMedia);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      {/* Tabs */}
      <MediaLibraryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Content based on active tab */}
      <div className="mt-4">
        {activeTab === 'library' && (
          <div>
            {/* Filter controls */}
            <div className="flex flex-wrap gap-3 mb-4">
              {/* Category filter */}
              <select 
                className="border rounded px-2 py-1"
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              {/* File type filter */}
              <select 
                className="border rounded px-2 py-1"
                value={filter.fileType}
                onChange={(e) => setFilter({...filter, fileType: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>
              
              {/* Search filter */}
              <input 
                type="text"
                placeholder="Search media..."
                className="border rounded px-2 py-1"
                value={filter.searchQuery || ''}
                onChange={(e) => setFilter({...filter, searchQuery: e.target.value})}
              />
            </div>
            
            {/* Media grid */}
            <MediaGridView 
              media={getPaginatedMedia()}
              selectedMedia={selectedMedia}
              onSelect={handleMediaSelect}
            />
            
            {/* Multi-select actions */}
            {multiSelect && selectedMedia.length > 0 && (
              <div className="mt-4 text-right">
                <button 
                  onClick={confirmMultipleSelection}
                  className="bg-brand-primary text-white px-4 py-2 rounded"
                >
                  Select {selectedMedia.length} items
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'upload' && (
          <div className="p-4 text-center">
            <p>Upload functionality coming soon</p>
          </div>
        )}
        {activeTab === 'bulk' && <MediaBulkUploadTab />}
      </div>
      
      {/* Detail view */}
      {detailViewMedia && (
        <MediaDetailView 
          media={detailViewMedia}
          onClose={() => setDetailViewMedia(null)}
        />
      )}
    </div>
  );
};

export default MediaLibrary;