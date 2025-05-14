import React, { useState, useRef } from 'react';
import { useMedia } from '../../context/MediaContext';

const MediaUploadTab: React.FC = () => {
  const { categories, addMediaItem, addCategory } = useMedia();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // In a real app, this would upload to your server/storage
      const fileUrl = URL.createObjectURL(file);
      
      // Complete the upload
      setTimeout(() => {
        setUploadProgress(100);
        addMediaItem({
          id: `temp-${Date.now()}`,
          title: file.name.split('.').slice(0, -1).join('.') || file.name,
          fileName: file.name,
          filePath: fileUrl,
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
            width: 0,
            height: 0
          },
          altText: file.name.split('.').slice(0, -1).join('.')
        });
        
        // Reset
        setIsUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 1500);
      
    } catch (error) {
      console.error('Error uploading file:', error);
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
        <label className="block mb-2 text-sm font-medium">Select Category</label>
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
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
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
            <div className="text-sm">Uploading... {uploadProgress}%</div>
          </div>
        ) : (
          <div>
            <div className="text-gray-500 mb-3">Drag and drop an image here, or</div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Select File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaUploadTab;
