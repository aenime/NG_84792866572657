import { MediaItem } from "../components/admin/MediaManager";

/**
 * Media utilities for file handling and display
 */
export const MediaUtils = {
  /**
   * Format file size to human-readable format
   * @param bytes The file size in bytes
   * @returns Formatted string (e.g., "1.5 MB")
   */
  formatBytes: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  /**
   * Format a date string to a readable format
   * @param dateStr Date string (ISO format)
   * @returns Formatted date string
   */
  formatDate: (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  },
  
  /**
   * Get an icon for a media type
   * @param fileType The type of file
   * @returns JSX SVG icon
   */
  getMediaTypeIcon: (fileType: string) => {
    switch (fileType) {
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'document':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  },
  
  /**
   * Convert File to MediaItem
   * @param file File to convert
   * @param extraData Additional data
   * @returns MediaItem object
   */
  fileToMediaItem: (file: File, extraData: any = {}): MediaItem => {
    return {
      id: `${Date.now()}`,
      title: extraData.title || file.name.split('.')[0],
      fileName: file.name,
      filePath: `/uploads/${file.name}`,
      fileType: file.type.startsWith('image/') ? 'image' : 
               file.type.startsWith('video/') ? 'video' : 'document',
      fileSize: file.size,
      mimeType: file.type,
      category: extraData.category || 'Uncategorized',
      tags: extraData.tags || [],
      uploadDate: new Date().toISOString().split('T')[0],
      description: extraData.description || '',
      uploadedBy: 'admin',
      altText: extraData.altText || '',
    };
  },
  
  /**
   * Create a file URL from a File object
   * @param file File object
   * @returns URL string
   */
  createFilePreviewUrl: (file: File): string => {
    return URL.createObjectURL(file);
  },
  
  /**
   * Validate file type against allowed types
   * @param file File to validate
   * @param allowedTypes Array of allowed MIME types
   * @returns Boolean indicating if file is valid
   */
  validateFileType: (file: File, allowedTypes: string[] = []): boolean => {
    if (allowedTypes.length === 0) return true;
    return allowedTypes.includes(file.type);
  },
  
  /**
   * Extract file extension from filename
   * @param fileName Name of the file
   * @returns Extension string
   */
  getFileExtension: (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  },
  
  /**
   * Extract dimensions from an image file
   * @param file Image file
   * @returns Promise resolving to {width, height}
   */
  getImageDimensions: async (file: File): Promise<{width: number, height: number}> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height
        });
      };
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      img.src = URL.createObjectURL(file);
    });
  }
};
