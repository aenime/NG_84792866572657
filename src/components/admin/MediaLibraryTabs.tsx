import React from 'react';

type MediaLibraryTabsProps = {
  activeTab: 'library' | 'upload' | 'bulk';
  setActiveTab: (tab: 'library' | 'upload' | 'bulk') => void;
};

const MediaLibraryTabs: React.FC<MediaLibraryTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      <button
        className={`px-4 py-2 ${activeTab === 'library' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
        onClick={() => setActiveTab('library')}
      >
        Media Library
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
        onClick={() => setActiveTab('upload')}
      >
        Upload
      </button>
      <button
        className={`px-4 py-2 ${activeTab === 'bulk' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
        onClick={() => setActiveTab('bulk')}
      >
        Bulk Upload
      </button>
    </div>
  );
};

export default MediaLibraryTabs;
