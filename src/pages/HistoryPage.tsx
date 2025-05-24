import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Image } from 'lucide-react';
import { useImageHistory } from '../context/ImageHistoryContext';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useImageHistory();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Detection History</h1>
        
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center space-x-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <Image className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 mb-2">No Detection History</h2>
          <p className="text-gray-500 mb-6">You haven't analyzed any images yet.</p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Analyze an Image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={item.processedImage}
                  alt="Processed image"
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                  {item.detectedObjects.length} object{item.detectedObjects.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.timestamp)}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Detected Objects:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(item.detectedObjects.map(obj => obj.name))).map((name, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;