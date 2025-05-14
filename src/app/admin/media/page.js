'use client';

import { useState, useEffect } from 'react';
import MediaUploader from '../../../components/admin/MediaUploader';
import axios from 'axios';

// Sample categories for demonstration
const SAMPLE_CATEGORIES = ['animals', 'success-stories', 'blog', 'general'];

export default function MediaManagement() {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Fetch media items when component mounts or category changes
  useEffect(() => {
    async function fetchMediaItems() {
      setLoading(true);
      try {
        // In a real app, this would be an API call to fetch media items
        // For now, we'll simulate a response
        // const response = await axios.get(`/api/media?category=${selectedCategory}`);
        // setMediaItems(response.data.items);
        
        // Simulated data
        setTimeout(() => {
          setMediaItems(generateSampleMediaItems(selectedCategory));
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching media:', error);
        setLoading(false);
      }
    }
    
    fetchMediaItems();
  }, [selectedCategory]);
  
  // Handle successful upload
  const handleUploadComplete = (uploadedFiles) => {
    // In a real app, you might want to refetch the media items
    // or just add the new uploads to the existing list
    setMediaItems((prevItems) => [...uploadedFiles, ...prevItems]);
  };
  
  // Handle category filter change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  // Simulate media items for demonstration
  function generateSampleMediaItems(category) {
    const items = [];
    const categories = category === 'all' ? SAMPLE_CATEGORIES : [category];
    
    for (let i = 0; i < 12; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      items.push({
        id: `media-${i}`,
        name: `Sample Image ${i + 1}`,
        path: `https://via.placeholder.com/300x200?text=Image+${i + 1}`,
        thumbPath: `https://via.placeholder.com/100x100?text=${i + 1}`,
        category: randomCategory,
        uploadedAt: new Date(Date.now() - Math.random() * 10000000).toISOString(),
        used: Math.random() > 0.5,
      });
    }
    
    return items;
  }
  
  return (
    <div className="max-w-site mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Media Management</h1>
      
      {/* Media uploader */}
      <div className="mb-8">
        <MediaUploader 
          onUploadComplete={handleUploadComplete} 
          categories={SAMPLE_CATEGORIES} 
        />
      </div>
      
      {/* Media gallery section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Media Gallery</h2>
          
          {/* Category filter */}
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            {SAMPLE_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Loading media items...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mediaItems.map((item) => (
              <div key={item.id} className="border rounded-lg overflow-hidden bg-white">
                <div className="relative">
                  <img
                    src={item.thumbPath}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <span 
                    className={`absolute bottom-2 left-2 text-xs px-2 py-1 rounded ${
                      item.used ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {item.used ? 'Used' : 'Unused'}
                  </span>
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-sm truncate">{item.name}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && mediaItems.length === 0 && (
          <div className="text-center py-8 border rounded bg-gray-50">
            <p>No media items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
