import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export type MediaItem = {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  fileType: 'image' | 'video' | 'document';
  fileSize: number;
  mimeType: string;
  category: string;
  tags: string[];
  uploadDate: string;
  description: string;
  uploadedBy: string;
  dimensions?: {
    width: number;
    height: number;
  };
  altText?: string;
  usage?: string[];
};

type MediaManagerProps = {
  onSelect?: (media: MediaItem) => void;
  multiSelect?: boolean;
  allowedTypes?: string[];
  showUsageInfo?: boolean;
  initialSelectedMedia?: MediaItem[];
};

const MediaManager: React.FC<MediaManagerProps> = ({
  onSelect,
  multiSelect = false,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  showUsageInfo = false,
  initialSelectedMedia = [],
}) => {
  // State management
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem[]>(initialSelectedMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'upload' | 'library'>('library');
  const [filter, setFilter] = useState({
    searchQuery: '',
    category: '',
    fileType: '',
    dateRange: {
      start: '',
      end: '',
    },
    tags: [] as string[],
  });
  const [bulkUploadFiles, setBulkUploadFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [categories, setCategories] = useState([
    'Animals', 
    'Dogs', 
    'Cats', 
    'Cows', 
    'Birds', 
    'Injured Animals', 
    'Success Stories',
    'Events',
    'Volunteers',
    'Facilities',
    'Team'
  ]);
  const [newCategory, setNewCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkInputRef = useRef<HTMLInputElement>(null);
  
  // Pagination
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  });
  
  // Load sample data for demo purposes
  useEffect(() => {
    // In a real app, this would be an API call
    const sampleMedia: MediaItem[] = [
      {
        id: '1',
        title: 'Charlie',
        fileName: 'dog1.jpg',
        filePath: '/images/animals/dog1.jpg',
        fileType: 'image',
        fileSize: 245000,
        mimeType: 'image/jpeg',
        category: 'Dogs',
        tags: ['rescued', 'adoption'],
        uploadDate: '2025-04-15',
        description: 'Rescued German Shepherd',
        uploadedBy: 'admin',
        dimensions: {
          width: 1200,
          height: 800,
        },
        altText: 'German Shepherd dog sitting',
        usage: ['/animals', '/adoption'],
      },
      {
        id: '2',
        title: 'Mittens',
        fileName: 'cat1.jpg',
        filePath: '/images/animals/cat1.jpg',
        fileType: 'image',
        fileSize: 186000,
        mimeType: 'image/jpeg',
        category: 'Cats',
        tags: ['stray', 'rescued'],
        uploadDate: '2025-04-20',
        description: 'Stray cat rescued from highway',
        uploadedBy: 'admin',
        dimensions: {
          width: 1000,
          height: 667,
        },
        altText: 'Gray cat resting',
        usage: ['/animals/cats'],
      },
      {
        id: '3',
        title: 'Injured Dog',
        fileName: 'injured-dog1.jpg',
        filePath: '/images/animals/injured/injured-dog1.jpg',
        fileType: 'image',
        fileSize: 310000,
        mimeType: 'image/jpeg',
        category: 'Injured Animals',
        tags: ['injured', 'emergency', 'treatment'],
        uploadDate: '2025-04-25',
        description: 'Dog with injured paw, recovering',
        uploadedBy: 'admin',
        dimensions: {
          width: 1200,
          height: 800,
        },
        altText: 'Injured dog with bandaged leg',
        usage: ['/animals/injured'],
      },
      {
        id: '4',
        title: 'Volunteer Team',
        fileName: 'volunteers.jpg',
        filePath: '/images/humans/volunteers.jpg',
        fileType: 'image',
        fileSize: 420000,
        mimeType: 'image/jpeg',
        category: 'Volunteers',
        tags: ['team', 'volunteers', 'community'],
        uploadDate: '2025-05-06',
        description: 'Our amazing volunteer team',
        uploadedBy: 'admin',
        dimensions: {
          width: 1500,
          height: 1000,
        },
        altText: 'Group of volunteers',
        usage: ['/volunteer'],
      },
    ];
    
    setMediaItems(sampleMedia);
    setPagination(prev => ({ ...prev, totalItems: sampleMedia.length }));
  }, []);
  
  // Filtered and paginated media items
  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) || 
                        item.description.toLowerCase().includes(filter.searchQuery.toLowerCase());
    const matchesCategory = !filter.category || item.category === filter.category;
    const matchesFileType = !filter.fileType || item.fileType === filter.fileType;
    
    return matchesSearch && matchesCategory && matchesFileType;
  });
  
  const paginatedMedia = filteredMedia.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrls([reader.result]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle bulk file selection
  const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setBulkUploadFiles(filesArray);
      
      // Create preview URLs for all files
      const previewsArray = filesArray.map(file => {
        return URL.createObjectURL(file);
      });
      setPreviewUrls(previewsArray);
    }
  };
  
  // Clear file selection
  const clearFileSelection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreviewUrls([]);
  };
  
  // Clear bulk upload selection
  const clearBulkUpload = () => {
    if (bulkInputRef.current) {
      bulkInputRef.current.value = '';
    }
    setBulkUploadFiles([]);
    setPreviewUrls([]);
  };
  
  // Handle single file upload
  const handleUpload = async (file: File, metadata: Partial<MediaItem>) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      
      // In a real app, this would be an API call to upload the file
      // For demo, we'll just simulate the upload
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        
        // Create a new media item
        const newItem: MediaItem = {
          id: `${Date.now()}`,
          title: metadata.title || file.name.split('.')[0],
          fileName: file.name,
          filePath: `/uploads/${file.name}`, // This would be the actual path after upload
          fileType: file.type.startsWith('image/') ? 'image' : 
                   file.type.startsWith('video/') ? 'video' : 'document',
          fileSize: file.size,
          mimeType: file.type,
          category: metadata.category || 'Uncategorized',
          tags: metadata.tags || [],
          uploadDate: new Date().toISOString().split('T')[0],
          description: metadata.description || '',
          uploadedBy: 'admin',
          altText: metadata.altText || '',
        };
        
        setMediaItems(prev => [newItem, ...prev]);
        setPagination(prev => ({ ...prev, totalItems: prev.totalItems + 1 }));
        setIsUploading(false);
        clearFileSelection();
        
        // Switch to library tab
        setActiveTab('library');
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
    }
  };
  
  // Handle bulk upload
  const handleBulkUpload = async (files: File[], commonMetadata: Partial<MediaItem>) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 200);
      
      // In a real app, this would be an API call to upload multiple files
      setTimeout(() => {
        clearInterval(interval);
        setUploadProgress(100);
        
        // Create new media items
        const newItems: MediaItem[] = files.map((file, index) => ({
          id: `${Date.now()}-${index}`,
          title: commonMetadata.title || file.name.split('.')[0],
          fileName: file.name,
          filePath: `/uploads/${file.name}`, // This would be the actual path after upload
          fileType: file.type.startsWith('image/') ? 'image' : 
                   file.type.startsWith('video/') ? 'video' : 'document',
          fileSize: file.size,
          mimeType: file.type,
          category: commonMetadata.category || 'Uncategorized',
          tags: commonMetadata.tags || [],
          uploadDate: new Date().toISOString().split('T')[0],
          description: commonMetadata.description || '',
          uploadedBy: 'admin',
          altText: commonMetadata.altText || '',
        }));
        
        setMediaItems(prev => [...newItems, ...prev]);
        setPagination(prev => ({ ...prev, totalItems: prev.totalItems + files.length }));
        setIsUploading(false);
        clearBulkUpload();
        
        // Switch to library tab
        setActiveTab('library');
      }, 3000);
    } catch (error) {
      console.error('Bulk upload failed:', error);
      setIsUploading(false);
    }
  };
  
  // Handle media selection
  const handleMediaSelect = (media: MediaItem) => {
    if (multiSelect) {
      // For multi-select, toggle selection
      setSelectedMedia(prev => {
        const alreadySelected = prev.some(item => item.id === media.id);
        if (alreadySelected) {
          return prev.filter(item => item.id !== media.id);
        } else {
          return [...prev, media];
        }
      });
    } else {
      // For single select, replace selection
      setSelectedMedia([media]);
      // If onSelect callback provided, call it
      if (onSelect) {
        onSelect(media);
      }
    }
  };
  
  // Handle deleting media
  const handleDeleteMedia = (mediaId: string) => {
    if (confirm('Are you sure you want to delete this media?')) {
      setMediaItems(prev => prev.filter(item => item.id !== mediaId));
      setSelectedMedia(prev => prev.filter(item => item.id !== mediaId));
    }
  };
  
  // Handle edit media metadata
  const handleEditMedia = (mediaId: string, updatedData: Partial<MediaItem>) => {
    setMediaItems(prev => 
      prev.map(item => 
        item.id === mediaId ? { ...item, ...updatedData } : item
      )
    );
  };
  
  // Handle adding a new category
  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory('');
    }
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('library')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'library'
                ? 'text-green-600 border-b-2 border-green-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Media Library
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'upload'
                ? 'text-green-600 border-b-2 border-green-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Upload Files
          </button>
        </div>
      </div>
      
      {activeTab === 'library' && (
        <div className="p-4">
          {/* Filters */}
          <div className="mb-4 flex flex-wrap gap-4 items-center">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search media..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filter.searchQuery}
                onChange={(e) => setFilter({ ...filter, searchQuery: e.target.value })}
              />
            </div>
            <div>
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={filter.category}
                onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="p-2 border border-gray-300 rounded-md"
                value={filter.fileType}
                onChange={(e) => setFilter({ ...filter, fileType: e.target.value as any })}
              >
                <option value="">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>
            </div>
          </div>
          
          {/* Media Grid */}
          {filteredMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedMedia.map((media) => (
                <div 
                  key={media.id}
                  className={`border rounded-md overflow-hidden ${
                    selectedMedia.some(item => item.id === media.id) 
                      ? 'border-green-500 ring-2 ring-green-500' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleMediaSelect(media)}
                >
                  <div className="relative h-48 w-full bg-gray-100">
                    {media.fileType === 'image' && (
                      <Image
                        src={media.filePath}
                        alt={media.altText || media.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    {media.fileType === 'video' && (
                      <div className="flex items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    )}
                    {media.fileType === 'document' && (
                      <div className="flex items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{media.title}</h3>
                      <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                        {media.category}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500 truncate">{media.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-400">{media.uploadDate}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent selection toggle
                          handleDeleteMedia(media.id);
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No media items found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or upload new media</p>
            </div>
          )}
          
          {/* Pagination */}
          {filteredMedia.length > pagination.itemsPerPage && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center space-x-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, pagination.currentPage - 1))}
                  disabled={pagination.currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    pagination.currentPage === 1
                      ? 'text-gray-300'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Previous
                </button>
                
                {Array.from(
                  { length: Math.ceil(filteredMedia.length / pagination.itemsPerPage) },
                  (_, i) => i + 1
                ).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded-md ${
                      pagination.currentPage === page
                        ? 'bg-green-100 text-green-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(Math.min(
                    Math.ceil(filteredMedia.length / pagination.itemsPerPage),
                    pagination.currentPage + 1
                  ))}
                  disabled={pagination.currentPage === Math.ceil(filteredMedia.length / pagination.itemsPerPage)}
                  className={`px-3 py-1 rounded-md ${
                    pagination.currentPage === Math.ceil(filteredMedia.length / pagination.itemsPerPage)
                      ? 'text-gray-300'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Next
                </button>
              </nav>
            </div>
          )}
          
          {/* Selected Media Actions */}
          {selectedMedia.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{selectedMedia.length} item(s) selected</span>
                <div className="flex space-x-2">
                  {multiSelect && onSelect && (
                    <button
                      onClick={() => onSelect(selectedMedia[0])}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Use Selected Media
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedMedia([])}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'upload' && (
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Upload New Media</h3>
            <p className="text-sm text-gray-500">Upload images, videos, or other media files</p>
          </div>
          
          {/* Single File Upload */}
          <div className="mb-8 bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-700 mb-3">Single File Upload</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select File
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  accept={allowedTypes.join(',')}
                />
                {previewUrls.length === 1 && (
                  <div className="mt-2 relative h-32 w-32 rounded-md overflow-hidden">
                    <img src={previewUrls[0]} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alt Text (for accessibility)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Describe the image"
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Add description"
                ></textarea>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags (separate with commas)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., dog, rescue, adoption"
                />
              </div>
              
              <div className="md:col-span-3 flex items-center mt-2">
                <button
                  onClick={() => handleUpload(new File([], 'placeholder'), {})}
                  disabled={previewUrls.length !== 1 || isUploading}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
                
                {previewUrls.length === 1 && (
                  <button
                    onClick={clearFileSelection}
                    className="ml-2 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 text-right">
                  {uploadProgress}% Complete
                </p>
              </div>
            )}
          </div>
          
          {/* Bulk Upload */}
          <div className="mb-8 bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-700 mb-3">Bulk Upload</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Multiple Files
                </label>
                <input
                  type="file"
                  ref={bulkInputRef}
                  onChange={handleBulkFileSelect}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  accept={allowedTypes.join(',')}
                  multiple
                />
                
                {previewUrls.length > 1 && (
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {previewUrls.map((preview, index) => (
                      <div key={index} className="relative h-24 rounded-md overflow-hidden">
                        <img src={preview} alt={`Preview ${index + 1}`} className="object-cover w-full h-full" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Common Category
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-md">
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Common Tags (separate with commas)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Apply the same tags to all files"
                />
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Common Description (optional)
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  rows={2}
                  placeholder="Common description for all files (you can edit each file individually later)"
                ></textarea>
              </div>
              
              <div className="md:col-span-3 flex items-center mt-2">
                <button
                  onClick={() => handleBulkUpload(bulkUploadFiles, {})}
                  disabled={bulkUploadFiles.length === 0 || isUploading}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? 'Uploading...' : `Upload ${bulkUploadFiles.length} Files`}
                </button>
                
                {bulkUploadFiles.length > 0 && (
                  <button
                    onClick={clearBulkUpload}
                    className="ml-2 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-100"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            {isUploading && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500 text-right">
                  {uploadProgress}% Complete
                </p>
              </div>
            )}
          </div>
          
          {/* Category Management */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-gray-700 mb-3">Media Categories</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(category => (
                <span key={category} className="px-2 py-1 bg-gray-200 rounded text-sm">
                  {category}
                </span>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category"
                className="flex-grow p-2 border border-gray-300 rounded-md rounded-r-none"
              />
              <button
                onClick={handleAddCategory}
                className="bg-green-600 text-white py-2 px-4 rounded-md rounded-l-none hover:bg-green-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaManager;
