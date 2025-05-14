import React from 'react';
import Image from 'next/image';
import { MediaItem } from './MediaManager';

type MediaGridViewProps = {
  media: MediaItem[];
  selectedMedia: MediaItem[];
  onSelect: (media: MediaItem) => void;
};

const MediaGridView: React.FC<MediaGridViewProps> = ({ media, selectedMedia, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {media.map(item => {
        const isSelected = selectedMedia.some(selected => selected.id === item.id);
        
        return (
          <div 
            key={item.id}
            className={`relative border rounded-lg overflow-hidden cursor-pointer transition-all
                       ${isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:shadow-md'}`}
            onClick={() => onSelect(item)}
          >
            {/* Image preview */}
            <div className="aspect-square bg-gray-100 relative">
              {item.fileType === 'image' ? (
                <Image
                  src={item.filePath}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <span className="text-4xl">📄</span>
                </div>
              )}
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
            
            {/* Caption */}
            <div className="p-2">
              <div className="text-sm truncate" title={item.title}>
                {item.fileName}
              </div>
              {item.category && (
                <div className="text-xs text-gray-500">
                  {item.category}
                </div>
              )}
            </div>
          </div>
        );
      })}
      
      {media.length === 0 && (
        <div className="col-span-full text-center py-10 text-gray-500">
          No media found. Try adjusting filters or upload new files.
        </div>
      )}
    </div>
  );
};

export default MediaGridView;
