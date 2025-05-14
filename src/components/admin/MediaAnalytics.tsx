import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { useMedia } from '../../context/MediaContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MediaAnalytics: React.FC = () => {
  const { mediaItems } = useMedia();
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'storage'>('overview');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  // Data for the charts
  const typeData = {
    labels: ['Images', 'Videos', 'Documents'],
    datasets: [
      {
        data: [
          mediaItems.filter(item => item.fileType === 'image').length,
          mediaItems.filter(item => item.fileType === 'video').length,
          mediaItems.filter(item => item.fileType === 'document').length,
        ],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Get category distribution data
  const categories = [...new Set(mediaItems.map(item => item.category))];
  const categoryData = {
    labels: categories,
    datasets: [
      {
        data: categories.map(category => 
          mediaItems.filter(item => item.category === category).length
        ),
        backgroundColor: categories.map((_, i) => 
          `hsla(${(i * 360) / categories.length}, 70%, 60%, 0.6)`
        ),
        borderColor: categories.map((_, i) => 
          `hsla(${(i * 360) / categories.length}, 70%, 60%, 1)`
        ),
        borderWidth: 1,
      },
    ],
  };
  
  // Calculate storage usage
  const totalStorageBytes = mediaItems.reduce((total, item) => total + item.fileSize, 0);
  const totalStorageMB = totalStorageBytes / (1024 * 1024);
  
  // Storage by type
  const storageByType = {
    image: mediaItems
      .filter(item => item.fileType === 'image')
      .reduce((total, item) => total + item.fileSize, 0) / (1024 * 1024),
    video: mediaItems
      .filter(item => item.fileType === 'video')
      .reduce((total, item) => total + item.fileSize, 0) / (1024 * 1024),
    document: mediaItems
      .filter(item => item.fileType === 'document')
      .reduce((total, item) => total + item.fileSize, 0) / (1024 * 1024),
  };
  
  // Mock upload activity data
  const uploadActivity = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Number of Uploads',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Mock usage data
  const usageData = {
    labels: ['Home', 'Animals', 'About', 'Donate', 'Events'],
    datasets: [
      {
        label: 'Media Usage Count',
        data: [25, 19, 12, 8, 5],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Calculate stats
  const stats = {
    totalItems: mediaItems.length,
    images: mediaItems.filter(item => item.fileType === 'image').length,
    videos: mediaItems.filter(item => item.fileType === 'video').length,
    documents: mediaItems.filter(item => item.fileType === 'document').length,
    totalSizeMB: totalStorageMB.toFixed(2),
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('usage')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'usage'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Usage Analytics
          </button>
          <button
            onClick={() => setActiveTab('storage')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'storage'
                ? 'text-blue-600 border-b-2 border-blue-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Storage Analytics
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Time Range Selector */}
        <div className="mb-6 flex justify-end">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setTimeRange('week')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'week'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 rounded-l-lg`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('month')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'month'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border-t border-b border-gray-300`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setTimeRange('year')}
              className={`px-4 py-2 text-sm font-medium ${
                timeRange === 'year'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-300 rounded-r-lg`}
            >
              Year
            </button>
          </div>
        </div>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Total Files</h3>
                <p className="text-2xl font-semibold text-blue-600">{stats.totalItems}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Images</h3>
                <p className="text-2xl font-semibold text-green-600">{stats.images}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-800">Videos</h3>
                <p className="text-2xl font-semibold text-red-600">{stats.videos}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800">Documents</h3>
                <p className="text-2xl font-semibold text-yellow-600">{stats.documents}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">Total Size</h3>
                <p className="text-2xl font-semibold text-purple-600">{stats.totalSizeMB} MB</p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">File Type Distribution</h3>
                <div className="h-64">
                  <Pie data={typeData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Upload Activity</h3>
                <div className="h-64">
                  <Bar 
                    data={uploadActivity} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Usage Analytics Tab */}
        {activeTab === 'usage' && (
          <div>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Media Usage by Page</h3>
                <div className="h-80">
                  <Bar 
                    data={usageData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Media by Category</h3>
                <div className="h-80">
                  <Pie data={categoryData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Media Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usage Count
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Used
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mediaItems.slice(0, 5).map((media) => (
                      <tr key={media.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                              {media.fileType === 'image' ? (
                                <img src={media.filePath} alt={media.title} className="h-10 w-10 object-cover" />
                              ) : (
                                <div className="h-10 w-10 flex items-center justify-center">
                                  {media.fileType === 'video' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{media.title}</div>
                              <div className="text-sm text-gray-500">{media.fileName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {Math.floor(Math.random() * 20) + 1} pages
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(media.uploadDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {/* Storage Analytics Tab */}
        {activeTab === 'storage' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-indigo-800">Storage Used</h3>
                <p className="text-2xl font-semibold text-indigo-600">{stats.totalSizeMB} MB</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${Math.min(totalStorageMB / 10, 100)}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-indigo-500">
                  {Math.min(totalStorageMB / 10, 100).toFixed(1)}% of 1000 MB used
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-indigo-800">Images Storage</h3>
                <p className="text-2xl font-semibold text-indigo-600">{storageByType.image.toFixed(2)} MB</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-green-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${(storageByType.image / totalStorageMB) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-indigo-500">
                  {((storageByType.image / totalStorageMB) * 100).toFixed(1)}% of total storage
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-indigo-800">Other File Storage</h3>
                <p className="text-2xl font-semibold text-indigo-600">
                  {(storageByType.video + storageByType.document).toFixed(2)} MB
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-orange-600 h-2.5 rounded-full transition-all"
                    style={{ width: `${((storageByType.video + storageByType.document) / totalStorageMB) * 100}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-indigo-500">
                  {(((storageByType.video + storageByType.document) / totalStorageMB) * 100).toFixed(1)}% of total storage
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Storage by File Type</h3>
                <div className="h-64">
                  <Pie
                    data={{
                      labels: ['Images', 'Videos', 'Documents'],
                      datasets: [
                        {
                          data: [
                            storageByType.image,
                            storageByType.video,
                            storageByType.document,
                          ],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                          ],
                          borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Storage Growth Over Time</h3>
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [
                        {
                          label: 'Storage Used (MB)',
                          data: [12, 25, 37, 52, 68, parseFloat(stats.totalSizeMB)],
                          backgroundColor: 'rgba(153, 102, 255, 0.6)',
                          borderColor: 'rgba(153, 102, 255, 1)',
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Media Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Sort by size, largest first */}
                  {[...mediaItems]
                    .sort((a, b) => b.fileSize - a.fileSize)
                    .slice(0, 5)
                    .map((media) => (
                      <tr key={media.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                              {media.fileType === 'image' ? (
                                <img src={media.filePath} alt={media.title} className="h-10 w-10 object-cover" />
                              ) : (
                                <div className="h-10 w-10 flex items-center justify-center">
                                  {media.fileType === 'video' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{media.title}</div>
                              <div className="text-sm text-gray-500">{media.fileName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {(media.fileSize / (1024 * 1024)).toFixed(2)} MB
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${media.fileType === 'image' ? 'bg-blue-100 text-blue-800' : ''}
                            ${media.fileType === 'video' ? 'bg-red-100 text-red-800' : ''}
                            ${media.fileType === 'document' ? 'bg-yellow-100 text-yellow-800' : ''}
                          `}>
                            {media.fileType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(media.uploadDate).toLocaleDateString()}
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaAnalytics;
