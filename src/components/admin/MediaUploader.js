'use client';

import { useState } from 'react';
import axios from 'axios';

/**
 * Media uploader component for the admin panel
 * Supports single or bulk uploads with category selection
 */
export default function MediaUploader({ onUploadComplete, categories = [] }) {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  
  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };
  
  // Handle category selection
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value === 'new') {
      setShowNewCategoryInput(true);
      setCategory('');
    } else {
      setShowNewCategoryInput(false);
      setCategory(value);
    }
  };
  
  // Handle upload process
  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }
    
    const selectedCategory = showNewCategoryInput ? newCategory : category;
    if (!selectedCategory) {
      setError('Please select or create a category');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      // Upload each file with progress tracking
      const uploadedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('category', selectedCategory);
        
        const response = await axios.post('/api/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        });
        
        if (response.data.success) {
          uploadedFiles.push(response.data.file);
        }
        
        // Update progress for multiple files
        setUploadProgress(Math.round((i + 1) * 100 / files.length));
      }
      
      // Reset form and notify parent component
      setFiles([]);
      setUploadProgress(0);
      setError('');
      if (onUploadComplete) {
        onUploadComplete(uploadedFiles);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Media Upload</h2>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Select Files</label>
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          className="w-full p-2 border rounded"
          disabled={uploading}
        />
        {files.length > 0 && (
          <p className="mt-2 text-sm text-gray-600">{files.length} file(s) selected</p>
        )}
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          className="w-full p-2 border rounded"
          onChange={handleCategoryChange}
          value={showNewCategoryInput ? 'new' : category}
          disabled={uploading}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="new">+ Create new category</option>
        </select>
      </div>
      
      {showNewCategoryInput && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Category Name</label>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter new category name"
            disabled={uploading}
          />
        </div>
      )}
      
      {uploading && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">{uploadProgress}% Uploaded</p>
        </div>
      )}
      
      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`w-full p-2 text-white rounded ${
          uploading || files.length === 0 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Files'}
      </button>
    </div>
  );
}
