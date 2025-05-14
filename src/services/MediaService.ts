import { MediaItem } from "../components/admin/MediaManager";

// This is a mock service that simulates API calls
// In a real application, these would be actual API calls

/**
 * Media Service - Handles all API interactions for media management
 */
export const MediaService = {
  /**
   * Get all media items
   * @returns Promise<MediaItem[]>
   */
  getAllMedia: async (): Promise<MediaItem[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, this would be fetched from an API
    const data = localStorage.getItem('mediaItems');
    return data ? JSON.parse(data) : [];
  },
  
  /**
   * Get a single media item by ID
   * @param id Media item ID
   * @returns Promise<MediaItem>
   */
  getMediaById: async (id: string): Promise<MediaItem | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = localStorage.getItem('mediaItems');
    const items = data ? JSON.parse(data) : [];
    return items.find((item: MediaItem) => item.id === id) || null;
  },
  
  /**
   * Upload a single media file
   * @param file File to upload
   * @param metadata Additional metadata for the file
   * @returns Promise<MediaItem>
   */
  uploadMedia: async (file: File, metadata: any): Promise<MediaItem> => {
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a new media item
    const newItem: MediaItem = {
      id: `${Date.now()}`,
      title: metadata.title || file.name.split('.')[0],
      fileName: file.name,
      filePath: `/uploads/${file.name}`, // This would be the actual path returned from server
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
    
    // Update local storage (simulating database)
    const data = localStorage.getItem('mediaItems');
    const items = data ? JSON.parse(data) : [];
    items.unshift(newItem);
    localStorage.setItem('mediaItems', JSON.stringify(items));
    
    return newItem;
  },
  
  /**
   * Upload multiple files at once
   * @param files Array of files to upload
   * @param commonMetadata Metadata to apply to all files
   * @returns Promise<MediaItem[]>
   */
  bulkUploadMedia: async (files: File[], commonMetadata: any): Promise<MediaItem[]> => {
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newItems: MediaItem[] = files.map((file, index) => ({
      id: `${Date.now() + index}`,
      title: commonMetadata.title ? `${commonMetadata.title} ${index + 1}` : file.name.split('.')[0],
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
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
    
    // Update local storage
    const data = localStorage.getItem('mediaItems');
    const items = data ? JSON.parse(data) : [];
    localStorage.setItem('mediaItems', JSON.stringify([...newItems, ...items]));
    
    return newItems;
  },
  
  /**
   * Update a media item's metadata
   * @param id Media item ID
   * @param updates Object containing the updates
   * @returns Promise<MediaItem>
   */
  updateMediaItem: async (id: string, updates: Partial<MediaItem>): Promise<MediaItem> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const data = localStorage.getItem('mediaItems');
    const items = data ? JSON.parse(data) : [];
    
    const updatedItems = items.map((item: MediaItem) => 
      item.id === id ? { ...item, ...updates } : item
    );
    
    localStorage.setItem('mediaItems', JSON.stringify(updatedItems));
    return updatedItems.find((item: MediaItem) => item.id === id);
  },
  
  /**
   * Delete a media item
   * @param id Media item ID
   * @returns Promise<boolean>
   */
  deleteMediaItem: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const data = localStorage.getItem('mediaItems');
    const items = data ? JSON.parse(data) : [];
    
    const updatedItems = items.filter((item: MediaItem) => item.id !== id);
    localStorage.setItem('mediaItems', JSON.stringify(updatedItems));
    
    return true;
  },
  
  /**
   * Get all categories
   * @returns Promise<string[]>
   */
  getCategories: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const data = localStorage.getItem('mediaCategories');
    return data ? JSON.parse(data) : [
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
    ];
  },
  
  /**
   * Add a new category
   * @param category Category name
   * @returns Promise<string[]>
   */
  addCategory: async (category: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const data = localStorage.getItem('mediaCategories');
    const categories = data ? JSON.parse(data) : [
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
    ];
    
    if (!categories.includes(category)) {
      categories.push(category);
      localStorage.setItem('mediaCategories', JSON.stringify(categories));
    }
    
    return categories;
  },
  
  /**
   * Get usage data for a specific media item
   * @param mediaId Media item ID
   * @returns Promise<any[]>
   */
  getMediaUsage: async (mediaId: string): Promise<any[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock usage data - in a real app this would come from the server
    const usageData = [
      { 
        path: '/animals', 
        title: 'Animals Page', 
        usageType: 'gallery',
        lastUsed: '2025-05-01'
      },
      { 
        path: '/about', 
        title: 'About Us Page', 
        usageType: 'thumbnail',
        lastUsed: '2025-04-28'
      },
      { 
        path: '/home', 
        title: 'Home Page', 
        usageType: 'hero',
        lastUsed: '2025-05-10'
      }
    ];
    
    // Return random subset for demo purposes
    return usageData.filter(() => Math.random() > 0.3);
  }
};
