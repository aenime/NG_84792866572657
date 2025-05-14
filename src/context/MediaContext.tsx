import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MediaItem } from '../components/admin/MediaManager';
import { MediaService } from '../services/MediaService';

export type MediaFilter = {
  searchQuery: string;
  category: string;
  fileType: string;
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
};

export type MediaContextType = {
  mediaItems: MediaItem[];
  categories: string[];
  filter: MediaFilter;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  };
  setFilter: (filter: MediaFilter) => void;
  setPagination: (pagination: any) => void;
  addMediaItem: (item: MediaItem) => void;
  addMediaItems: (items: MediaItem[]) => void;
  updateMediaItem: (id: string, data: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  addCategory: (category: string) => void;
  getFilteredMedia: () => MediaItem[];
  getPaginatedMedia: () => MediaItem[];
  refreshMediaItems: () => Promise<void>;
};

const defaultFilter: MediaFilter = {
  searchQuery: '',
  category: '',
  fileType: '',
  dateRange: {
    start: '',
    end: '',
  },
  tags: [],
};

// Create context with a default value
export const MediaContext = createContext<MediaContextType>({
  mediaItems: [],
  categories: [],
  filter: defaultFilter,
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  },
  setFilter: () => {},
  setPagination: () => {},
  addMediaItem: () => {},
  addMediaItems: () => {},
  refreshMediaItems: async () => {},
  updateMediaItem: () => {},
  deleteMediaItem: () => {},
  addCategory: () => {},
  getFilteredMedia: () => [],
  getPaginatedMedia: () => [],
});

export const useMedia = () => useContext(MediaContext);

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
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
  const [filter, setFilter] = useState<MediaFilter>(defaultFilter);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  });

  // Load initial data
  useEffect(() => {
    // This would be replaced with an API call in a real application
    const loadSampleData = async () => {
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
      ];
      
      setMediaItems(sampleMedia);
      setPagination(prev => ({ ...prev, totalItems: sampleMedia.length }));
    };
    
    loadSampleData();
  }, []);

  // Add a new media item
  const addMediaItem = (item: MediaItem) => {
    setMediaItems(prev => [item, ...prev]);
    setPagination(prev => ({ ...prev, totalItems: prev.totalItems + 1 }));
  };

  // Add multiple media items
  const addMediaItems = (items: MediaItem[]) => {
    setMediaItems(prev => [...items, ...prev]);
    setPagination(prev => ({ ...prev, totalItems: prev.totalItems + items.length }));
  };

  // Update a media item
  const updateMediaItem = (id: string, data: Partial<MediaItem>) => {
    setMediaItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...data } : item
      )
    );
  };

  // Delete a media item
  const deleteMediaItem = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
    setPagination(prev => ({ ...prev, totalItems: prev.totalItems - 1 }));
  };

  // Refresh media items from service/API
  const refreshMediaItems = async () => {
    // This would typically fetch the latest media data from an API
    // For now, we'll just simulate a refresh using our sample data

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const freshItems = await MediaService.getAllMedia();
      setMediaItems(freshItems);
      setPagination(prev => ({ ...prev, totalItems: freshItems.length }));
    } catch (error) {
      console.error("Failed to refresh media items:", error);
      // In a real app, you might want to handle this error more gracefully
    }
  };

  // Add a new category
  const addCategory = (category: string) => {
    if (category.trim() && !categories.includes(category.trim())) {
      setCategories([...categories, category.trim()]);
    }
  };

  // Get filtered media based on current filter
  const getFilteredMedia = () => {
    return mediaItems.filter(item => {
      const matchesSearch = !filter.searchQuery || 
                            item.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
                            item.tags.some(tag => tag.toLowerCase().includes(filter.searchQuery.toLowerCase()));
                            
      const matchesCategory = !filter.category || item.category === filter.category;
      const matchesFileType = !filter.fileType || item.fileType === filter.fileType;
      
      // Date range filtering could be added here
      
      // Tag filtering could be added here
      
      return matchesSearch && matchesCategory && matchesFileType;
    });
  };

  // Get paginated media based on current filters and pagination
  const getPaginatedMedia = () => {
    const filtered = getFilteredMedia();
    return filtered.slice(
      (pagination.currentPage - 1) * pagination.itemsPerPage,
      pagination.currentPage * pagination.itemsPerPage
    );
  };

  return (
    <MediaContext.Provider value={{
      mediaItems,
      categories,
      filter,
      pagination,
      setFilter,
      setPagination,
      addMediaItem,
      addMediaItems,
      updateMediaItem,
      deleteMediaItem,
      addCategory,
      getFilteredMedia,
      getPaginatedMedia,
      refreshMediaItems,
    }}>
      {children}
    </MediaContext.Provider>
  );
};
