import React, { useState, useEffect } from 'react';
import { useMedia } from '../../context/MediaContext';

type TagItem = {
  id: string;
  name: string;
  count: number;
};

const MediaTagManager: React.FC = () => {
  const { mediaItems } = useMedia();
  const [tags, setTags] = useState<TagItem[]>([]);
  const [newTag, setNewTag] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract unique tags from media items
  useEffect(() => {
    const tagCounts = new Map<string, number>();
    
    // Count occurrences of each tag
    mediaItems.forEach(item => {
      item.tags.forEach(tag => {
        const count = tagCounts.get(tag) || 0;
        tagCounts.set(tag, count + 1);
      });
    });
    
    // Convert to array of tag objects
    const tagItems: TagItem[] = Array.from(tagCounts.entries()).map(([name, count]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      count
    }));
    
    // Sort by frequency
    tagItems.sort((a, b) => b.count - a.count);
    
    setTags(tagItems);
  }, [mediaItems]);
  
  // Add new tag
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    // Check if tag already exists
    const exists = tags.some(tag => tag.name.toLowerCase() === newTag.trim().toLowerCase());
    if (exists) {
      alert('This tag already exists');
      return;
    }
    
    // Add new tag
    const newTagItem: TagItem = {
      id: newTag.trim().toLowerCase().replace(/\s+/g, '-'),
      name: newTag.trim(),
      count: 0
    };
    
    setTags([...tags, newTagItem]);
    setNewTag('');
  };
  
  // Delete tag
  const handleDeleteTag = (tagId: string) => {
    if (confirm('Are you sure you want to delete this tag? It will be removed from all media items.')) {
      setTags(tags.filter(tag => tag.id !== tagId));
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    }
  };
  
  // Handle tag selection
  const handleTagSelect = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  
  // Filter tags by search term
  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(filterTerm.toLowerCase())
  );
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Tag Manager</h2>
        
        {/* Add New Tag */}
        <div className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="New tag name"
              className="flex-grow p-2 border border-gray-300 rounded-md rounded-r-none"
            />
            <button
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="bg-blue-600 text-white py-2 px-4 rounded-md rounded-l-none hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Tag
            </button>
          </div>
        </div>
        
        {/* Filter Tags */}
        <div className="mb-4">
          <input
            type="text"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
            placeholder="Search tags"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {/* Tag List */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">All Tags ({tags.length})</h3>
          
          {filteredTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {filteredTags.map(tag => (
                <div 
                  key={tag.id}
                  className={`px-3 py-2 rounded-md flex items-center justify-between ${
                    selectedTags.includes(tag.id)
                      ? 'bg-blue-100 border border-blue-400'
                      : 'bg-gray-100 border border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tag-${tag.id}`}
                      checked={selectedTags.includes(tag.id)}
                      onChange={() => handleTagSelect(tag.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`tag-${tag.id}`} className="text-sm">
                      {tag.name}
                    </label>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                      {tag.count}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTag(tag.id)}
                    className="ml-2 text-gray-500 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              {tags.length > 0
                ? 'No tags match your search'
                : 'No tags have been created yet'
              }
            </p>
          )}
        </div>
        
        {/* Tag Actions */}
        {selectedTags.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{selectedTags.length} tag(s) selected</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${selectedTags.length} selected tags?`)) {
                      setTags(tags.filter(tag => !selectedTags.includes(tag.id)));
                      setSelectedTags([]);
                    }
                  }}
                  className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setSelectedTags([])}
                  className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Tag Usage Stats */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Tag Statistics</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-500">Total Tags</span>
                <p className="text-xl font-semibold">{tags.length}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Most Used Tag</span>
                <p className="text-xl font-semibold">
                  {tags.length > 0 ? tags[0].name : '-'}
                  {tags.length > 0 && (
                    <span className="ml-2 text-sm text-gray-500">
                      ({tags[0].count} uses)
                    </span>
                  )}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Unused Tags</span>
                <p className="text-xl font-semibold">
                  {tags.filter(tag => tag.count === 0).length}
                </p>
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                {tags
                  .filter(tag => tag.count > 0)
                  .slice(0, 10)
                  .map(tag => (
                    <div 
                      key={tag.id}
                      className="px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-sm"
                    >
                      {tag.name}
                      <span className="ml-1 text-xs text-blue-600">
                        ({tag.count})
                      </span>
                    </div>
                  ))
                }
              </div>
              {tags.filter(tag => tag.count > 0).length === 0 && (
                <p className="text-gray-500 text-sm">No tags are currently in use</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaTagManager;
