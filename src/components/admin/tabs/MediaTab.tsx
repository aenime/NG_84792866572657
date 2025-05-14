import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MediaItem } from '../MediaManager';
import MediaDetailView from '../MediaDetailView';
import MediaUsageTracker from '../MediaUsageTracker';

const MediaTab: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'videos' | 'documents'>('all');
  const [filter, setFilter] = useState({
    search: '',
    category: '',
    dateRange: {
      start: '',
      end: ''
    }
  });
  
  const [availableCategories, setAvailableCategories] = useState([
    'Dogs',
    'Cats',
    'Cows', 
    'Birds', 
    'Injured Animals',
    'Success Stories',
    'Events',
    'Volunteers'
  ]);
  
  // Load sample data for demo purposes
  useEffect(() => {
    // This would be an API call in a real app
    setTimeout(() => {
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
        {
          id: '5',
          title: 'NGO Annual Report',
          fileName: 'annual-report-2024.pdf',
          filePath: '/documents/annual-report-2024.pdf',
          fileType: 'document',
          fileSize: 3500000,
          mimeType: 'application/pdf',
          category: 'Reports',
          tags: ['annual report', 'financial', '2024'],
          uploadDate: '2025-03-15',
          description: 'Annual financial and activity report',
          uploadedBy: 'admin',
        },
        {
          id: '6',
          title: 'Vaccination Campaign Video',
          fileName: 'vaccination-camp.mp4',
          filePath: '/videos/vaccination-camp.mp4',
          fileType: 'video',
          fileSize: 25000000,
          mimeType: 'video/mp4',
          category: 'Events',
          tags: ['vaccination', 'campaign', 'community'],
          uploadDate: '2025-02-20',
          description: 'Video of our recent vaccination camp',
          uploadedBy: 'admin',
          dimensions: {
            width: 1920,
            height: 1080,
          }
        }
      ];
      
      setMediaItems(sampleMedia);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({...filter, category: e.target.value});
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({...filter, search: e.target.value});
  };
  
  const handleDeleteMedia = (mediaId: string) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      setMediaItems(mediaItems.filter(item => item.id !== mediaId));
      if (selectedMedia && selectedMedia.id === mediaId) {
        setSelectedMedia(null);
      }
    }
  };
  
  const handleUpdateMedia = (updatedMedia: MediaItem) => {
    setMediaItems(mediaItems.map(item => 
      item.id === updatedMedia.id ? updatedMedia : item
    ));
    setSelectedMedia(updatedMedia);
  };
  
  // Filter media based on active tab and filters
  const filteredMedia = mediaItems.filter(item => {
    // Filter by type
    if (activeTab === 'images' && item.fileType !== 'image') return false;
    if (activeTab === 'videos' && item.fileType !== 'video') return false;
    if (activeTab === 'documents' && item.fileType !== 'document') return false;
    
    // Filter by search term
    if (filter.search && 
        !item.title.toLowerCase().includes(filter.search.toLowerCase()) &&
        !item.description.toLowerCase().includes(filter.search.toLowerCase()) &&
        !item.tags.some(tag => tag.toLowerCase().includes(filter.search.toLowerCase()))) {
      return false;
    }
    
    // Filter by category
    if (filter.category && item.category !== filter.category) return false;
    
    return true;
  });
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Media Library</h2>
        <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Add New Media
        </button>
      </div>
      
      {/* Media Tab Selector */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'all' 
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'images' 
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'videos' 
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'documents' 
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Documents
            </button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-auto flex-grow">
              <input
                type="text"
                placeholder="Search media..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={filter.search}
                onChange={handleSearchChange}
              />
            </div>
            <div>
              <select 
                className="p-2 border border-gray-300 rounded-md"
                value={filter.category}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {availableCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {isLoading ? (
            <div className="text-center py-12">
              <svg className="animate-spin mx-auto h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-2 text-gray-500">Loading media...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">No media found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMedia.map(media => (
                <div 
                  key={media.id} 
                  className="border rounded-md overflow-hidden hover:border-gray-400 cursor-pointer transition-shadow hover:shadow-md"
                  onClick={() => setSelectedMedia(media)}
                >
                  <div className="relative h-32 bg-gray-100">
                    {media.fileType === 'image' ? (
                      <div className="relative h-full w-full">
                        <Image
                          src={media.filePath}
                          alt={media.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : media.fileType === 'video' ? (
                      <div className="flex items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-2">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{media.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{media.fileType}</span>
                      <span className="text-xs text-gray-500">{media.uploadDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Media Usage Overview */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Media Usage</h3>
        </div>
        <div className="p-4">
          <MediaUsageTracker showAll={true} />
        </div>
      </div>
      
      {/* Media Detail Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <MediaDetailView 
              media={selectedMedia} 
              onClose={() => setSelectedMedia(null)} 
              onEdit={handleUpdateMedia}
              onDelete={() => handleDeleteMedia(selectedMedia.id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaTab;
