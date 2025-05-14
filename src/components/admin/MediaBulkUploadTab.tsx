import React, { useState, useRef } from 'react';
import { useMedia } from '../../context/MediaContext';
import { MediaItem } from './MediaManager';

const MediaBulkUploadTab: React.FC = () => {
  const { categories, addMediaItems, addCategory } = useMedia();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const bulkInputRef = useRef<HTMLInputElement>(null);

  const handleBulkFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    setIsUploading(true);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 2;
      });
    }, 100);
    
    try {
      // In a real app, this would upload all files to your server/storage
      
      // Complete the upload after a delay
      setTimeout(() => {
        setUploadProgress(100);
        
        // Create media items
        const mediaItems: MediaItem[] = files.map((file, index) => ({
          id: `temp-${Date.now()}-${index}`,
          title: file.name.split('.').slice(0, -1).join('.') || file.name,
          fileName: file.name,
          filePath: urls[index],
          fileType: (file.type.startsWith('image/') ? 'image' : 
                     file.type.startsWith('video/') ? 'video' : 'document') as 'image' | 'video' | 'document',
          fileSize: file.size,
          mimeType: file.type,
          category: selectedCategory || 'uncategorized',
          tags: [],
          uploadDate: new Date().toISOString(),
          description: '',
          uploadedBy: 'Admin',
          dimensions: {
            width: 0,  // These would be set correctly with real images
            height: 0
          },
          altText: file.name.split('.').slice(0, -1).join('.')
        }));
        
        addMediaItems(mediaItems);
        
        // Reset
        setIsUploading(false);
        setUploadProgress(0);
        setPreviewUrls([]);
        if (bulkInputRef.current) bulkInputRef.current.value = '';
        
        // Show category prompt if no category selected
        if (!selectedCategory) {
          // In a real app, show category selection modal
          alert('Remember to assign these files to a category!');
        }
        
      }, 2000);
      
    } catch (error) {
      console.error('Error uploading files:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCreateCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium">Select Category for All Files</label>
        <div className="flex gap-2">
          <select 
            className="border rounded px-3 py-2 flex-1"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <div className="flex items-center gap-2">
            <input 
              type="text"
              placeholder="New category"
              className="border rounded px-3 py-2"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateCategory()}
            />
            <button 
              onClick={handleCreateCategory}
              className="bg-green-600 text-white px-3 py-2 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          ref={bulkInputRef}
          onChange={handleBulkFileSelect}
          accept="image/*"
          multiple
          className="hidden"
        />
        
        {isUploading ? (
          <div>
            <div className="h-2 bg-gray-200 rounded-full mb-2">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <div className="text-sm">Uploading {previewUrls.length} files... {uploadProgress}%</div>
            
            {/* Preview grid */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {previewUrls.slice(0, 8).map((url, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={url} 
                    alt={`Preview ${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {previewUrls.length > 8 && (
                <div className="aspect-square bg-gray-800 rounded flex items-center justify-center text-white">
                  +{previewUrls.length - 8}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-gray-500 mb-3">Drag and drop multiple images here, or</div>
            <button 
              onClick={() => bulkInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Select Multiple Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaBulkUploadTab;
