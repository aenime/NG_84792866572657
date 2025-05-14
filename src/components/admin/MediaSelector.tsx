import React, { useState } from 'react';
import Image from 'next/image';
import MediaManager, { MediaItem } from './MediaManager';

type MediaSelectorProps = {
  onSelect: (media: MediaItem | MediaItem[]) => void;
  onCancel?: () => void;
  multiSelect?: boolean;
  allowedTypes?: string[];
  title?: string;
  initialSelectedMedia?: MediaItem[];
};

const MediaSelector: React.FC<MediaSelectorProps> = ({
  onSelect,
  onCancel,
  multiSelect = false,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  title = 'Select Media',
  initialSelectedMedia = [],
}) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>(initialSelectedMedia);
  
  const handleSelect = (media: MediaItem) => {
    if (multiSelect) {
      const isAlreadySelected = selectedMedia.some(item => item.id === media.id);
      if (isAlreadySelected) {
        setSelectedMedia(selectedMedia.filter(item => item.id !== media.id));
      } else {
        setSelectedMedia([...selectedMedia, media]);
      }
    } else {
      setSelectedMedia([media]);
    }
  };
  
  const handleConfirm = () => {
    if (selectedMedia.length === 0) {
      return;
    }
    
    if (multiSelect) {
      onSelect(selectedMedia);
    } else {
      onSelect(selectedMedia[0]);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-auto p-6">
          <MediaManager 
            onSelect={handleSelect}
            multiSelect={multiSelect}
            allowedTypes={allowedTypes}
            initialSelectedMedia={selectedMedia}
          />
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <div className="flex items-center">
            <span className="text-sm text-gray-500">
              {selectedMedia.length} {selectedMedia.length === 1 ? 'item' : 'items'} selected
            </span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedMedia.length === 0}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${selectedMedia.length > 0 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              {multiSelect ? `Use Selected (${selectedMedia.length})` : 'Use Selected'}
            </button>
          </div>
        </div>
        
        {/* Selected media preview (for multi-select) */}
        {multiSelect && selectedMedia.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs font-medium text-gray-500 mb-2">Selected Media:</p>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {selectedMedia.map(media => (
                <div key={media.id} className="relative flex-shrink-0">
                  <div className="h-16 w-16 border border-gray-200 rounded-md overflow-hidden bg-gray-100">
                    {media.fileType === 'image' ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={media.filePath}
                          alt={media.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedMedia(selectedMedia.filter(item => item.id !== media.id))}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 border border-gray-300 shadow-sm"
                    aria-label="Remove selection"
                  >
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaSelector;
