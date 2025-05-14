import React, { useState } from 'react';
import Image from 'next/image';
import { MediaItem } from './MediaManager';
import MediaUsageTracker from './MediaUsageTracker';

type MediaDetailViewProps = {
  media: MediaItem;
  onEdit?: (updatedMedia: MediaItem) => void;
  onClose?: () => void;
  onDelete?: () => void;
};

const MediaDetailView: React.FC<MediaDetailViewProps> = ({ 
  media, 
  onEdit, 
  onClose,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableMedia, setEditableMedia] = useState<MediaItem>({...media});
  const [formError, setFormError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'usage'>('info');
  
  const handleUpdate = () => {
    // Validate required fields
    if (!editableMedia.title) {
      setFormError('Title is required');
      return;
    }
    
    // Update the media item
    if (onEdit) {
      onEdit(editableMedia);
    }
    
    // Exit edit mode
    setIsEditing(false);
    setFormError(null);
  };
  
  const handleCancel = () => {
    setEditableMedia({...media});
    setIsEditing(false);
    setFormError(null);
  };
  
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-medium text-gray-900">
          {isEditing ? 'Edit Media Details' : media.title}
        </h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Media Preview */}
          <div className="md:w-1/3">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              {media.fileType === 'image' && (
                <div className="relative h-64 w-full">
                  <Image
                    src={media.filePath}
                    alt={media.altText || media.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              {media.fileType === 'video' && (
                <div className="relative h-64 w-full bg-black flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              {media.fileType === 'document' && (
                <div className="relative h-64 w-full bg-gray-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                <span className="font-medium">File:</span> {media.fileName}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Type:</span> {media.mimeType}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Size:</span> {formatBytes(media.fileSize)}
              </p>
              {media.dimensions && (
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Dimensions:</span> {media.dimensions.width} × {media.dimensions.height} px
                </p>
              )}
              <p className="text-sm text-gray-500">
                <span className="font-medium">Uploaded:</span> {formatDate(media.uploadDate)}
              </p>
            </div>
            
            {!isEditing && (
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Details
                </button>
                
                <button
                  onClick={onDelete}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
          
          {/* Media Details */}
          <div className="md:w-2/3">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'info'
                      ? 'text-indigo-600 border-b-2 border-indigo-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Information
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'usage'
                      ? 'text-indigo-600 border-b-2 border-indigo-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Usage
                </button>
              </div>
            </div>
            
            {activeTab === 'info' && (
              <div className="mt-4">
                {isEditing ? (
                  // Edit Form
                  <div className="space-y-4">
                    {formError && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-red-700">{formError}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title *</label>
                      <input
                        type="text"
                        value={editableMedia.title}
                        onChange={(e) => setEditableMedia({...editableMedia, title: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Alt Text</label>
                      <input
                        type="text"
                        value={editableMedia.altText || ''}
                        onChange={(e) => setEditableMedia({...editableMedia, altText: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <p className="mt-1 text-xs text-gray-500">Describe the image content for accessibility</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        value={editableMedia.category}
                        onChange={(e) => setEditableMedia({...editableMedia, category: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="Dogs">Dogs</option>
                        <option value="Cats">Cats</option>
                        <option value="Cows">Cows</option>
                        <option value="Birds">Birds</option>
                        <option value="Injured Animals">Injured Animals</option>
                        <option value="Success Stories">Success Stories</option>
                        <option value="Volunteers">Volunteers</option>
                        <option value="Events">Events</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        value={editableMedia.description}
                        onChange={(e) => setEditableMedia({...editableMedia, description: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tags</label>
                      <input
                        type="text"
                        value={editableMedia.tags.join(', ')}
                        onChange={(e) => setEditableMedia({
                          ...editableMedia, 
                          tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Separate tags with commas"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Title</h4>
                      <p className="mt-1 text-sm text-gray-900">{media.title}</p>
                    </div>
                    
                    {media.altText && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Alt Text</h4>
                        <p className="mt-1 text-sm text-gray-900">{media.altText}</p>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Category</h4>
                      <p className="mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {media.category}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Description</h4>
                      <p className="mt-1 text-sm text-gray-900">{media.description || 'No description provided'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {media.tags.length > 0 ? (
                          media.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No tags</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">File Path</h4>
                      <p className="mt-1 text-sm bg-gray-100 p-2 rounded font-mono break-all">{media.filePath}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'usage' && (
              <div className="mt-4">
                <MediaUsageTracker mediaId={media.id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailView;
